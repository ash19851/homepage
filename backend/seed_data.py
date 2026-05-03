"""初始化种子数据 — 运行一次即可"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))

from app.database import init_db, SessionLocal
from app.models.content import Profile, Project, Skill, TimelineEntry, Article, AdminUser
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
        name='ash', title='软件开发工程师 · 工业物联网开发',
        bio='全栈开发者，深耕 .NET 生态与工业硬件集成，兼备 AI/ML 工程化能力。热衷探索计算机视觉、LLM 微调、游戏开发等前沿技术，善用 AI 协作高效完成全栈项目。',
        avatar_url='', github_url='https://github.com', email='ash@example.com'
    ))

# 项目
if not db.query(Project).first():
    projects = [
        # ===== 工业/企业项目 (简历) =====
        Project(
            title='售后管理系统', sort_order=1,
            description='企业级售后服务管理系统，支撑煤改气工程项目。涵盖工单全生命周期管理、多角色 RBAC 权限体系、产品序列号追踪，经典 ASP.NET MVC 5 三层架构。',
            tech_stack=json.dumps(['C#', 'ASP.NET MVC 5', 'Entity Framework 6', 'Dapper', 'Unity DI', 'OAuth 2.0', 'SQL Server', 'Bootstrap']),
            category='web', featured=True, github_url='',
        ),
        Project(
            title='ERP 移动条码系统 — ERPBCS', sort_order=2,
            description='ERP 移动端 PDA 解决方案。实时库存盘点、出入库扫码、离线 SQLite 缓存 + SOAP Web Service 同步，多品牌扫描头 SDK 统一封装。',
            tech_stack=json.dumps(['C#', '.NET Compact Framework', 'Windows CE', 'MySQL', 'SQLite', 'SOAP Web Service', 'WinForm']),
            category='other', featured=True, github_url='',
        ),
        Project(
            title='企业官网 + 售后平台', sort_order=3,
            description='企业官方网站及在线售后服务平台。含产品展示、新闻发布、在线售后申请、维修材料管理、后台统一管理门户及 BI 决策分析系统。',
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
        # ===== E:\githublocal 项目 =====
        Project(
            title='AI 模型微调工具集 — aitrain', sort_order=12,
            description='Qwen 系列大模型本地指令微调工具包，适配 RTX 5090 32GB。含 QLoRA 训练 GUI、Ollama 训练数据生成器、Gradio 6 流式对话界面 (思考过程可视化)、PyQt6 桌面客户端、LoRA 适配器合并脚本。',
            tech_stack=json.dumps(['Python', 'PyTorch', 'Transformers', 'PEFT/QLoRA', 'bitsandbytes', 'Gradio 6', 'PyQt6', 'Ollama', 'aiohttp']),
            category='ai', featured=True, github_url='https://github.com',
        ),
        Project(
            title='单目深度估计 — depth-anything', sort_order=13,
            description='基于 Depth Anything V2 (HKU/TikTok) 的单目深度估计项目。支持 Small~Giant 四种模型规格，含实时摄像头深度检测 (RGB+深度并列)、MediaPipe 手势识别 + AR 虚实遮挡演示。',
            tech_stack=json.dumps(['Python', 'PyTorch', 'OpenCV', 'Gradio', 'MediaPipe', 'DINOv2', 'DPT']),
            category='ai', featured=True, github_url='https://github.com',
        ),
        Project(
            title='钓鱼邮件演练系统 — diuyumail', sort_order=14,
            description='企业钓鱼邮件模拟与安全意识培训平台。7 种邮件模板 (HR奖金/IT维护/CEO通知/发票等)，SMTP 批量发送，追踪点击者 IP/浏览器/UA，受害者跳转安全教育页面。含 Web 管理后台、PyInstaller 打包。',
            tech_stack=json.dumps(['Python', 'Flask', 'SQLite', 'Pandas', 'openpyxl', 'PyInstaller', 'Bootstrap']),
            category='web', featured=True, github_url='https://github.com',
        ),
        Project(
            title='游戏视觉检测工具 — game-vision', sort_order=15,
            description='Windows 实时游戏画面捕获与 YOLO 目标检测工具。DXCam/DirectX 高速截屏、DWM 缩略图后台捕获、BitBlt 兼容回退，YOLOv8-v11 实时推理，含交互式标注数据采集工具。',
            tech_stack=json.dumps(['Python', 'PyTorch', 'YOLO', 'OpenCV', 'DXCam', 'pynput', 'Tkinter']),
            category='ai', featured=True, github_url='https://github.com',
        ),
        Project(
            title='像素肉鸽游戏 — rouggame', sort_order=16,
            description='2D 像素 Roguelike 游戏。过程生成房间、多种门类型 (战斗/资源/解谜)、ECS 架构、场景状态机、经验升级 + 技能选择、装备局间继承 (JSON)、Boss 战、粒子特效和程序化像素精灵。所有游戏数值 JSON 可配置。',
            tech_stack=json.dumps(['Python', 'Pygame-CE', 'JSON', 'ECS', 'Procedural Generation']),
            category='game', featured=True, github_url='https://github.com',
        ),
        Project(
            title='SAP 数据抽取工具 — getsaotorj', sort_order=17,
            description='SAP HANA 业务数据抽取与邮件分发工具。连接 SAP HANA 拉取主数据 (销售渠道/产品/客户) 和交易数据 (财务凭证/交货/库存)，CSV 导出 + Outlook COM 自动化邮件分发，含归档目录自动备份。',
            tech_stack=json.dumps(['Python', 'hdbcli (SAP HANA)', 'Pandas', 'pywin32', 'Outlook COM']),
            category='other', featured=False, github_url='https://github.com',
        ),
        Project(
            title='IT满意度调查系统 — wenjuandiaocha', sort_order=18,
            description='IT 服务满意度在线调查平台。批量生成一次性调查链接、SMTP 邮件群发、1-5 分评分 + 文本反馈收集。后台 Chart.js 柱状图统计、平均分展示、评论浏览。Bootstrap 5 响应式前端。',
            tech_stack=json.dumps(['Python', 'Flask', 'SQLite', 'openpyxl', 'Bootstrap 5', 'Chart.js', 'smtplib']),
            category='web', featured=False, github_url='https://github.com',
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
        # ===== AI/ML =====
        Skill(name='PyTorch / 深度学习', category='ai', level=78, icon='🔥', sort_order=21),
        Skill(name='Transformers / QLoRA', category='ai', level=72, icon='🧠', sort_order=22),
        Skill(name='YOLO 目标检测', category='ai', level=75, icon='👁️', sort_order=23),
        Skill(name='OpenCV 计算机视觉', category='ai', level=72, icon='📷', sort_order=24),
        # ===== 后端 =====
        Skill(name='Flask', category='backend', level=78, icon='🍶', sort_order=25),
        # ===== 前端 =====
        Skill(name='Gradio / 交互式 AI UI', category='frontend', level=72, icon='🖥️', sort_order=26),
        # ===== 工具 =====
        Skill(name='Pygame-CE', category='tools', level=75, icon='🎮', sort_order=27),
        Skill(name='PyInstaller 打包部署', category='tools', level=70, icon='📦', sort_order=28),
        Skill(name='安全意识培训 / 钓鱼演练', category='tools', level=85, icon='🛡️', sort_order=29),
        Skill(name='SAP HANA / 数据库', category='tools', level=68, icon='🏢', sort_order=30),
    ]
    db.add_all(skills)

# 时间线
if not db.query(TimelineEntry).first():
    db.add_all([
        TimelineEntry(year='2026', title='全栈个人主页', desc='React 19 + FastAPI + 9 种主题系统构建个人主页，AI 协作完成全流程开发，集成粒子动效与后台管理。', sort_order=1),
        TimelineEntry(year='2026', title='AI 模型微调工具集', desc='Qwen 大模型 QLoRA 本地微调工具包，Gradio 流式对话 + PyQt6 桌面客户端 + Ollama 数据生成。', sort_order=2),
        TimelineEntry(year='2026', title='游戏视觉检测工具', desc='DXCam+YOLO 实时游戏目标检测，支持 DirectX/DWM/BitBlt 三种截屏后端，含标注工具。', sort_order=3),
        TimelineEntry(year='2026', title='单目深度估计', desc='Depth Anything V2 单目深度估计，实时摄像头 RGB+深度可视化，MediaPipe AR 虚实遮挡。', sort_order=4),
        TimelineEntry(year='2026', title='像素肉鸽游戏', desc='2D Roguelike 游戏，ECS 架构 + 过程生成 + 装备继承 + Boss 战，Python Pygame-CE 开发。', sort_order=5),
        TimelineEntry(year='2025', title='钓鱼邮件演练系统', desc='企业安全意识培训平台，7 种钓鱼模板，SMTP 批量发送，点击追踪 + 安全教育页面跳转。', sort_order=6),
        TimelineEntry(year='2025', title='IT满意度调查系统', desc='Flask 在线调查平台，批量生成一次性链接，Chart.js 统计面板，Bootstrap 5 响应式。', sort_order=7),
        TimelineEntry(year='2025', title='SAP 数据抽取工具', desc='SAP HANA 数据抽取与 Outlook 邮件分发，主数据+交易数据 CSV 导出，自动归档。', sort_order=8),
        TimelineEntry(year='2018', title='Cisco 软电话集成', desc='企业 IP 电话系统集成，软电话控制与状态管理。', sort_order=9),
        TimelineEntry(year='2015', title='打印服务中间件', desc='PrintServer 集中式打印服务，BarTender 引擎管理 + SSRS 报表输出。', sort_order=10),
        TimelineEntry(year='2014', title='煤改气售后管理系统', desc='ASP.NET MVC 5 + Entity Framework 构建企业级售后系统，含工单管理、RBAC 权限、产品追踪。', sort_order=11),
        TimelineEntry(year='2011', title='ERP 移动条码系统', desc='Windows CE PDA 手持终端开发，多品牌扫描头 SDK 封装，离线 SQLite + SOAP 同步。', sort_order=12),
        TimelineEntry(year='2009', title='IFS 移动应用', desc='基于 IFS ERP 的工业 PDA 移动端开发，SOAP WebService 通讯，本地 SQLite 缓存。', sort_order=13),
        TimelineEntry(year='2008', title='企业官网', desc='ASP / ASP.NET WebForms 构建企业官网与售后平台，含产品展示、新闻发布与后台管理。', sort_order=14),
    ])

# 文章
if not db.query(Article).first():
    db.add_all([
        Article(title='QLoRA 微调实战：在单张消费级显卡上微调大模型', slug='qlora-finetune',
                summary='使用 QLoRA 技术在 RTX 3060 上微调 Qwen-7B，包含完整的训练脚本、数据处理和推理部署。',
                content_md='## 背景\n\n大模型微调一直被认为是 A100/H100 的专利。QLoRA 技术改变了这一现状——通过 4-bit 量化 + Low-Rank Adapter，在 12GB 显存的消费级显卡上也能微调 7B 模型。\n\n## 原理\n\nQLoRA = Quantization + LoRA\n\n- **4-bit NormalFloat**：新的量化数据类型\n- **双重量化**：对量化常数再量化\n- **Paged Optimizer**：统一内存管理\n\n## 实践\n\n- 模型：Qwen-7B-Chat\n- 数据：1000 条中文指令微调数据\n- LoRA Rank: 64\n\n```python\nfrom transformers import BitsAndBytesConfig\n\nbnb_config = BitsAndBytesConfig(\n    load_in_4bit=True,\n    bnb_4bit_quant_type="nf4",\n)\n```',
                category='ai', published=True),
        Article(title='YOLO 实时游戏目标检测：从截屏到推理', slug='yolo-game-detection',
                summary='使用 DXCam + YOLOv8 实现 FPS 游戏实时目标检测，包含截屏性能优化和标注工具链。',
                content_md='## 概述\n\n游戏 AI 的第一步是感知。本文介绍如何构建一个高性能的游戏目标检测管线。\n\n## 截屏性能对比\n\n| 方法 | 延迟 | FPS |\n|------|------|-----|\n| PyAutoGUI | ~50ms | 20 |\n| MSS | ~15ms | 60 |\n| DXCam | ~3ms | 240+ |\n\nDXCam 利用 DirectX 直接从显存抓取，避免了 CPU→GPU 的数据搬运。\n\n## 推理优化\n\n- ONNX Runtime 加速\n- 半精度 FP16\n- CUDA Stream 并行化',
                category='ai', published=True),
        Article(title='ASP.NET MVC 5 企业级架构实践', slug='aspnet-mvc5-architecture',
                summary='多年 ASP.NET MVC 5 实践总结：分层架构、依赖注入、权限系统和性能优化。',
                content_md='## 为什么还在用 MVC 5\n\n很多企业内部系统并不需要微服务。三层架构配合 SQL Server，开发效率极高。\n\n## 分层设计\n\n- **Controller**：处理 HTTP 请求，模型绑定\n- **Service**：业务逻辑，事务管理\n- **Repository**：Dapper 读 + EF 写（CQRS-lite）\n\n## 权限系统\n\n自定义 RBAC，基于 OAuth 2.0 的 Token 认证。',
                category='tech', published=True),
    ])

db.commit()
db.close()
print('种子数据初始化完成!')
print('  管理员: admin / admin123')
