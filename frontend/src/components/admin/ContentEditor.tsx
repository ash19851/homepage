import { useState, useEffect } from 'react'
import type { Profile, Project, Skill, SiteConfig, TimelineEntry } from '../../types'
import styles from './ContentEditor.module.css'

interface Props {
  profile: Profile | null
  projects: Project[]
  skills: Skill[]
  siteConfig: SiteConfig | null
  timeline: TimelineEntry[]
  onSaveProfile: (data: Partial<Profile>) => Promise<boolean>
  onSaveProject: (data: Partial<Project>) => Promise<boolean>
  onDeleteProject: (id: number) => Promise<boolean>
  onSaveSkill: (data: Partial<Skill>) => Promise<boolean>
  onDeleteSkill: (id: number) => Promise<boolean>
  onSaveSiteConfig: (data: Partial<SiteConfig>) => Promise<boolean>
  onSaveTimeline: (data: Partial<TimelineEntry>) => Promise<boolean>
  onDeleteTimeline: (id: number) => Promise<boolean>
}

type Tab = 'profile' | 'projects' | 'skills' | 'site' | 'timeline'

export function ContentEditor({
  profile, projects, skills, siteConfig, timeline,
  onSaveProfile, onSaveProject, onDeleteProject, onSaveSkill, onDeleteSkill, onSaveSiteConfig,
  onSaveTimeline, onDeleteTimeline,
}: Props) {
  const [tab, setTab] = useState<Tab>('profile')
  const [toast, setToast] = useState('')
  const [editProject, setEditProject] = useState<Partial<Project> | null>(null)
  const [editSkill, setEditSkill] = useState<Partial<Skill> | null>(null)
  const [editTimeline, setEditTimeline] = useState<Partial<TimelineEntry> | null>(null)

  // Profile form
  const [pf, setPf] = useState({ name: '', title: '', bio: '', email: '', github_url: '' })
  useEffect(() => { if (profile) setPf({ name: profile.name, title: profile.title, bio: profile.bio, email: profile.email, github_url: profile.github_url }) }, [profile])

  // Site config form
  const [sc, setSc] = useState({ site_name: '', footer_text: '', footer_github: '', footer_email: '' })
  useEffect(() => { if (siteConfig) setSc({ site_name: siteConfig.site_name, footer_text: siteConfig.footer_text, footer_github: siteConfig.footer_github, footer_email: siteConfig.footer_email }) }, [siteConfig])

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2000) }

  const TAB_LABELS: Record<Tab, string> = {
    profile: '个人资料', projects: '项目管理', skills: '技能管理', timeline: '成长轨迹', site: '站点设置',
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
          <label>GitHub</label>
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

      {/* === Site Config === */}
      {tab === 'site' && (
        <div className={styles.form}>
          <h3>站点设置</h3>
          <p className={styles.muted} style={{ marginBottom: 8 }}>编辑页眉和页脚显示的内容</p>
          <label>网站名称 (页眉 Logo)</label>
          <input className={styles.input} value={sc.site_name} onChange={(e) => setSc({ ...sc, site_name: e.target.value })} placeholder="UNANG" />
          <label>页脚文字</label>
          <input className={styles.input} value={sc.footer_text} onChange={(e) => setSc({ ...sc, footer_text: e.target.value })} placeholder="Built with Claude Code." />
          <label>页脚 GitHub 链接</label>
          <input className={styles.input} value={sc.footer_github} onChange={(e) => setSc({ ...sc, footer_github: e.target.value })} placeholder="https://github.com/yourname" />
          <label>页脚邮箱</label>
          <input className={styles.input} value={sc.footer_email} onChange={(e) => setSc({ ...sc, footer_email: e.target.value })} placeholder="you@example.com" />
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
            <label>描述</label>
            <textarea className={styles.textarea} rows={3} value={editProject.description || ''} onChange={(e) => setEditProject({ ...editProject, description: e.target.value })} />
            <label>分类</label>
            <select className={styles.input} value={editProject.category || 'web'} onChange={(e) => setEditProject({ ...editProject, category: e.target.value })}>
              <option value="web">Web</option>
              <option value="ai">AI</option>
              <option value="game">游戏</option>
              <option value="other">工业/工具</option>
            </select>
            <label>技术栈 (逗号分隔)</label>
            <input className={styles.input} value={Array.isArray(editProject.tech_stack) ? editProject.tech_stack.join(', ') : ''} onChange={(e) => setEditProject({ ...editProject, tech_stack: e.target.value.split(',').map((s) => s.trim()) })} />
            <label>GitHub URL</label>
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
    </div>
  )
}
