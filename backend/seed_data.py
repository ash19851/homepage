"""Initialize/update seed data for ash's personal homepage."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))

from app.database import init_db, SessionLocal
from app.models.content import Profile, Project, Skill, TimelineEntry, Article, AdminUser
from passlib.hash import bcrypt
import json

init_db()
db = SessionLocal()

# ── Admin ──
if not db.query(AdminUser).first():
    db.add(AdminUser(username='admin', password_hash=bcrypt.hash('admin123')))
    print('  Admin user created')

# ── Profile ──
profile = db.query(Profile).first()
profile_data = dict(
    name='ash',
    title='全栈开发工程师 · AI/ML 实践者 · 工业软件开发',
    bio='15+ 年全栈开发经验，深耕 .NET 生态与工业硬件集成（Win CE/PDA/条码扫描），兼备 AI/ML 工程化能力（LLM 微调、计算机视觉、RAG 系统）。热衷探索量化交易、游戏开发等前沿技术，善用 AI 协作高效完成全栈项目。具备从企业级 SaaS 到 Windows 桌面应用的全链路交付能力。',
    avatar_url='',
    github_url='https://github.com',
    email='ash@example.com'
)
if not profile:
    db.add(Profile(**profile_data))
else:
    for k, v in profile_data.items():
        setattr(profile, k, v)
    print('  Profile updated')

# ── Projects ──
if db.query(Project).first():
    db.query(Project).delete()
    db.commit()

projects = [
    # ===== 2026 大型全栈/AI项目 (最重+最新) =====
    Project(title='AI 设计 SaaS 平台 — aiprint', sort_order=1,
            description='AI 驱动的在线设计平台，支持文生图/图生图/文生视频/图生视频。React 19 + TypeScript 前端（Konva Canvas 编辑器、图层/滤镜/工具栏），FastAPI 异步后端 + Celery 任务队列 + WebSocket 实时进度推送，PostgreSQL + Redis + MinIO 存储，Docker Compose 一键部署。',
            tech_stack=json.dumps(['React 19', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'MinIO', 'Docker', 'Konva', 'Zustand', 'Tailwind CSS']),
            category='ai', featured=True, github_url='https://github.com', image_url=''),
    Project(title='量化交易平台 — ailianghua', sort_order=2,
            description='综合性量化交易系统，支持 A 股和加密货币。含策略回测引擎、参数优化（Optuna）、ML 模型训练（LightGBM+LSTM）、情绪分析（FinBERT）、实盘/模拟交易、风险管理系统。提供 CLI/Web(Streamlit)/桌面(PySide6) 三种交互界面，50+ 单元测试。',
            tech_stack=json.dumps(['Python', 'Click', 'Streamlit', 'PySide6', 'LightGBM', 'scikit-learn', 'Optuna', 'akshare', 'ccxt', 'SQLAlchemy', 'FinBERT']),
            category='ai', featured=True, github_url='https://github.com', image_url=''),
    Project(title='企业知识库 Agent — aiduihua (RAG 系统)', sort_order=3,
            description='企业级知识库智能问答系统。LangChain + LangGraph 构建 RAG 流水线：混合检索（向量 + BM25）、ChromaDB 向量存储、多 LLM 后端支持（Ollama/Transformers/vLLM）。FastAPI REST API，支持文档上传解析（PDF/Word/Excel/PPT）、智能摘要、多轮对话、报告生成。',
            tech_stack=json.dumps(['Python', 'FastAPI', 'LangChain', 'LangGraph', 'ChromaDB', 'Ollama', 'Transformers', 'sentence-transformers', 'Jieba', 'PyPDF']),
            category='ai', featured=True, github_url='https://github.com', image_url=''),
    Project(title='企业在线学习平台 — learingweb', sort_order=4,
            description='企业级学习管理系统(LMS)，支持 Windows AD/LDAP 域账号登录、RBAC 三级权限、课程管理（视频/文档/PDF）、考试系统（单选/多选/判断/简答）、批量任务分派、学习时长心跳追踪+页面焦点检测、多维度统计报表。React 19 + Ant Design 5 + FastAPI 异步后端。',
            tech_stack=json.dumps(['React 19', 'TypeScript', 'FastAPI', 'Celery', 'Redis', 'ldap3', 'Ant Design 5', 'ECharts', 'Zustand', 'SQLAlchemy']),
            category='web', featured=True, github_url='https://github.com', image_url=''),
    Project(title='BI 报表平台 — reportBI', sort_order=5,
            description='配置驱动的商业智能报表平台。支持外部数据库接入（MySQL/PostgreSQL/SQL Server/SQLite）、拖拽式报表设计器、7 种图表（柱状/饼图/折线/中国地图/热力图/散点/表格）、3 种数据同步模式（定时/WebSocket/ARQ 队列）、RBAC 权限。Docker Compose 部署。',
            tech_stack=json.dumps(['React 18', 'TypeScript', 'FastAPI', 'Redis', 'APScheduler', 'ARQ', 'ECharts', 'Ant Design', 'Docker', 'SQLAlchemy']),
            category='web', featured=True, github_url='https://github.com', image_url=''),
    Project(title='PCE Copilot — 工程项目管理桌面端', sort_order=6,
            description='为 Premium Consulting Engineers (澳洲工程咨询公司) 开发的生产级桌面应用。管理工程项目全生命周期：报价提案、发票/账单、图纸管理、利润分析。集成 Xero OAuth2 会计、Asana 项目管理、Google Drive、Outlook COM。独创 Bluebeam Revu PDF 处理自动化代理——通过屏幕坐标精确控制专业 PDF 软件完成批量操作。',
            tech_stack=json.dumps(['Python', 'PyQt5', 'MySQL', 'SQLAlchemy', 'Xero OAuth2', 'Asana API', 'Bluebeam Revu', 'pyautogui', 'pywin32', 'Inkscape']),
            category='other', featured=True, github_url='', image_url=''),

    # ===== 2026 专业AI/开发项目 =====
    Project(title='AI 模型微调工具集 — aitrain', sort_order=7,
            description='Qwen 系列大模型本地指令微调工具包，适配 RTX 5090 32GB。含 QLoRA 训练 GUI/CLI、Ollama 训练数据自动生成器、Gradio 6 流式对话界面（思考过程可视化）、PyQt6 桌面客户端、LoRA 适配器合并脚本。支持 4-bit/8-bit 量化训练。',
            tech_stack=json.dumps(['Python', 'PyTorch', 'Transformers', 'PEFT/QLoRA', 'bitsandbytes', 'Gradio 6', 'PyQt6', 'Ollama', 'aiohttp']),
            category='ai', featured=True, github_url='https://github.com', image_url=''),
    Project(title='单目深度估计 — depth-anything', sort_order=8,
            description='基于 Depth Anything V2 (HKU/TikTok) 的单目深度估计项目。支持 Small~Giant 四种模型规格，含实时摄像头深度检测（RGB+深度并列）、MediaPipe 手势识别 + AR 虚实遮挡演示，Gradio 交互式 Demo。',
            tech_stack=json.dumps(['Python', 'PyTorch', 'OpenCV', 'Gradio', 'MediaPipe', 'DINOv2', 'DPT']),
            category='ai', featured=True, github_url='https://github.com', image_url=''),
    Project(title='游戏视觉检测工具 — game-vision', sort_order=9,
            description='Windows 实时游戏画面捕获与 YOLO 目标检测工具。DXCam/DirectX 高速截屏（~3ms 延迟）、DWM 缩略图后台捕获、BitBlt 兼容回退，YOLOv8-v11 实时推理。含交互式标注数据采集工具和训练数据导出。',
            tech_stack=json.dumps(['Python', 'PyTorch', 'YOLO', 'OpenCV', 'DXCam', 'pynput', 'Tkinter']),
            category='ai', featured=True, github_url='https://github.com', image_url=''),
    Project(title='像素肉鸽游戏 — rouggame', sort_order=10,
            description='2D 像素 Roguelike 游戏。过程生成房间、多种门类型（战斗/资源/解谜）、ECS 架构、场景状态机、经验升级+技能选择、装备局间继承（JSON 持久化）、Boss 战、粒子特效和程序化像素精灵。所有游戏数值 JSON 可配置。',
            tech_stack=json.dumps(['Python', 'Pygame-CE', 'JSON', 'ECS', 'Procedural Generation']),
            category='game', featured=True, github_url='https://github.com', image_url=''),
    Project(title='个人主页 (全栈)', sort_order=11,
            description='React 19 + FastAPI 全栈个人主页，9 种风格主题 (赛博朋克 / 极简白 / 玻璃幻境 / 水墨丹青 / 孟菲斯等)，tsParticles 粒子动效，Framer Motion 动画，后台内容管理与访问统计面板。',
            tech_stack=json.dumps(['React 19', 'TypeScript', 'FastAPI', 'SQLite', 'Framer Motion', 'CSS Modules', 'tsParticles']),
            category='web', featured=True, github_url='https://github.com', demo_url='', image_url=''),

    # ===== 2025-2026 Web应用 =====
    Project(title='钓鱼邮件演练系统 — diuyumail', sort_order=12,
            description='企业钓鱼邮件模拟与安全意识培训平台。7 种邮件模板（HR奖金/IT维护/CEO通知/发票等），SMTP 批量发送，追踪点击者 IP/浏览器/UA，受害者跳转安全教育页面。含 Web 管理后台、PyInstaller 独立打包。',
            tech_stack=json.dumps(['Python', 'Flask', 'SQLite', 'Pandas', 'openpyxl', 'PyInstaller', 'Bootstrap']),
            category='web', featured=True, github_url='https://github.com', image_url=''),
    Project(title='企业官网 CMS — 禾养东方', sort_order=13,
            description='内蒙古蒙谷生态农业科技集团官方网站，含完整 CMS 后台。Node.js + Express + EJS 服务端渲染，Quill 富文本编辑器，6 种 CSS 主题切换，轮播图/产品/新闻/案例/门店 CRUD，QQ/微信在线客服。',
            tech_stack=json.dumps(['Node.js', 'Express', 'EJS', 'SQLite', 'Quill', 'CSS Variables', 'Responsive']),
            category='web', featured=False, github_url='https://github.com', image_url=''),
    Project(title='IT满意度调查系统 — wenjuandiaocha', sort_order=14,
            description='IT 服务满意度在线调查平台。批量生成一次性调查链接、SMTP 邮件群发、1-5 分评分 + 文本反馈收集。后台 Chart.js 柱状图统计、平均分展示、评论浏览。Bootstrap 5 响应式前端。',
            tech_stack=json.dumps(['Python', 'Flask', 'SQLite', 'openpyxl', 'Bootstrap 5', 'Chart.js', 'smtplib']),
            category='web', featured=False, github_url='https://github.com', image_url=''),

    # ===== 企业数据工具 =====
    Project(title='SAP HANA 数据抽取工具 — getsaotorj', sort_order=15,
            description='企业 SAP HANA 业务数据抽取与邮件分发工具。连接 SAP HANA 拉取主数据（销售渠道/产品/客户）和交易数据（财务凭证/交货/库存），pandas 数据清洗后 CSV 导出，Outlook COM 自动化邮件分发，含归档目录自动备份。',
            tech_stack=json.dumps(['Python', 'hdbcli (SAP HANA)', 'Pandas', 'pywin32', 'Outlook COM']),
            category='other', featured=False, github_url='https://github.com', image_url=''),

    # ===== 2026 小游戏 =====
    Project(title='微信小游戏 — 飞机大战', sort_order=16,
            description='基于微信小游戏 SDK 的 Canvas 射击游戏。对象池管理、精灵动画、事件发射器模式、碰撞检测、分数系统。深度探索微信小游戏开发平台的渲染与性能优化。',
            tech_stack=json.dumps(['JavaScript', 'WeChat Mini-Game SDK', 'Canvas', 'Object Pooling', 'EventEmitter']),
            category='game', featured=False, github_url='https://github.com', image_url=''),
    Project(title='双人坦克大战 — test1', sort_order=17,
            description='双人坦克对战游戏，支持合作模式(P1+P2 vs AI)和对战模式(P1 vs P2)。有限状态机(FSM)架构：6 种状态(Idle/Moving/Shooting/Dead/Respawning/GameOver)，含调试面板实时显示状态转换。',
            tech_stack=json.dumps(['Python', 'Pygame-CE', 'FSM', 'OOP']),
            category='game', featured=False, github_url='https://github.com', image_url=''),

    # ===== AI协作 =====
    Project(title='AI 协作编程实践', sort_order=18,
            description='深度使用 Claude Code 进行高效全栈开发。从项目脚手架到多主题系统、粒子动效、后台面板，全程 AI 协作完成 16+ 个项目，探索人机协作编程工作流的最佳实践。',
            tech_stack=json.dumps(['Claude Code', 'AI', 'React', 'Python', 'TypeScript', 'Full-Stack']),
            category='ai', featured=True, github_url='', image_url=''),
]
db.add_all(projects)
print(f'  {len(projects)} projects seeded')

# ── Skills ──
if db.query(Skill).first():
    db.query(Skill).delete()
    db.commit()

skills = [
    # Backend — .NET 生态
    Skill(name='C# / .NET', category='backend', level=95, icon='#️⃣', sort_order=1),
    Skill(name='ASP.NET MVC 5 / Web API', category='backend', level=92, icon='🌐', sort_order=2),
    Skill(name='Entity Framework / Dapper', category='backend', level=90, icon='🗄️', sort_order=3),
    Skill(name='WCF / Web Service (SOAP)', category='backend', level=88, icon='🔗', sort_order=4),
    Skill(name='MySQL / SQL Server', category='backend', level=92, icon='🐬', sort_order=5),
    Skill(name='REST API 设计', category='backend', level=88, icon='📡', sort_order=6),
    # Backend — Python 生态
    Skill(name='Python / FastAPI', category='backend', level=88, icon='🐍', sort_order=7),
    Skill(name='SQLAlchemy (Async)', category='backend', level=85, icon='🪶', sort_order=8),
    Skill(name='Flask', category='backend', level=78, icon='🍶', sort_order=9),
    Skill(name='Celery / Redis 任务队列', category='backend', level=80, icon='⏳', sort_order=10),
    Skill(name='Node.js / Express', category='backend', level=72, icon='🟢', sort_order=11),
    # Frontend
    Skill(name='React / TypeScript', category='frontend', level=82, icon='⚛️', sort_order=12),
    Skill(name='HTML / CSS / JavaScript', category='frontend', level=85, icon='🎨', sort_order=13),
    Skill(name='Ant Design 5', category='frontend', level=78, icon='🐜', sort_order=14),
    Skill(name='Tailwind CSS / CSS Modules', category='frontend', level=75, icon='🎐', sort_order=15),
    Skill(name='ECharts / Chart.js', category='frontend', level=78, icon='📊', sort_order=16),
    Skill(name='Framer Motion / 动画', category='frontend', level=72, icon='🎬', sort_order=17),
    Skill(name='jQuery / Bootstrap', category='frontend', level=82, icon='🅱️', sort_order=18),
    Skill(name='Gradio / Streamlit', category='frontend', level=75, icon='🖥️', sort_order=19),
    # AI/ML
    Skill(name='PyTorch / 深度学习', category='ai', level=80, icon='🔥', sort_order=20),
    Skill(name='Transformers / QLoRA 微调', category='ai', level=75, icon='🧠', sort_order=21),
    Skill(name='LangChain / LangGraph', category='ai', level=75, icon='🦜', sort_order=22),
    Skill(name='ChromaDB / 向量数据库', category='ai', level=72, icon='🗂️', sort_order=23),
    Skill(name='YOLO 目标检测', category='ai', level=78, icon='👁️', sort_order=24),
    Skill(name='OpenCV 计算机视觉', category='ai', level=75, icon='📷', sort_order=25),
    Skill(name='scikit-learn / LightGBM', category='ai', level=70, icon='📈', sort_order=26),
    # Tools & DevOps
    Skill(name='Docker / Docker Compose', category='tools', level=78, icon='🐳', sort_order=27),
    Skill(name='Git / 版本控制', category='tools', level=85, icon='📦', sort_order=28),
    Skill(name='Claude Code / AI 协作', category='tools', level=90, icon='🤖', sort_order=29),
    Skill(name='BarTender 标签打印', category='tools', level=90, icon='🏷️', sort_order=30),
    Skill(name='条码扫描 SDK 集成', category='tools', level=92, icon='📡', sort_order=31),
    Skill(name='Windows CE / PDA 开发', category='tools', level=88, icon='📱', sort_order=32),
    Skill(name='PyQt5 / PySide6 桌面端', category='tools', level=82, icon='🖼️', sort_order=33),
    Skill(name='SAP HANA / 数据库', category='tools', level=68, icon='🏢', sort_order=34),
    Skill(name='PyInstaller 打包部署', category='tools', level=72, icon='📦', sort_order=35),
    Skill(name='微信小游戏 / 小程序', category='tools', level=65, icon='💬', sort_order=36),
    Skill(name='PostgreSQL / MinIO', category='tools', level=72, icon='🪣', sort_order=37),
    Skill(name='WebSocket 实时通信', category='tools', level=75, icon='🔌', sort_order=38),
    Skill(name='LDAP / AD 域认证', category='tools', level=72, icon='🔐', sort_order=39),
    # Game
    Skill(name='Pygame-CE / 游戏开发', category='tools', level=78, icon='🎮', sort_order=40),
    Skill(name='游戏 AI / FSM 状态机', category='ai', level=72, icon='🎯', sort_order=41),
]
db.add_all(skills)
print(f'  {len(skills)} skills seeded')

# ── Timeline ──
if db.query(TimelineEntry).first():
    db.query(TimelineEntry).delete()
    db.commit()

timeline = [
    TimelineEntry(year='2026', title='AI 设计 SaaS 平台 — aiprint',
                  desc='React 19 + Konva Canvas 编辑器，FastAPI 异步后端 + Celery + Redis + MinIO，多 AI 提供商接入（文生图/图生图/视频），Docker Compose 全栈部署。', sort_order=1),
    TimelineEntry(year='2026', title='企业知识库 Agent — aiduihua',
                  desc='LangChain + LangGraph 构建 RAG 智能问答系统，ChromaDB 向量存储 + BM25 混合检索，支持多 LLM 后端，含文档摘要与报告生成。', sort_order=2),
    TimelineEntry(year='2026', title='全栈个人主页',
                  desc='React 19 + FastAPI + 9 种主题系统构建个人主页，AI 协作完成全流程开发，集成粒子动效与后台管理。', sort_order=3),
    TimelineEntry(year='2026', title='量化交易平台 — ailianghua',
                  desc='综合性量化交易系统：策略回测、参数优化(Optuna)、ML 模型训练(LightGBM)、情绪分析(FinBERT)、CLI/Web/桌面三界面。', sort_order=4),
    TimelineEntry(year='2026', title='企业 LMS 学习平台 — learingweb',
                  desc='企业在线学习管理系统，LDAP/AD 域登录，RBAC 三级权限，考试系统，学习时长追踪，React 19 + FastAPI 异步。', sort_order=5),
    TimelineEntry(year='2026', title='BI 报表平台 — reportBI',
                  desc='配置驱动 BI 平台，外部数据库接入，拖拽报表设计器，7 种图表，3 种数据同步，Docker Compose 部署。', sort_order=6),
    TimelineEntry(year='2026', title='AI 模型微调工具集 — aitrain',
                  desc='Qwen 大模型 QLoRA 本地微调工具包，Gradio 6 流式对话 + PyQt6 桌面客户端 + Ollama 数据自动生成。', sort_order=7),
    TimelineEntry(year='2026', title='单目深度估计 — depth-anything',
                  desc='Depth Anything V2 单目深度估计，实时摄像头 RGB+深度可视化，MediaPipe AR 虚实遮挡。', sort_order=8),
    TimelineEntry(year='2026', title='游戏视觉检测工具 — game-vision',
                  desc='DXCam+YOLO 实时游戏目标检测，支持 DirectX/DWM/BitBlt 三种截屏后端，含标注数据采集工具。', sort_order=9),
    TimelineEntry(year='2026', title='像素肉鸽游戏 — rouggame',
                  desc='2D Roguelike 游戏，ECS 架构 + 过程生成房间 + 装备局间继承 + Boss 战，Python Pygame-CE 开发。', sort_order=10),
    TimelineEntry(year='2026', title='PCE Copilot 桌面应用',
                  desc='为澳洲工程咨询公司开发的生产级 PyQt5 项目管理桌面端，集成 Xero/Asana/Bluebeam Revu 自动化。', sort_order=11),
    TimelineEntry(year='2025', title='钓鱼邮件演练系统 — diuyumail',
                  desc='企业安全意识培训平台，7 种钓鱼模板，SMTP 批量发送，点击追踪 + 安全教育页面跳转，PyInstaller 打包。', sort_order=12),
    TimelineEntry(year='2025', title='SAP HANA 数据抽取工具',
                  desc='连接 SAP HANA 拉取主数据+交易数据，pandas 清洗 CSV 导出，Outlook COM 自动化邮件分发。', sort_order=13),
    TimelineEntry(year='2025', title='IT满意度调查系统',
                  desc='Flask 在线调查平台，批量生成一次性链接，Chart.js 统计面板，Bootstrap 5 响应式。', sort_order=14),
    TimelineEntry(year='2025', title='企业官网 CMS — 禾养东方',
                  desc='Node.js + Express + EJS 企业官网，完整 CMS 后台，Quill 编辑器，6 种主题切换，响应式布局。', sort_order=15),
    TimelineEntry(year='2018', title='Cisco 软电话集成',
                  desc='企业 IP 电话系统集成，软电话控制与状态管理。', sort_order=16),
    TimelineEntry(year='2015', title='打印服务中间件',
                  desc='PrintServer 集中式打印服务，BarTender 引擎管理 + SSRS 报表输出。', sort_order=17),
    TimelineEntry(year='2014', title='煤改气售后管理系统',
                  desc='ASP.NET MVC 5 + Entity Framework 构建企业级售后系统，含工单管理、RBAC 权限、产品追踪。', sort_order=18),
    TimelineEntry(year='2011', title='ERP 移动条码系统',
                  desc='Windows CE PDA 手持终端开发，多品牌扫描头 SDK 封装，离线 SQLite + SOAP 同步。', sort_order=19),
    TimelineEntry(year='2009', title='IFS 移动应用',
                  desc='基于 IFS ERP 的工业 PDA 移动端开发，SOAP WebService 通讯，本地 SQLite 缓存。', sort_order=20),
    TimelineEntry(year='2008', title='企业官网',
                  desc='ASP / ASP.NET WebForms 构建企业官网与售后平台，含产品展示、新闻发布与后台管理。', sort_order=21),
]
db.add_all(timeline)
print(f'  {len(timeline)} timeline entries seeded')

# ── Articles ──
if db.query(Article).first():
    db.query(Article).delete()
    db.commit()

articles = [
    Article(title='LangChain + LangGraph 构建企业 RAG 知识库', slug='rag-knowledge-base',
            summary='从零搭建企业级 RAG 系统：混合检索（向量+BM25）、ChromaDB 存储、多轮对话记忆、文档解析管线。完整代码与架构设计。',
            content_md='## 为什么需要 RAG\n\n企业沉淀了大量的文档知识（PDF、Word、Excel），但检索困难。RAG (Retrieval-Augmented Generation) 将 LLM 与企业知识库连接，让 AI 能「读懂」企业内部文档。\n\n## 技术架构\n\n- **文档解析**：PyPDF + python-docx + python-pptx 多格式支持\n- **文本分块**：按段落 + 语义分割，chunk_size=500\n- **向量化**：sentence-transformers (BGE-M3)\n- **混合检索**：ChromaDB 向量相似度 + BM25 关键词匹配 → RRF 融合\n- **对话引擎**：LangGraph Agent，含工具调用（搜索/摘要/报告生成）\n\n## FastAPI 接口设计\n\n```python\n@router.post("/chat")\nasync def chat(request: ChatRequest):\n    docs = hybrid_search(request.query, top_k=5)\n    context = "\\n\\n".join(docs)\n    answer = await llm.ainvoke(context, request.query)\n    return {"answer": answer, "sources": docs}\n```',
            category='ai', published=True),
    Article(title='QLoRA 微调实战：在消费级显卡上微调大模型', slug='qlora-finetune',
            summary='使用 QLoRA 技术在 RTX 3060/5090 上微调 Qwen 系列模型，包含完整训练脚本、数据生成和推理部署。',
            content_md='## 背景\n\n大模型微调一直被认为是 A100/H100 的专利。QLoRA 技术改变了这一现状——通过 4-bit 量化 + Low-Rank Adapter，在 12GB 显存的消费级显卡上也能微调 7B 模型。\n\n## 原理\n\nQLoRA = Quantization + LoRA\n\n- **4-bit NormalFloat**：新的量化数据类型，比 4-bit 整数保留更多信息\n- **双重量化**：对量化常数再量化，进一步节省显存\n- **Paged Optimizer**：统一内存管理，处理梯度尖峰\n\n## 实践：Qwen-7B-Chat 微调\n\n```python\nfrom transformers import BitsAndBytesConfig\n\nbnb_config = BitsAndBytesConfig(\n    load_in_4bit=True,\n    bnb_4bit_quant_type="nf4",\n    bnb_4bit_use_double_quant=True,\n)\n```\n\n- LoRA Rank: 64, Alpha: 16\n- 训练数据：1000 条中文指令\n- RTX 5090 32GB 可微调 14B 模型',
            category='ai', published=True),
    Article(title='YOLO 实时游戏目标检测：从截屏到推理', slug='yolo-game-detection',
            summary='使用 DXCam + YOLOv8 实现 FPS 游戏实时目标检测，包含截屏性能对比、模型优化和标注工具链。',
            content_md='## 概述\n\n游戏 AI 的第一步是感知。本文介绍如何构建一个高性能的游戏目标检测管线。\n\n## 截屏性能对比\n\n| 方法 | 延迟 | FPS | 原理 |\n|------|------|-----|------|\n| PyAutoGUI | ~50ms | 20 | GDI 截图 |\n| MSS | ~15ms | 60 | 跨平台 |\n| DXCam | ~3ms | 240+ | DirectX 显存直取 |\n\nDXCam 利用 DirectX Desktop Duplication API 直接从 GPU 显存抓取，避免了 CPU↔GPU 数据搬运，延迟仅 ~3ms。\n\n## 推理优化\n\n- ONNX Runtime 加速推理\n- FP16 半精度模型\n- CUDA Stream 并行化（截屏+推理流水线）',
            category='ai', published=True),
    Article(title='ASP.NET MVC 5 企业级架构实践', slug='aspnet-mvc5-architecture',
            summary='多年 ASP.NET MVC 5 实践总结：三层架构设计、依赖注入、RBAC 权限系统和性能优化。',
            content_md='## 为什么还在用 MVC 5\n\n很多企业内部系统并不需要微服务。三层架构配合 SQL Server，开发效率极高，维护成本低，适合中小团队。\n\n## 分层设计\n\n- **Controller**：处理 HTTP 请求，模型绑定，参数校验\n- **Service**：业务逻辑层，事务管理，工作单元\n- **Repository**：Dapper 读 + EF 写（CQRS-lite 模式）\n\n## RBAC 权限系统\n\n自定义实现，基于 OAuth 2.0 Bearer Token。菜单级 + 按钮级双重权限控制。',
            category='tech', published=True),
    Article(title='量化交易平台架构设计：从回测到实盘', slug='quant-trading-architecture',
            summary='构建支持 A 股和加密货币的综合性量化交易系统：策略模式、事件驱动架构、多界面支持和风险管控。',
            content_md='## 系统概览\n\n多资产类别的量化交易平台，支持 A 股（akshare）和加密货币（ccxt），三种交互界面。\n\n## 核心架构\n\n### 事件驱动引擎\n\n```python\nclass EventBus:\n    def publish(self, event: Event): ...\n    def subscribe(self, event_type, handler): ...\n```\n\n### 策略模式\n\n所有策略继承基类 `BaseStrategy`，实现 `on_bar()` / `on_tick()` 方法。策略参数通过 Optuna 自动优化。\n\n### 风险管理系统\n\n- 单笔最大仓位限制\n- 日内最大回撤熔断\n- 止损/止盈自动触发\n\n## 三界面支持\n\n- **CLI** (Click)：快速回测和参数扫描\n- **Web** (Streamlit + Plotly)：可视化分析和监控\n- **桌面** (PySide6 + Matplotlib)：专业交易终端',
            category='tech', published=True),
    Article(title='PyQt5 企业桌面应用开发实战：PCE Copilot', slug='pyqt5-enterprise-desktop',
            summary='为澳洲工程咨询公司构建的 PyQt5 项目管理桌面端：数据库设计、第三方 API 集成 (Xero/Asana) 和 PDF 自动化。',
            content_md='## 项目背景\n\nPremium Consulting Engineers 是澳洲一家工程咨询公司。需要一款桌面应用管理工程项目的完整生命周期。\n\n## 技术方案\n\n- **GUI**：PyQt5 + Qt Designer (.ui 文件)\n- **数据库**：MySQL + SQLAlchemy ORM\n- **集成**：Xero OAuth2 (会计)、Asana REST API (项目管理)、Google Drive API\n- **自动化**：pyautogui 屏幕坐标控制 Bluebeam Revu PDF 软件\n\n## 独特挑战\n\nBluebeam Revu 没有公开 API。通过分析窗口句柄和控件坐标，实现了精确的屏幕自动化操作，处理批量 PDF 盖章/标记/导出。',
            category='tech', published=True),
]
db.add_all(articles)
print(f'  {len(articles)} articles seeded')

db.commit()
db.close()
print('\nSeed data complete!')
print('  Admin: admin / admin123')
