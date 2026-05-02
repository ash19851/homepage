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
    """首次启动时自动创建管理员账号和全部初始数据"""
    from .models.content import AdminUser, Profile, Project, Skill, TimelineEntry
    from .services.content_service import get_site_config
    from passlib.hash import bcrypt
    import json

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

        get_site_config(db)

        if not db.query(Project).first():
            db.add_all([
                Project(title='林内售后管理系统', sort_order=1, category='web', featured=True,
                        description='企业级售后服务管理系统，支撑煤改气工程项目。涵盖工单全生命周期管理、多角色 RBAC 权限体系、产品序列号追踪，经典 ASP.NET MVC 5 三层架构。',
                        tech_stack=json.dumps(['C#', 'ASP.NET MVC 5', 'Entity Framework 6', 'Dapper', 'Unity DI', 'OAuth 2.0', 'SQL Server', 'Bootstrap'])),
                Project(title='ERP 移动条码系统 — ERPBCS', sort_order=2, category='other', featured=True,
                        description='林内 ERP 移动端 PDA 解决方案。实时库存盘点、出入库扫码、离线 SQLite 缓存 + SOAP Web Service 同步，多品牌扫描头 SDK 统一封装。',
                        tech_stack=json.dumps(['C#', '.NET Compact Framework', 'Windows CE', 'MySQL', 'SQLite', 'SOAP Web Service', 'WinForm'])),
                Project(title='林内企业官网 + 售后平台', sort_order=3, category='web', featured=True,
                        description='林内中国官方网站及在线售后服务平台。含产品展示、新闻发布、在线售后申请、维修材料管理、后台统一管理门户及 BI 决策分析系统。',
                        tech_stack=json.dumps(['ASP.NET WebForms', 'C#', 'MySQL', 'AjaxControlToolkit', 'Web Service', 'SSRS'])),
                Project(title='条码标签打印系统 — airdoorprint', sort_order=4, category='other',
                        description='生产线门板标签打印系统，集成 BarTender 自动化版 SDK，程序化控制标签模板加载与打印。',
                        tech_stack=json.dumps(['C#', 'WinForm', 'BarTender SDK', 'Excel'])),
                Project(title='IFS 移动应用 — mobileIfs', sort_order=5, category='other',
                        description='基于 IFS ERP 系统的工业 PDA 移动端应用。SOAP WebService 与 ERP 通讯，本地 SQLite 缓存。',
                        tech_stack=json.dumps(['C#', '.NET Compact Framework', 'Windows CE', 'SQLite', 'SOAP Web Service'])),
                Project(title='打印服务器 — PrintServer', sort_order=6, category='other',
                        description='集中式打印服务中间件，BarTender 引擎缓存复用，集成 SSRS 报表打印。',
                        tech_stack=json.dumps(['C#', 'ASP.NET', 'BarTender SDK', 'SSRS', 'ASMX Web Service'])),
                Project(title='手持终端扫码测试工具集', sort_order=7, category='other',
                        description='多品牌手持终端扫码测试工具系列，ScannerMsg API 封装，支持 WiFi 监测与 LED 反馈。',
                        tech_stack=json.dumps(['C#', 'Windows CE', 'Motorola EMDK', 'ScannerMsg SSI API'])),
                Project(title='二维码生成校验系统 — getQR', sort_order=8, category='other',
                        description='生产线二维码防错系统，实时扫码与 MySQL 比对校验，LED 指示灯集成。',
                        tech_stack=json.dumps(['C#', 'WinForm', 'MySQL', '扫码硬件'])),
                Project(title='个人主页 (全栈)', sort_order=9, category='web', featured=True, github_url='https://github.com',
                        description='React + FastAPI 全栈个人主页，9 种风格主题，tsParticles 粒子动效，后台内容管理与访问统计面板。',
                        tech_stack=json.dumps(['React', 'TypeScript', 'FastAPI', 'SQLite', 'Framer Motion', 'CSS Modules'])),
                Project(title='AI 协作编程实践', sort_order=10, category='ai', featured=True,
                        description='深度使用 Claude Code 进行高效全栈开发，探索人机协作编程工作流的最佳实践。',
                        tech_stack=json.dumps(['Claude Code', 'AI', 'React', 'Python', 'TypeScript'])),
                Project(title='Python 游戏开发', sort_order=11, category='game', github_url='https://github.com',
                        description='Python 游戏项目，涵盖引擎逻辑、UI渲染、事件系统和状态机管理。',
                        tech_stack=json.dumps(['Python', 'Pygame', 'OOP'])),
            ])

        if not db.query(Skill).first():
            db.add_all([
                Skill(name='C# / .NET', category='backend', level=95, icon='#️⃣', sort_order=1),
                Skill(name='ASP.NET MVC 5 / Web API', category='backend', level=92, icon='🌐', sort_order=2),
                Skill(name='Entity Framework / Dapper', category='backend', level=90, icon='🗄️', sort_order=3),
                Skill(name='WCF / Web Service (SOAP)', category='backend', level=88, icon='🔗', sort_order=4),
                Skill(name='MySQL', category='backend', level=92, icon='🐬', sort_order=5),
                Skill(name='SQL Server', category='backend', level=85, icon='🔲', sort_order=6),
                Skill(name='REST API 设计', category='backend', level=85, icon='📡', sort_order=7),
                Skill(name='Python / FastAPI', category='backend', level=75, icon='🐍', sort_order=8),
                Skill(name='SQLAlchemy / SQLite', category='backend', level=78, icon='🪶', sort_order=9),
                Skill(name='HTML / CSS / JavaScript', category='frontend', level=85, icon='🎨', sort_order=10),
                Skill(name='jQuery / Bootstrap', category='frontend', level=82, icon='🅱️', sort_order=11),
                Skill(name='React / TypeScript', category='frontend', level=72, icon='⚛️', sort_order=12),
                Skill(name='CSS / Tailwind', category='frontend', level=70, icon='🎐', sort_order=13),
                Skill(name='Framer Motion', category='frontend', level=68, icon='🎬', sort_order=14),
                Skill(name='条码扫描 SDK 集成', category='tools', level=92, icon='📡', sort_order=15),
                Skill(name='BarTender 标签打印', category='tools', level=90, icon='🏷️', sort_order=16),
                Skill(name='Windows CE / PDA 开发', category='tools', level=88, icon='📱', sort_order=17),
                Skill(name='Claude Code / AI 协作', category='tools', level=88, icon='🤖', sort_order=18),
                Skill(name='Git / 版本控制', category='tools', level=82, icon='📦', sort_order=19),
                Skill(name='SSRS / 水晶报表', category='tools', level=75, icon='📊', sort_order=20),
            ])

        if not db.query(TimelineEntry).first():
            db.add_all([
                TimelineEntry(year='2026', title='全栈个人主页', desc='React 19 + FastAPI + 9 种主题系统构建个人主页，AI 协作完成全流程开发，集成粒子动效与后台管理。', sort_order=1),
                TimelineEntry(year='2018', title='Cisco 软电话集成', desc='企业 IP 电话系统集成，软电话控制与状态管理。', sort_order=2),
                TimelineEntry(year='2015', title='打印服务中间件', desc='PrintServer 集中式打印服务，BarTender 引擎管理 + SSRS 报表输出。', sort_order=3),
                TimelineEntry(year='2014', title='煤改气售后管理系统', desc='ASP.NET MVC 5 + Entity Framework 构建企业级售后系统，含工单管理、RBAC 权限、产品追踪。', sort_order=4),
                TimelineEntry(year='2011', title='ERP 移动条码系统', desc='Windows CE PDA 手持终端开发，多品牌扫描头 SDK 封装，离线 SQLite + SOAP 同步。', sort_order=5),
                TimelineEntry(year='2009', title='IFS 移动应用', desc='基于 IFS ERP 的工业 PDA 移动端开发，SOAP WebService 通讯，本地 SQLite 缓存。', sort_order=6),
                TimelineEntry(year='2008', title='林内企业官网', desc='ASP / ASP.NET WebForms 构建企业官网与售后平台，含产品展示、新闻发布与后台管理。', sort_order=7),
            ])

        db.commit()
    finally:
        db.close()

@app.on_event('startup')
def on_startup():
    init_db()
    _seed_if_empty()
