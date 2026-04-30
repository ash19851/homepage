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
        name='UNANG', title='全栈开发者 · AI 协作实践者',
        bio='热衷于探索技术边界的全栈开发者。专注 React 生态与 Python 后端，深度使用 AI 协作工具高效编程。',
        avatar_url='', github_url='https://github.com', email='unang@example.com'
    ))

# 项目
if not db.query(Project).first():
    projects = [
        Project(title='个人主页', description='React + FastAPI 全栈个人主页，5种科技风主题，tsParticles粒子动效，后台管理面板。',
                tech_stack=json.dumps(['React', 'TypeScript', 'FastAPI', 'SQLite', 'CSS Modules']),
                category='web', featured=True, sort_order=1, github_url='https://github.com'),
        Project(title='Python 游戏开发', description='Python游戏项目，涵盖引擎逻辑、UI渲染、事件系统和状态机管理。',
                tech_stack=json.dumps(['Python', 'Pygame', 'OOP']),
                category='game', featured=True, sort_order=2, github_url='https://github.com'),
        Project(title='AI 编程工作流', description='深度使用 Claude Code 构建高效协作编程工作流。',
                tech_stack=json.dumps(['Claude Code', 'AI', 'Automation']),
                category='ai', featured=True, sort_order=3),
    ]
    db.add_all(projects)

# 技能
if not db.query(Skill).first():
    skills = [
        Skill(name='React / TypeScript', category='frontend', level=90, icon='⚛️', sort_order=1),
        Skill(name='CSS / Tailwind', category='frontend', level=85, icon='🎨', sort_order=2),
        Skill(name='Python / FastAPI', category='backend', level=88, icon='🐍', sort_order=3),
        Skill(name='SQLAlchemy / SQLite', category='backend', level=82, icon='🗄️', sort_order=4),
        Skill(name='Claude Code / AI', category='tools', level=92, icon='🤖', sort_order=5),
        Skill(name='Git / GitHub', category='tools', level=88, icon='📦', sort_order=6),
        Skill(name='Framer Motion', category='frontend', level=78, icon='🎬', sort_order=7),
        Skill(name='REST API 设计', category='backend', level=85, icon='🔗', sort_order=8),
    ]
    db.add_all(skills)

db.commit()
db.close()
print('种子数据初始化完成!')
print('  管理员: admin / admin123')
