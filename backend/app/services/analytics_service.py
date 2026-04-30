from datetime import datetime, date, timedelta
from sqlalchemy import func
from sqlalchemy.orm import Session
from ..models.analytics import VisitLog

def record_visit(db: Session, page_path: str, ip: str = '', ua: str = '', ref: str = ''):
    log = VisitLog(page_path=page_path, ip_address=ip, user_agent=ua, referrer=ref)
    db.add(log)
    db.commit()

def get_overview(db: Session) -> dict:
    total = db.query(func.count(VisitLog.id)).scalar() or 0
    today = db.query(func.count(VisitLog.id)).filter(
        func.date(VisitLog.timestamp) == date.today()
    ).scalar() or 0
    unique = db.query(func.count(func.distinct(VisitLog.ip_address))).scalar() or 0
    return {'total_visits': total, 'today_visits': today, 'unique_ips': unique}

def get_timeline(db: Session, days: int = 30) -> list[dict]:
    since = date.today() - timedelta(days=days)
    rows = (
        db.query(func.date(VisitLog.timestamp).label('date'), func.count(VisitLog.id).label('visits'))
        .filter(func.date(VisitLog.timestamp) >= since)
        .group_by(func.date(VisitLog.timestamp))
        .order_by('date')
        .all()
    )
    return [{'date': str(r.date), 'visits': r.visits} for r in rows]

def get_page_breakdown(db: Session) -> list[dict]:
    rows = (
        db.query(VisitLog.page_path, func.count(VisitLog.id).label('count'))
        .group_by(VisitLog.page_path)
        .order_by(func.count(VisitLog.id).desc())
        .all()
    )
    return [{'page_path': r.page_path, 'count': r.count} for r in rows]
