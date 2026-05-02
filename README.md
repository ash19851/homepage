# 个人主页 (Personal Homepage)

React + FastAPI 全栈个人主页，9 种主题风格，粒子动效，实用工具集，后台内容管理与访问统计。

## 技术栈

**前端**: React 19 · TypeScript · Vite 6 · React Router v7 · Framer Motion · tsParticles · CSS Modules · Axios

**后端**: FastAPI · SQLAlchemy · SQLite · JWT (python-jose) · bcrypt · Pydantic

**部署**: [Vercel](https://vercel.com) (前端) · [Render](https://render.com) (后端)

## 功能

- 9 种科技/艺术风格主题 (赛博朋克 · 矩阵 · 极光 · 虚空 · 合成波 · 极简白 · 玻璃幻境 · 水墨丹青 · 孟菲斯)
- 粒子背景 + 光标光晕 + 3D 卡片倾斜 + 磁性按钮 + 涟漪点击
- 实用工具: 天气查询 · 数学计算器 · 子网掩码计算器 · 日期时间 · 留言板
- JWT 认证后台: 内容管理 · 访问统计 · 站点配置

## 快速开始

### 环境要求

- Python 3.10+
- Node.js 20+
- npm

### 后端

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

首次启动自动创建数据库和管理员账号: `admin / admin123`

### 前端

```bash
cd frontend
npm install
npm run dev
```

访问 http://localhost:5173

## 项目结构

```
myhomepage/
├── frontend/                    # React 前端
│   ├── src/
│   │   ├── admin-pages/         # 后台页面
│   │   ├── components/
│   │   │   ├── admin/           # 后台组件 (编辑器 · 统计面板)
│   │   │   ├── effects/         # 动效 (光标 · 3D倾斜 · 涟漪)
│   │   │   ├── layout/          # 布局 (导航 · 页脚)
│   │   │   ├── particles/       # 粒子引擎
│   │   │   ├── tools/           # 实用工具组件
│   │   │   └── ui/              # 通用 UI 组件
│   │   ├── pages/               # 公开页面
│   │   ├── services/            # API 服务层
│   │   ├── themes/              # 9 套主题 CSS
│   │   └── types/               # TypeScript 类型
│   └── vercel.json
├── backend/                     # FastAPI 后端
│   ├── app/
│   │   ├── auth/                # JWT 认证
│   │   ├── models/              # SQLAlchemy 模型
│   │   ├── routers/             # API 路由
│   │   ├── schemas/             # Pydantic 校验
│   │   └── services/            # 业务逻辑
│   └── seed_data.py             # 初始数据
└── render.yaml
```

## API

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/public/profile` | 个人信息 |
| GET | `/api/public/projects` | 项目列表 |
| GET | `/api/public/skills` | 技能列表 |
| GET | `/api/public/timeline` | 成长轨迹 |
| GET | `/api/public/site-config` | 站点配置 |
| GET | `/api/public/guestbook` | 留言列表 |
| POST | `/api/public/guestbook` | 提交留言 |
| POST | `/api/admin/login` | 管理员登录 |
| PUT | `/api/admin/profile` | 更新资料 |
| PUT | `/api/admin/site-config` | 更新站点配置 |
| GET/POST | `/api/admin/projects` | 项目管理 |
| GET/POST | `/api/admin/skills` | 技能管理 |
| GET/POST | `/api/admin/timeline` | 时间线管理 |
| GET | `/api/admin/stats/overview` | 访问概览 |
| GET | `/api/admin/stats/timeline` | 访问趋势 |

## 部署

### 前端 (Vercel)

1. Fork 项目
2. Vercel 导入项目，Root Directory 设为 `frontend`
3. Framework 选择 Vite，Build Command: `npm run build`
4. 添加环境变量 `VITE_API_URL=<你的后端地址>/api`

### 后端 (Render)

1. Render 新建 Web Service
2. Root Directory 设为 `backend`
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. 使用 Render Disk 持久化 SQLite 数据库

## 认证

管理后台使用 JWT，24 小时过期。登录后所有 `/api/admin/*` 请求自动携带 token。

默认管理员: `admin / admin123` (首次登录后建议在后台修改密码)
