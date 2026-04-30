from sqlalchemy.orm import Session
from ..models.content import Profile, Project, Skill, SiteConfig

def get_profile(db: Session) -> Profile | None:
    return db.query(Profile).first()

def update_profile(db: Session, data: dict) -> Profile:
    profile = db.query(Profile).first()
    if not profile:
        profile = Profile(**data)
        db.add(profile)
    else:
        for k, v in data.items():
            if v is not None:
                setattr(profile, k, v)
    db.commit()
    db.refresh(profile)
    return profile

def get_projects(db: Session) -> list[Project]:
    return db.query(Project).order_by(Project.sort_order).all()

def get_project(db: Session, project_id: int) -> Project | None:
    return db.query(Project).filter(Project.id == project_id).first()

def create_project(db: Session, data: dict) -> Project:
    project = Project(**data)
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

def update_project(db: Session, project_id: int, data: dict) -> Project | None:
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        return None
    for k, v in data.items():
        if v is not None:
            setattr(project, k, v)
    db.commit()
    db.refresh(project)
    return project

def delete_project(db: Session, project_id: int) -> bool:
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        return False
    db.delete(project)
    db.commit()
    return True

def get_skills(db: Session) -> list[Skill]:
    return db.query(Skill).order_by(Skill.sort_order).all()

def create_skill(db: Session, data: dict) -> Skill:
    skill = Skill(**data)
    db.add(skill)
    db.commit()
    db.refresh(skill)
    return skill

def update_skill(db: Session, skill_id: int, data: dict) -> Skill | None:
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        return None
    for k, v in data.items():
        if v is not None:
            setattr(skill, k, v)
    db.commit()
    db.refresh(skill)
    return skill

def delete_skill(db: Session, skill_id: int) -> bool:
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        return False
    db.delete(skill)
    db.commit()
    return True

def get_site_config(db: Session) -> SiteConfig:
    config = db.query(SiteConfig).first()
    if not config:
        config = SiteConfig(site_name='UNANG', footer_text='Built with Claude Code.', footer_github='https://github.com', footer_email='')
        db.add(config)
        db.commit()
        db.refresh(config)
    return config

def update_site_config(db: Session, data: dict) -> SiteConfig:
    config = get_site_config(db)
    for k, v in data.items():
        if v is not None:
            setattr(config, k, v)
    db.commit()
    db.refresh(config)
    return config
