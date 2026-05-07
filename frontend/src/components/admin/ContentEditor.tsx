import { useState, useEffect } from 'react'
import type { Profile, Project, Skill, SiteConfig, TimelineEntry, Article } from '../../types'
import { THEMES } from '../../types'
import styles from './ContentEditor.module.css'

interface Props {
  profile: Profile | null
  projects: Project[]
  skills: Skill[]
  siteConfig: SiteConfig | null
  timeline: TimelineEntry[]
  articles: Article[]
  onSaveProfile: (data: Partial<Profile>) => Promise<boolean>
  onSaveProject: (data: Partial<Project>) => Promise<boolean>
  onDeleteProject: (id: number) => Promise<boolean>
  onSaveSkill: (data: Partial<Skill>) => Promise<boolean>
  onDeleteSkill: (id: number) => Promise<boolean>
  onSaveSiteConfig: (data: Partial<SiteConfig>) => Promise<boolean>
  onSaveTimeline: (data: Partial<TimelineEntry>) => Promise<boolean>
  onDeleteTimeline: (id: number) => Promise<boolean>
  onSaveArticle: (data: Partial<Article>) => Promise<boolean>
  onDeleteArticle: (id: number) => Promise<boolean>
}

type Tab = 'profile' | 'projects' | 'skills' | 'timeline' | 'articles' | 'site'

