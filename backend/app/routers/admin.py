from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from datetime import datetime, timedelta
from ..database import get_db
from ..auth.jwt import create_token
from ..auth.captcha import generate_captcha, verify_captcha
from ..auth.dependencies import get_current_user
from ..models.content import AdminUser, LoginAttempt
from ..services import content_service, analytics_service
from ..schemas.content import (
    LoginRequest, LoginResponse,
    ProfileOut, ProfileUpdate,
    ProjectOut, ProjectUpdate,
    SkillOut, SkillUpdate,
    SiteConfigOut, SiteConfigUpdate,
    TimelineEntryOut, TimelineEntryUpdate,
    GuestbookMessageOut, PasswordChange,
    ArticleOut, ArticleUpdate,
)
from ..schemas.analytics import StatsOverview, StatsTimeline, StatsPageBreakdown

router = APIRouter(prefix='/api/admin', tags=['admin'])

MAX_FAILED_ATTEMPTS = 5
LOCKOUT_MINUTES = 30

@router.get('/captcha')
def get_captcha():
    return generate_captcha()

@router.post('/login', response_model=LoginResponse)
def login(req: LoginRequest, request: Request, db: Session = Depends(get_db)):
    client_ip = request.client.host if request.client else 'unknown'

    # Check if IP is locked out
    now = datetime.utcnow()
    cutoff = now - timedelta(minutes=LOCKOUT_MINUTES)
    recent_fails = db.query(LoginAttempt).filter(
        LoginAttempt.ip_address == client_ip,
        LoginAttempt.attempted_at > cutoff,
        LoginAttempt.success == False,
    ).order_by(LoginAttempt.attempted_at.desc()).limit(MAX_FAILED_ATTEMPTS).all()

    if len(recent_fails) >= MAX_FAILED_ATTEMPTS:
        wait = int((recent_fails[0].attempted_at + timedelta(minutes=LOCKOUT_MINUTES) - now).total_seconds() / 60) + 1
        raise HTTPException(status_code=429, detail=f'登录已被锁定，请 {wait} 分钟后重试')

    # Validate captcha
    if not verify_captcha(req.captcha_token, req.captcha_answer):
        db.add(LoginAttempt(ip_address=client_ip, success=False))
        db.commit()
        raise HTTPException(status_code=401, detail='验证码错误')

    # Validate credentials
    user = db.query(AdminUser).filter(AdminUser.username == req.username).first()
    if not user or not bcrypt.verify(req.password, user.password_hash):
        db.add(LoginAttempt(ip_address=client_ip, success=False))
        db.commit()
        raise HTTPException(status_code=401, detail='用户名或密码错误')

    db.add(LoginAttempt(ip_address=client_ip, success=True))
    db.commit()
    return {'access_token': create_token(req.username)}

@router.put('/password')
def change_password(data: PasswordChange, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    if not content_service.change_password(db, current_user, data.new_password):
        raise HTTPException(status_code=404, detail='用户不存在')
    return {'ok': True}

# --- Profile ---
@router.put('/profile', response_model=ProfileOut)
def update_profile(data: ProfileUpdate, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    return content_service.update_profile(db, data.model_dump(exclude_none=True))

# --- Projects ---
@router.get('/projects', response_model=list[ProjectOut])
def list_projects(db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    return content_service.get_projects(db)

@router.post('/projects', response_model=ProjectOut)
def create_project(data: ProjectUpdate, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    return content_service.create_project(db, data.model_dump(exclude_none=True))

@router.put('/projects/{project_id}', response_model=ProjectOut)
def update_project(project_id: int, data: ProjectUpdate, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    project = content_service.update_project(db, project_id, data.model_dump(exclude_none=True))
    if not project:
        raise HTTPException(status_code=404, detail='项目不存在')
    return project

@router.delete('/projects/{project_id}')
def delete_project(project_id: int, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    if not content_service.delete_project(db, project_id):
        raise HTTPException(status_code=404, detail='项目不存在')
    return {'ok': True}

# --- Skills ---
@router.get('/skills', response_model=list[SkillOut])
def list_skills(db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    return content_service.get_skills(db)

@router.post('/skills', response_model=SkillOut)
def create_skill(data: SkillUpdate, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    return content_service.create_skill(db, data.model_dump(exclude_none=True))

@router.put('/skills/{skill_id}', response_model=SkillOut)
def update_skill(skill_id: int, data: SkillUpdate, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    skill = content_service.update_skill(db, skill_id, data.model_dump(exclude_none=True))
    if not skill:
        raise HTTPException(status_code=404, detail='技能不存在')
    return skill

@router.delete('/skills/{skill_id}')
def delete_skill(skill_id: int, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    if not content_service.delete_skill(db, skill_id):
        raise HTTPException(status_code=404, detail='技能不存在')
    return {'ok': True}

# --- Site Config ---
@router.put('/site-config', response_model=SiteConfigOut)
def update_site_config(data: SiteConfigUpdate, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    return content_service.update_site_config(db, data.model_dump(exclude_none=True))

# --- Timeline ---
@router.get('/timeline', response_model=list[TimelineEntryOut])
def list_timeline(db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    return content_service.get_timeline(db)

@router.post('/timeline', response_model=TimelineEntryOut)
def create_timeline_entry(data: TimelineEntryUpdate, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    return content_service.create_timeline_entry(db, data.model_dump(exclude_none=True))

@router.put('/timeline/{entry_id}', response_model=TimelineEntryOut)
def update_timeline_entry(entry_id: int, data: TimelineEntryUpdate, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    entry = content_service.update_timeline_entry(db, entry_id, data.model_dump(exclude_none=True))
    if not entry:
        raise HTTPException(status_code=404, detail='条目不存在')
    return entry

@router.delete('/timeline/{entry_id}')
def delete_timeline_entry(entry_id: int, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    if not content_service.delete_timeline_entry(db, entry_id):
        raise HTTPException(status_code=404, detail='条目不存在')
    return {'ok': True}

# --- Guestbook ---
@router.get('/guestbook', response_model=list[GuestbookMessageOut])
def admin_list_guestbook(db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    return content_service.get_guestbook_messages(db, limit=100)

@router.delete('/guestbook/{msg_id}')
def delete_guestbook(msg_id: int, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    if not content_service.delete_guestbook_message(db, msg_id):
        raise HTTPException(status_code=404, detail='留言不存在')
    return {'ok': True}

# --- Articles ---
@router.get('/articles', response_model=list[ArticleOut])
def list_articles(db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    return content_service.get_articles(db)

@router.post('/articles', response_model=ArticleOut)
def create_article(data: ArticleUpdate, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    return content_service.create_article(db, data.model_dump(exclude_none=True))

@router.put('/articles/{article_id}', response_model=ArticleOut)
def update_article(article_id: int, data: ArticleUpdate, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    article = content_service.update_article(db, article_id, data.model_dump(exclude_none=True))
    if not article:
        raise HTTPException(status_code=404, detail='文章不存在')
    return article

@router.delete('/articles/{article_id}')
def delete_article(article_id: int, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    if not content_service.delete_article(db, article_id):
        raise HTTPException(status_code=404, detail='文章不存在')
    return {'ok': True}

# --- Stats ---
@router.get('/stats/overview', response_model=StatsOverview)
def stats_overview(db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    return analytics_service.get_overview(db)

@router.get('/stats/timeline', response_model=list[StatsTimeline])
def stats_timeline(days: int = 30, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    return analytics_service.get_timeline(db, days)

@router.get('/stats/pages', response_model=list[StatsPageBreakdown])
def stats_pages(db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    return analytics_service.get_page_breakdown(db)
