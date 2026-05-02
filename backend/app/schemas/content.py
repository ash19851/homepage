from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import Optional, Any
import json

class ProfileOut(BaseModel):
    id: int; name: str; title: str; bio: str; avatar_url: str; github_url: str; email: str
    model_config = {'from_attributes': True}

class ProfileUpdate(BaseModel):
    name: Optional[str] = None; title: Optional[str] = None; bio: Optional[str] = None
    avatar_url: Optional[str] = None; github_url: Optional[str] = None; email: Optional[str] = None

class ProjectOut(BaseModel):
    id: int; title: str; description: str; tech_stack: Any; image_url: str; demo_url: str
    github_url: str; category: str; featured: bool; sort_order: int
    model_config = {'from_attributes': True}

    @field_validator('tech_stack', mode='before')
    @classmethod
    def parse_tech_stack(cls, v):
        if isinstance(v, str):
            try: return json.loads(v)
            except (json.JSONDecodeError, TypeError): return []
        if isinstance(v, list): return v
        return []

class ProjectUpdate(BaseModel):
    title: Optional[str] = None; description: Optional[str] = None; tech_stack: Optional[str] = None
    image_url: Optional[str] = None; demo_url: Optional[str] = None; github_url: Optional[str] = None
    category: Optional[str] = None; featured: Optional[bool] = None; sort_order: Optional[int] = None

class SkillOut(BaseModel):
    id: int; name: str; category: str; level: int; icon: str; sort_order: int
    model_config = {'from_attributes': True}

class SkillUpdate(BaseModel):
    name: Optional[str] = None; category: Optional[str] = None; level: Optional[int] = None
    icon: Optional[str] = None; sort_order: Optional[int] = None

class LoginRequest(BaseModel):
    username: str; password: str; captcha_token: str = ''; captcha_answer: str = ''

class LoginResponse(BaseModel):
    access_token: str

class SiteConfigOut(BaseModel):
    id: int; site_name: str; site_theme: Optional[str] = None; footer_text: str; footer_github: str; footer_email: str
    model_config = {'from_attributes': True}

class SiteConfigUpdate(BaseModel):
    site_name: Optional[str] = None; site_theme: Optional[str] = None; footer_text: Optional[str] = None
    footer_github: Optional[str] = None; footer_email: Optional[str] = None

class TimelineEntryOut(BaseModel):
    id: int; year: str; title: str; desc: str; sort_order: int
    model_config = {'from_attributes': True}

class TimelineEntryUpdate(BaseModel):
    year: Optional[str] = None; title: Optional[str] = None; desc: Optional[str] = None; sort_order: Optional[int] = None

class VisitRequest(BaseModel):
    page_path: str

class PasswordChange(BaseModel):
    new_password: str

class GuestbookMessageCreate(BaseModel):
    name: str; message: str

class GuestbookMessageOut(BaseModel):
    id: int; name: str; message: str; created_at: datetime
    model_config = {'from_attributes': True}