export function ContentEditor({
  profile, projects, skills, siteConfig, timeline, articles,
  onSaveProfile, onSaveProject, onDeleteProject, onSaveSkill, onDeleteSkill, onSaveSiteConfig,
  onSaveTimeline, onDeleteTimeline, onSaveArticle, onDeleteArticle,
}: Props) {
  const [tab, setTab] = useState<Tab>('profile')
  const [toast, setToast] = useState('')
  const [editProject, setEditProject] = useState<Partial<Project> | null>(null)
  const [editSkill, setEditSkill] = useState<Partial<Skill> | null>(null)
  const [editTimeline, setEditTimeline] = useState<Partial<TimelineEntry> | null>(null)
  const [editArticle, setEditArticle] = useState<Partial<Article> | null>(null)

  // Profile form
  const [pf, setPf] = useState({ name: '', title: '', bio: '', email: '', github_url: '' })
  useEffect(() => { if (profile) setPf({ name: profile.name, title: profile.title, bio: profile.bio, email: profile.email, github_url: profile.github_url }) }, [profile])

  // Site config form
  const [sc, setSc] = useState({ site_name: '', site_theme: '', music_url: '', footer_text: '', footer_github: '', footer_email: '' })
  useEffect(() => { if (siteConfig) setSc({ site_name: siteConfig.site_name, site_theme: siteConfig.site_theme || '', music_url: siteConfig.music_url || '', footer_text: siteConfig.footer_text, footer_github: siteConfig.footer_github, footer_email: siteConfig.footer_email }) }, [siteConfig])

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2000) }

  const TAB_LABELS: Record<Tab, string> = {
    profile: '个人资料', projects: '项目管理', skills: '技能管理', timeline: '成长轨迹', articles: '文章管理', site: '站点设置',
  }

  return (
    <div className={styles.editor}>
      {toast && <div className={styles.toast}>{toast}</div>}
      <div className={styles.tabs}>
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button key={t} className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`} onClick={() => setTab(t)}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      {/* === Profile === */}
      {tab === 'profile' && (
        <div className={styles.form}>
          <h3>编辑个人资料</h3>
          <label>姓名</label>
          <input className={styles.input} value={pf.name} onChange={(e) => setPf({ ...pf, name: e.target.value })} />
          <label>职位</label>
          <input className={styles.input} value={pf.title} onChange={(e) => setPf({ ...pf, title: e.target.value })} />
          <label>邮箱</label>
          <input className={styles.input} value={pf.email} onChange={(e) => setPf({ ...pf, email: e.target.value })} />
          <label>GitHub 链接</label>
          <input className={styles.input} value={pf.github_url} onChange={(e) => setPf({ ...pf, github_url: e.target.value })} />
          <label>简介</label>
          <textarea className={styles.textarea} rows={4} value={pf.bio} onChange={(e) => setPf({ ...pf, bio: e.target.value })} />
          <button className="btn btn-primary" onClick={async () => {
            if (await onSaveProfile(pf)) showToast('个人资料已保存')
          }}>保存资料</button>
        </div>
      )}

      {/* === Projects === */}
      {tab === 'projects' && (
        <div className={styles.form}>
          <h3>项目列表</h3>
          {projects.map((p) => (
            <div key={p.id} className={styles.item}>
              <div>
                <strong>{p.title}</strong>
                <span className={styles.muted}> — {p.category}</span>
                <div className={styles.muted} style={{ fontSize: '0.75rem', marginTop: 4 }}>{p.description?.slice(0, 60)}...</div>
              </div>
              <div className={styles.itemActions}>
                <button className="btn" onClick={() => setEditProject({ ...p })}>编辑</button>
                <button className={styles.dangerBtn} onClick={async () => {
                  if (await onDeleteProject(p.id)) showToast('项目已删除')
                }}>删除</button>
              </div>
            </div>
          ))}
          <button className="btn" onClick={() => setEditProject({ title: '', description: '', category: 'web', tech_stack: [], github_url: '', demo_url: '' })}>
            + 新增项目
          </button>
        </div>
      )}

      {/* === Skills === */}
      {tab === 'skills' && (
        <div className={styles.form}>
          <h3>技能列表</h3>
          {skills.map((s) => (
            <div key={s.id} className={styles.item}>
              <span>{s.icon} {s.name} — <strong>{s.level}%</strong> <span className={styles.muted}>({s.category})</span></span>
              <div className={styles.itemActions}>
                <button className="btn" onClick={() => setEditSkill({ ...s })}>编辑</button>
                <button className={styles.dangerBtn} onClick={async () => {
                  if (await onDeleteSkill(s.id)) showToast('技能已删除')
                }}>删除</button>
              </div>
            </div>
          ))}
          <button className="btn" onClick={() => setEditSkill({ name: '', category: 'other', level: 50, icon: '' })}>
            + 新增技能
          </button>
        </div>
      )}

      {/* === Timeline === */}
      {tab === 'timeline' && (
        <div className={styles.form}>
          <h3>成长轨迹</h3>
          <p className={styles.muted} style={{ marginBottom: 8 }}>编辑「关于我」页面的时间线</p>
          {[...timeline].sort((a, b) => a.sort_order - b.sort_order).map((t) => (
            <div key={t.id} className={styles.item}>
              <span><strong>{t.year}</strong> — {t.title}</span>
              <div className={styles.itemActions}>
                <button className="btn" onClick={() => setEditTimeline({ ...t })}>编辑</button>
                <button className={styles.dangerBtn} onClick={async () => {
                  if (await onDeleteTimeline(t.id)) showToast('条目已删除')
                }}>删除</button>
              </div>
            </div>
          ))}
          <button className="btn" onClick={() => setEditTimeline({ year: '', title: '', desc: '', sort_order: timeline.length + 1 })}>
            + 新增条目
          </button>
        </div>
      )}

      {/* === Articles === */}
      {tab === 'articles' && (
        <div className={styles.form}>
          <h3>文章列表</h3>
          {articles.map((a) => (
            <div key={a.id} className={styles.item}>
              <div>
                <strong>{a.title}</strong>
                <span className={styles.muted}> — {a.category}</span>
                <span className={styles.muted} style={{ marginLeft: 8 }}>{a.published ? '✅ 已发布' : '📝 草稿'}</span>
                <div className={styles.muted} style={{ fontSize: '0.75rem', marginTop: 4 }}>{a.summary?.slice(0, 60)}...</div>
              </div>
              <div className={styles.itemActions}>
                <button className="btn" onClick={() => setEditArticle({ ...a })}>编辑</button>
                <button className={styles.dangerBtn} onClick={async () => {
                  if (await onDeleteArticle(a.id)) showToast('文章已删除')
                }}>删除</button>
              </div>
            </div>
          ))}
          <button className="btn" onClick={() => setEditArticle({ title: '', slug: '', summary: '', content_md: '', category: 'tech', published: false })}>
            + 新增文章
          </button>
        </div>
      )}

      {/* === Site Config === */}
      {tab === 'site' && (
        <div className={styles.form}>
          <h3>站点设置</h3>
          <p className={styles.muted} style={{ marginBottom: 8 }}>编辑页眉和页脚显示的内容</p>
          <label>网站名称 (页眉 Logo)</label>
          <input className={styles.input} value={sc.site_name} onChange={(e) => setSc({ ...sc, site_name: e.target.value })} placeholder="ash" />
          <label>全局主题 (设为 "--" 则允许访客自由切换)</label>
          <select className={styles.input} value={sc.site_theme} onChange={(e) => setSc({ ...sc, site_theme: e.target.value })}>
            <option value="">-- 由访客选择 --</option>
            {THEMES.map((t) => (
              <option key={t.key} value={t.key}>{t.label} — {t.description}</option>
            ))}
          </select>
          <label>背景音乐 URL (留空关闭)</label>
          <input className={styles.input} value={sc.music_url} onChange={(e) => setSc({ ...sc, music_url: e.target.value })} placeholder="https://example.com/music.mp3" />
          <label>页脚文字</label>
          <input className={styles.input} value={sc.footer_text} onChange={(e) => setSc({ ...sc, footer_text: e.target.value })} placeholder="由 Claude Code 构建" />
          <label>页脚 GitHub 链接</label>
          <input className={styles.input} value={sc.footer_github} onChange={(e) => setSc({ ...sc, footer_github: e.target.value })} placeholder="https://github.com/你的用户名" />
          <label>页脚邮箱</label>
          <input className={styles.input} value={sc.footer_email} onChange={(e) => setSc({ ...sc, footer_email: e.target.value })} placeholder="你的邮箱@example.com" />
          <button className="btn btn-primary" onClick={async () => {
            if (await onSaveSiteConfig(sc)) showToast('站点设置已保存')
          }}>保存设置</button>
        </div>
      )}

      {/* === Project Edit Modal === */}
      {editProject && (
        <div className={styles.modal} onClick={() => setEditProject(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>{editProject.id ? '编辑项目' : '新增项目'}</h3>
            <label>标题</label>
            <input className={styles.input} value={editProject.title || ''} onChange={(e) => setEditProject({ ...editProject, title: e.target.value })} />
            <label>简短描述</label>
            <textarea className={styles.textarea} rows={2} value={editProject.description || ''} onChange={(e) => setEditProject({ ...editProject, description: e.target.value })} />
            <label>详细描述</label>
            <textarea className={styles.textarea} rows={4} value={editProject.long_description || ''} onChange={(e) => setEditProject({ ...editProject, long_description: e.target.value })} />
            <label>图片 URL (逗号分隔)</label>
            <input className={styles.input} value={Array.isArray(editProject.images) ? editProject.images.join(', ') : ''} onChange={(e) => setEditProject({ ...editProject, images: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} />
            <label>分类</label>
            <select className={styles.input} value={editProject.category || 'web'} onChange={(e) => setEditProject({ ...editProject, category: e.target.value })}>
              <option value="web">网页</option>
              <option value="ai">AI/机器学习</option>
              <option value="game">游戏</option>
              <option value="other">工业/工具</option>
            </select>
            <label>技术栈 (逗号分隔)</label>
            <input className={styles.input} value={Array.isArray(editProject.tech_stack) ? editProject.tech_stack.join(', ') : ''} onChange={(e) => setEditProject({ ...editProject, tech_stack: e.target.value.split(',').map((s) => s.trim()) })} />
            <label>GitHub 链接</label>
            <input className={styles.input} value={editProject.github_url || ''} onChange={(e) => setEditProject({ ...editProject, github_url: e.target.value })} />
            <label>演示 URL</label>
            <input className={styles.input} value={editProject.demo_url || ''} onChange={(e) => setEditProject({ ...editProject, demo_url: e.target.value })} />
            <div className={styles.modalActions}>
              <button className="btn" onClick={() => setEditProject(null)}>取消</button>
              <button className="btn btn-primary" onClick={async () => {
                if (await onSaveProject(editProject)) { showToast(editProject.id ? '项目已更新' : '项目已创建'); setEditProject(null) }
              }}>保存</button>
            </div>
          </div>
        </div>
      )}

      {/* === Skill Edit Modal === */}
      {editSkill && (
        <div className={styles.modal} onClick={() => setEditSkill(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>{editSkill.id ? '编辑技能' : '新增技能'}</h3>
            <label>图标 (emoji)</label>
            <input className={styles.input} value={editSkill.icon || ''} onChange={(e) => setEditSkill({ ...editSkill, icon: e.target.value })} />
            <label>技能名</label>
            <input className={styles.input} value={editSkill.name || ''} onChange={(e) => setEditSkill({ ...editSkill, name: e.target.value })} />
            <label>分类</label>
            <select className={styles.input} value={editSkill.category || 'other'} onChange={(e) => setEditSkill({ ...editSkill, category: e.target.value })}>
              <option value="frontend">前端</option>
              <option value="backend">后端</option>
              <option value="ai">AI/机器学习</option>
              <option value="tools">工具</option>
              <option value="other">其他</option>
            </select>
            <label>熟练度 ({editSkill.level || 0}%)</label>
            <input className={styles.input} type="range" min={0} max={100} value={editSkill.level || 0} onChange={(e) => setEditSkill({ ...editSkill, level: Number(e.target.value) })} />
            <div className={styles.modalActions}>
              <button className="btn" onClick={() => setEditSkill(null)}>取消</button>
              <button className="btn btn-primary" onClick={async () => {
                if (await onSaveSkill(editSkill)) { showToast(editSkill.id ? '技能已更新' : '技能已创建'); setEditSkill(null) }
              }}>保存</button>
            </div>
          </div>
        </div>
      )}

      {/* === Timeline Edit Modal === */}
      {editTimeline && (
        <div className={styles.modal} onClick={() => setEditTimeline(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>{editTimeline.id ? '编辑时间线条目' : '新增时间线条目'}</h3>
            <label>年份</label>
            <input className={styles.input} value={editTimeline.year || ''} onChange={(e) => setEditTimeline({ ...editTimeline, year: e.target.value })} placeholder="2026" />
            <label>标题</label>
            <input className={styles.input} value={editTimeline.title || ''} onChange={(e) => setEditTimeline({ ...editTimeline, title: e.target.value })} />
            <label>描述</label>
            <textarea className={styles.textarea} rows={3} value={editTimeline.desc || ''} onChange={(e) => setEditTimeline({ ...editTimeline, desc: e.target.value })} />
            <label>排序</label>
            <input className={styles.input} type="number" value={editTimeline.sort_order || 0} onChange={(e) => setEditTimeline({ ...editTimeline, sort_order: Number(e.target.value) })} />
            <div className={styles.modalActions}>
              <button className="btn" onClick={() => setEditTimeline(null)}>取消</button>
              <button className="btn btn-primary" onClick={async () => {
                if (await onSaveTimeline(editTimeline)) { showToast(editTimeline.id ? '条目已更新' : '条目已创建'); setEditTimeline(null) }
              }}>保存</button>
            </div>
          </div>
        </div>
      )}

      {/* === Article Edit Modal === */}
      {editArticle && (
        <div className={styles.modal} onClick={() => setEditArticle(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>{editArticle.id ? '编辑文章' : '新增文章'}</h3>
            <label>标题</label>
            <input className={styles.input} value={editArticle.title || ''} onChange={(e) => setEditArticle({ ...editArticle, title: e.target.value })} />
            <label>URL 标识</label>
            <input className={styles.input} value={editArticle.slug || ''} onChange={(e) => setEditArticle({ ...editArticle, slug: e.target.value })} placeholder="我的文章" />
            <label>摘要</label>
            <textarea className={styles.textarea} rows={2} value={editArticle.summary || ''} onChange={(e) => setEditArticle({ ...editArticle, summary: e.target.value })} />
            <label>分类</label>
            <select className={styles.input} value={editArticle.category || 'tech'} onChange={(e) => setEditArticle({ ...editArticle, category: e.target.value })}>
              <option value="tech">技术</option>
              <option value="ai">AI/机器学习</option>
              <option value="web">网页</option>
              <option value="other">其他</option>
            </select>
            <label>文章内容 (Markdown)</label>
            <textarea className={styles.textarea} rows={10} value={editArticle.content_md || ''} onChange={(e) => setEditArticle({ ...editArticle, content_md: e.target.value })} />
            <label>
              <input type="checkbox" checked={editArticle.published || false} onChange={(e) => setEditArticle({ ...editArticle, published: e.target.checked })} />
              {' '}发布
            </label>
            <div className={styles.modalActions}>
              <button className="btn" onClick={() => setEditArticle(null)}>取消</button>
              <button className="btn btn-primary" onClick={async () => {
                if (await onSaveArticle(editArticle)) { showToast(editArticle.id ? '文章已更新' : '文章已创建'); setEditArticle(null) }
              }}>保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
