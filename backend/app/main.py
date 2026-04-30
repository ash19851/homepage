from pathlib import Path
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from .database import init_db
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

@app.on_event('startup')
def on_startup():
    init_db()
