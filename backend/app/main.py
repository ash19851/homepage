from pathlib import Path
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from .database import init_db, SessionLocal
from .routers import public, admin

app = FastAPI(title='UNANG 个人主页 API', version='1.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(public.router)
app.include_router(admin.router)

# 生产模式：托管前端静态文件
static_dir = Path(__file__).parent.parent.parent / 'frontend' / 'dist'
if static_dir.exists():
    app.mount('/', StaticFiles(directory=str(static_dir), html=True), name='static')

def _seed_if_empty():
    """首次启动时自动创建管理员账号和默认站点配置"""
    from .models.content import AdminUser, Profile
    from .services.content_service import get_site_config
    from passlib.hash import bcrypt

    db = SessionLocal()
    try:
        if db.query(AdminUser).first():
            return

        db.add(AdminUser(username='admin', password_hash=bcrypt.hash('admin123')))

        if not db.query(Profile).first():
            db.add(Profile(
                name='UNANG', title='软件开发工程师 · 工业物联网开发',
                bio='全栈开发者，深耕 .NET 生态与工业硬件集成。热衷 AI 协作编程探索新技术边界。',
                avatar_url='', github_url='https://github.com', email='unang@example.com',
            ))

        get_site_config(db)  # auto-creates default site config if missing
        db.commit()
    finally:
        db.close()

@app.on_event('startup')
def on_startup():
    init_db()
    _seed_if_empty()
