import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiMail, FiClock, FiMapPin } from 'react-icons/fi'
import { GlitchText } from '../components/effects/GlitchText'
import { NeonBorder } from '../components/effects/NeonBorder'
import type { Profile } from '../types'
import * as publicService from '../services/publicService'
import styles from './AboutPage.module.css'

const TIMELINE = [
  { year: '2026', title: '全栈个人主页', desc: 'React 19 + FastAPI + 9 种主题系统构建个人主页，AI 协作完成全流程开发，集成粒子动效与后台管理。' },
  { year: '2018', title: 'Cisco 软电话集成', desc: '企业 IP 电话系统集成，软电话控制与状态管理，HTTP 通讯辅助。' },
  { year: '2015', title: '打印服务中间件', desc: 'PrintServer 集中式打印服务，BarTender 引擎管理 + SSRS 报表输出，支撑生产线标签打印。' },
  { year: '2014', title: '煤改气售后管理系统', desc: 'ASP.NET MVC 5 + Entity Framework 构建企业级售后系统，含工单管理、RBAC 权限、产品追踪、移动端 API。' },
  { year: '2011', title: 'ERP 移动条码系统', desc: 'Windows CE PDA 手持终端开发，多品牌扫描头 SDK 封装，离线 SQLite + SOAP 同步，条码标签打印集成。' },
  { year: '2009', title: 'IFS 移动应用', desc: '基于 IFS ERP 的工业 PDA 移动端开发，SOAP WebService 通讯，本地 SQLite 缓存，多版本迭代。' },
  { year: '2008', title: '林内企业官网', desc: 'ASP / ASP.NET WebForms 构建企业官网与售后平台，含产品展示、新闻发布、后台管理与 BI 分析。' },
]

const DEFAULT_PROFILE: Profile = {
  id: 1, name: 'UNANG', title: '软件开发工程师 · 工业物联网开发',
  bio: '全栈开发者，深耕 .NET 生态与工业硬件集成。热衷 AI 协作编程探索新技术边界。',
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
