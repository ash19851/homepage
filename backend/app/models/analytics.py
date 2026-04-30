from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, DateTime
from ..database import Base

class VisitLog(Base):
    __tablename__ = 'visit_logs'
    id = Column(Integer, primary_key=True, index=True)
    page_path = Column(String(200), default='/')
    ip_address = Column(String(50), default='')
    user_agent = Column(String(500), default='')
    referrer = Column(String(500), default='')
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
