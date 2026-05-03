from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from ..models.content import Profile, Project, Skill, SiteConfig, TimelineEntry, GuestbookMessage, Article, AdminUser

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
        config = SiteConfig(site_name='ash', footer_text='Built with Claude Code.', footer_github='https://github.com', footer_email='')
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

def get_timeline(db: Session) -> list[TimelineEntry]:
    return db.query(TimelineEntry).order_by(TimelineEntry.sort_order).all()

def create_timeline_entry(db: Session, data: dict) -> TimelineEntry:
    entry = TimelineEntry(**data)
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry

def update_timeline_entry(db: Session, entry_id: int, data: dict) -> TimelineEntry | None:
    entry = db.query(TimelineEntry).filter(TimelineEntry.id == entry_id).first()
    if not entry:
        return None
    for k, v in data.items():
        if v is not None:
            setattr(entry, k, v)
    db.commit()
    db.refresh(entry)
    return entry

def delete_timeline_entry(db: Session, entry_id: int) -> bool:
    entry = db.query(TimelineEntry).filter(TimelineEntry.id == entry_id).first()
    if not entry:
        return False
    db.delete(entry)
    db.commit()
    return True

def get_guestbook_messages(db: Session, limit: int = 50) -> list[GuestbookMessage]:
    return db.query(GuestbookMessage).order_by(GuestbookMessage.created_at.desc()).limit(limit).all()

def create_guestbook_message(db: Session, data: dict) -> GuestbookMessage:
    msg = GuestbookMessage(**data)
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg

def delete_guestbook_message(db: Session, msg_id: int) -> bool:
    msg = db.query(GuestbookMessage).filter(GuestbookMessage.id == msg_id).first()
    if not msg:
        return False
    db.delete(msg)
    db.commit()
    return True

def change_password(db: Session, username: str, new_password: str) -> bool:
    user = db.query(AdminUser).filter(AdminUser.username == username).first()
    if not user:
        return False
    user.password_hash = bcrypt.hash(new_password)
    db.commit()
    return True

# --- Articles ---

def get_articles(db: Session, published_only: bool = False) -> list[Article]:
    q = db.query(Article).order_by(Article.created_at.desc())
    if published_only:
        q = q.filter(Article.published == True)
    return q.all()

def get_article_by_slug(db: Session, slug: str, published_only: bool = False) -> Article | None:
    q = db.query(Article).filter(Article.slug == slug)
    if published_only:
        q = q.filter(Article.published == True)
    return q.first()

def create_article(db: Session, data: dict) -> Article:
    article = Article(**data)
    db.add(article)
    db.commit()
    db.refresh(article)
    return article

def update_article(db: Session, article_id: int, data: dict) -> Article | None:
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        return None
    for k, v in data.items():
        if v is not None:
            setattr(article, k, v)
    db.commit()
    db.refresh(article)
    return article

def delete_article(db: Session, article_id: int) -> bool:
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        return False
    db.delete(article)
    db.commit()
    return True
