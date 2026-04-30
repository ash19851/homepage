import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiMail, FiClock, FiMapPin } from 'react-icons/fi'
import { GlitchText } from '../components/effects/GlitchText'
import { NeonBorder } from '../components/effects/NeonBorder'
import type { Profile } from '../types'
import * as publicService from '../services/publicService'
import styles from './AboutPage.module.css'

const TIMELINE = [
  { year: '2026', title: '构建个人主页', desc: '使用 React + FastAPI + 多主题系统构建全栈个人主页，集成粒子动效和后台管理面板。' },
  { year: '2026', title: 'Python 游戏开发', desc: '使用 Python 开发游戏项目，深入实践游戏逻辑、UI渲染和状态管理。' },
  { year: '2025', title: 'AI 协作编程', desc: '深度使用 Claude Code 进行高效编程协作，探索 AI 驱动的开发工作流。' },
  { year: '2024', title: '全栈 Web 开发', desc: 'React + TypeScript + Python 全栈技术栈沉淀，构建多个完整项目。' },
]

const DEFAULT_PROFILE: Profile = {
  id: 1, name: 'UNANG', title: '全栈开发者',
  bio: '一名热衷于探索技术边界的全栈开发者。',
  avatar_url: '', github_url: 'https://github.com', email: 'unang@example.com',
}

export function AboutPage() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE)

  useEffect(() => {
    publicService.getProfile().then((p) => { if (p) setProfile(p) })
  }, [])

  return (
    <div>
      <section className="section">
        <div className="container">
          <motion.div className={styles.header} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="section-title">关于我</h1>
            <div className={styles.nameWrapper}>
              <GlitchText text={profile.name} as="h2" className={styles.glitchName} />
            </div>
            <p className={styles.bio}>{profile.bio}</p>
            <div className={styles.contactRow}>
              {profile.email && <a href={`mailto:${profile.email}`} className={styles.contactItem}><FiMail /> {profile.email}</a>}
              {profile.github_url && <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className={styles.contactItem}><FiGithub /> GitHub</a>}
              <span className={styles.contactItem}><FiMapPin /> 中国</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">成长轨迹</h2>
          <div className={styles.timeline}>
            {TIMELINE.map((item, i) => (
              <motion.div key={i} className={styles.timelineItem}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineYear}><FiClock size={14} /> {item.year}</div>
                <NeonBorder className={styles.timelineCard}>
                  <h3 className={styles.timelineTitle}>{item.title}</h3>
                  <p className={styles.timelineDesc}>{item.desc}</p>
                </NeonBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">工作哲学</h2>
          <div className={styles.philosophyGrid}>
            {[
              { title: '简洁优先', desc: '代码如文，清晰胜于机巧。每个组件做好一件事。' },
              { title: '体验为王', desc: '从粒子动效到主题切换，每个细节都服务于沉浸式体验。' },
              { title: 'AI 赋能', desc: '将 AI 作为编程伙伴，加速从想法到实现的全过程。' },
            ].map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}>
                <NeonBorder className={styles.philosophyCard}>
                  <h3 className={styles.philosophyTitle}>{p.title}</h3>
                  <p className={styles.philosophyDesc}>{p.desc}</p>
                </NeonBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
