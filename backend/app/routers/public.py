from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..services import content_service, analytics_service
from ..schemas.content import ProfileOut, ProjectOut, SkillOut, SiteConfigOut, VisitRequest

router = APIRouter(prefix='/api/public', tags=['public'])

@router.get('/profile', response_model=ProfileOut)
def get_profile(db: Session = Depends(get_db)):
    profile = content_service.get_profile(db)
    if not profile:
        content_service.update_profile(db, {
            'name': 'UNANG', 'title': '全栈开发者',
            'bio': '热衷于探索技术边界的全栈开发者。',
            'avatar_url': '', 'github_url': '', 'email': 'unang@example.com'
        })
        profile = content_service.get_profile(db)
    return profile

@router.get('/projects', response_model=list[ProjectOut])
def get_projects(db: Session = Depends(get_db)):
    return content_service.get_projects(db)

@router.get('/projects/{project_id}', response_model=ProjectOut)
def get_project(project_id: int, db: Session = Depends(get_db)):
    return content_service.get_project(db, project_id)

@router.get('/skills', response_model=list[SkillOut])
def get_skills(db: Session = Depends(get_db)):
    return content_service.get_skills(db)

@router.get('/site-config', response_model=SiteConfigOut)
def get_site_config(db: Session = Depends(get_db)):
    return content_service.get_site_config(db)

@router.post('/visit')
def record_visit(req: VisitRequest, db: Session = Depends(get_db)):
    analytics_service.record_visit(db, req.page_path)
    return {'ok': True}
