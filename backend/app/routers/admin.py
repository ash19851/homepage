from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from ..database import get_db
from ..auth.jwt import create_token
from ..auth.dependencies import get_current_user
from ..models.content import AdminUser
from ..services import content_service, analytics_service
from ..schemas.content import (
    LoginRequest, LoginResponse,
    ProfileOut, ProfileUpdate,
    ProjectOut, ProjectUpdate,
    SkillOut, SkillUpdate,
    SiteConfigOut, SiteConfigUpdate,
)
from ..schemas.analytics import StatsOverview, StatsTimeline, StatsPageBreakdown

router = APIRouter(prefix='/api/admin', tags=['admin'])

@router.post('/login', response_model=LoginResponse)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(AdminUser).filter(AdminUser.username == req.username).first()
    if not user or not bcrypt.verify(req.password, user.password_hash):
        raise HTTPException(status_code=401, detail='用户名或密码错误')
    return {'access_token': create_token(req.username)}

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
