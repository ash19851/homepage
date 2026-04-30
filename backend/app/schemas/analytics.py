from pydantic import BaseModel

class StatsOverview(BaseModel):
    total_visits: int; today_visits: int; unique_ips: int

class StatsTimeline(BaseModel):
    date: str; visits: int

class StatsPageBreakdown(BaseModel):
    page_path: str; count: int
