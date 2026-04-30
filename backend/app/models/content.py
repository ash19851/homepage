from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from ..database import Base

class Profile(Base):
    __tablename__ = 'profiles'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), default='UNANG')
    title = Column(String(200), default='全栈开发者')
    bio = Column(Text, default='')
    avatar_url = Column(String(500), default='')
    github_url = Column(String(500), default='')
    email = Column(String(200), default='')
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class Project(Base):
    __tablename__ = 'projects'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, default='')
    tech_stack = Column(Text, default='[]')
    image_url = Column(String(500), default='')
    demo_url = Column(String(500), default='')
    github_url = Column(String(500), default='')
    category = Column(String(50), default='web')
    featured = Column(Boolean, default=False)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

class Skill(Base):
    __tablename__ = 'skills'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(50), default='other')
    level = Column(Integer, default=50)
    icon = Column(String(10), default='')
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

class SiteConfig(Base):
    __tablename__ = 'site_config'
    id = Column(Integer, primary_key=True, index=True)
    site_name = Column(String(100), default='UNANG')
    footer_text = Column(String(500), default='Built with Claude Code.')
    footer_github = Column(String(500), default='https://github.com')
    footer_email = Column(String(200), default='')
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class AdminUser(Base):
    __tablename__ = 'admin_users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(200), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
