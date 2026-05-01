"""初始化种子数据 — 运行一次即可"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))

from app.database import init_db, SessionLocal
from app.models.content import Profile, Project, Skill, AdminUser
from passlib.hash import bcrypt
import json

init_db()
db = SessionLocal()

# Admin用户 (admin / admin123)
if not db.query(AdminUser).first():
    db.add(AdminUser(username='admin', password_hash=bcrypt.hash('admin123')))

# 个人资料
if not db.query(Profile).first():
    db.add(Profile(
        name='UNANG', title='软件开发工程师 · 工业物联网开发',
        bio='全栈开发者，深耕 .NET 生态与工业硬件集成。擅长 ASP.NET MVC、Windows CE 嵌入式开发、条码/PLC 等工业通讯协议，热衷 AI 协作编程探索新技术边界。',
        avatar_url='', github_url='https://github.com', email='unang@example.com'
    ))

# 项目
if not db.query(Project).first():
    projects = [
        # ===== 工业/企业项目 (简历) =====
        Project(
            title='林内售后管理系统', sort_order=1,
            description='企业级售后服务管理系统，支撑煤改气工程项目。涵盖工单全生命周期管理、多角色 RBAC 权限体系、产品序列号追踪，经典 ASP.NET MVC 5 三层架构。',
            tech_stack=json.dumps(['C#', 'ASP.NET MVC 5', 'Entity Framework 6', 'Dapper', 'Unity DI', 'OAuth 2.0', 'SQL Server', 'Bootstrap']),
            category='web', featured=True, github_url='',
        ),
        Project(
            title='ERP 移动条码系统 — ERPBCS', sort_order=2,
            description='林内 ERP 移动端 PDA 解决方案。实时库存盘点、出入库扫码、离线 SQLite 缓存 + SOAP Web Service 同步，多品牌扫描头 SDK 统一封装。',
            tech_stack=json.dumps(['C#', '.NET Compact Framework', 'Windows CE', 'MySQL', 'SQLite', 'SOAP Web Service', 'WinForm']),
            category='other', featured=True, github_url='',
        ),
        Project(
            title='林内企业官网 + 售后平台', sort_order=3,
            description='林内中国官方网站及在线售后服务平台。含产品展示、新闻发布、在线售后申请、维修材料管理、后台统一管理门户及 BI 决策分析系统。',
            tech_stack=json.dumps(['ASP.NET WebForms', 'C#', 'MySQL', 'AjaxControlToolkit', 'Web Service', 'SSRS']),
            category='web', featured=True, github_url='',
        ),
        Project(
            title='条码标签打印系统 — airdoorprint', sort_order=4,
            description='生产线门板标签打印系统，集成 BarTender 自动化版 SDK，程序化控制标签模板加载与打印，支持 Excel 数据源和多格式条码模板。',
            tech_stack=json.dumps(['C#', 'WinForm', 'BarTender SDK', 'Excel']),
            category='other', featured=False, github_url='',
        ),
        Project(
            title='IFS 移动应用 — mobileIfs', sort_order=5,
            description='基于 IFS ERP 系统的工业 PDA 移动端应用。SOAP WebService 与 ERP 通讯，本地 SQLite 缓存，多版本迭代适配不同手持终端型号。',
            tech_stack=json.dumps(['C#', '.NET Compact Framework', 'Windows CE', 'SQLite', 'SOAP Web Service']),
            category='other', featured=False, github_url='',
        ),
        Project(
            title='打印服务器 — PrintServer', sort_order=6,
            description='集中式打印服务中间件，通过 Web Service (ASMX) 对外提供标签打印接口。BarTender 引擎缓存复用，集成 SSRS 报表打印，支撑生产环境集中任务调度。',
            tech_stack=json.dumps(['C#', 'ASP.NET', 'BarTender SDK', 'SSRS', 'ASMX Web Service']),
            category='other', featured=False, github_url='',
        ),
        Project(
            title='手持终端扫码测试工具集', sort_order=7,
            description='针对 Motorola MC3090/MC3190、SCC、Zebra 等多品牌手持终端的扫码测试工具系列。ScannerMsg API 全套封装，支持 WiFi 监测、LED 反馈、参数配置等。',
            tech_stack=json.dumps(['C#', 'Windows CE', 'Motorola EMDK', 'ScannerMsg SSI API']),
            category='other', featured=False, github_url='',
        ),
        Project(
            title='二维码生成校验系统 — getQR', sort_order=8,
            description='生产线二维码防错系统，根据产品编码生成唯一二维码并与 MySQL 数据库实时比对校验，集成 LED 指示灯与硬件扫描设备，支持通道管理和进出库追踪。',
            tech_stack=json.dumps(['C#', 'WinForm', 'MySQL', '扫码硬件']),
            category='other', featured=False, github_url='',
        ),
        # ===== 个人/全栈项目 =====
        Project(
            title='个人主页 (全栈)', sort_order=9,
            description='React + FastAPI 全栈个人主页，9 种风格主题 (赛博朋克 / 极简白 / 玻璃幻境 / 水墨丹青 / 孟菲斯等)，tsParticles 粒子动效，后台内容管理与访问统计面板。',
            tech_stack=json.dumps(['React', 'TypeScript', 'FastAPI', 'SQLite', 'Framer Motion', 'CSS Modules']),
            category='web', featured=True, github_url='https://github.com', demo_url='',
        ),
        Project(
            title='AI 协作编程实践', sort_order=10,
            description='深度使用 Claude Code 进行高效全栈开发。从项目脚手架到多主题系统、粒子动效、后台面板，全程 AI 协作完成，探索人机协作编程工作流的最佳实践。',
            tech_stack=json.dumps(['Claude Code', 'AI', 'React', 'Python', 'TypeScript']),
            category='ai', featured=True, github_url='',
        ),
        Project(
            title='Python 游戏开发', sort_order=11,
            description='Python 游戏项目，涵盖引擎逻辑、UI渲染、事件系统和状态机管理，深入实践面向对象编程。',
            tech_stack=json.dumps(['Python', 'Pygame', 'OOP']),
            category='game', featured=False, github_url='https://github.com',
        ),
    ]
    db.add_all(projects)

# 技能
if not db.query(Skill).first():
    skills = [
        # ===== 后端 (工业/企业) =====
        Skill(name='C# / .NET', category='backend', level=95, icon='#️⃣', sort_order=1),
        Skill(name='ASP.NET MVC 5 / Web API', category='backend', level=92, icon='🌐', sort_order=2),
        Skill(name='Entity Framework / Dapper', category='backend', level=90, icon='🗄️', sort_order=3),
        Skill(name='WCF / Web Service (SOAP)', category='backend', level=88, icon='🔗', sort_order=4),
        Skill(name='MySQL', category='backend', level=92, icon='🐬', sort_order=5),
        Skill(name='SQL Server', category='backend', level=85, icon='🔲', sort_order=6),
        Skill(name='REST API 设计', category='backend', level=85, icon='📡', sort_order=7),
        # ===== 后端 (现代全栈) =====
        Skill(name='Python / FastAPI', category='backend', level=75, icon='🐍', sort_order=8),
        Skill(name='SQLAlchemy / SQLite', category='backend', level=78, icon='🪶', sort_order=9),
        # ===== 前端 =====
        Skill(name='HTML / CSS / JavaScript', category='frontend', level=85, icon='🎨', sort_order=10),
        Skill(name='jQuery / Bootstrap', category='frontend', level=82, icon='🅱️', sort_order=11),
        Skill(name='React / TypeScript', category='frontend', level=72, icon='⚛️', sort_order=12),
        Skill(name='CSS / Tailwind', category='frontend', level=70, icon='🎐', sort_order=13),
        Skill(name='Framer Motion', category='frontend', level=68, icon='🎬', sort_order=14),
        # ===== 工业/工具链 =====
        Skill(name='条码扫描 SDK 集成', category='tools', level=92, icon='📡', sort_order=15),
        Skill(name='BarTender 标签打印', category='tools', level=90, icon='🏷️', sort_order=16),
        Skill(name='Windows CE / PDA 开发', category='tools', level=88, icon='📱', sort_order=17),
        Skill(name='Claude Code / AI 协作', category='tools', level=88, icon='🤖', sort_order=18),
        Skill(name='Git / 版本控制', category='tools', level=82, icon='📦', sort_order=19),
        Skill(name='SSRS / 水晶报表', category='tools', level=75, icon='📊', sort_order=20),
    ]
    db.add_all(skills)

db.commit()
db.close()
print('种子数据初始化完成!')
print('  管理员: admin / admin123')
