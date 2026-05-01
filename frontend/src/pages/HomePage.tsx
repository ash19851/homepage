import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCode, FiCpu, FiLayers, FiZap } from 'react-icons/fi'
import { TypewriterText } from '../components/effects/TypewriterText'
import { NeonBorder } from '../components/effects/NeonBorder'
import { MagneticButton } from '../components/effects/MagneticButton'
import { StatCounter } from '../components/ui/StatCounter'
import type { Profile } from '../types'
import * as publicService from '../services/publicService'
import styles from './HomePage.module.css'

const HIGHLIGHTS = [
  { icon: <FiCode size={24} />, title: '.NET 企业开发', desc: 'C# / ASP.NET MVC / EF / Web API 多年实战经验' },
  { icon: <FiCpu size={24} />, title: '工业物联网', desc: '条码扫描、PLC 通讯、Windows CE 嵌入式终端开发' },
  { icon: <FiLayers size={24} />, title: '全栈 Web 开发', desc: 'React + FastAPI + 多主题系统构建现代应用' },
  { icon: <FiZap size={24} />, title: 'AI 协作编程', desc: 'Claude Code 驱动高效全栈工作流' },
]

const DEFAULT_PROFILE: Profile = {
  id: 1, name: 'UNANG', title: '软件开发工程师 · 工业物联网开发',
  bio: '全栈开发者，深耕 .NET 生态与工业硬件集成。热衷 AI 协作编程探索新技术边界。',
  avatar_url: '', github_url: 'https://github.com', email: 'unang@example.com',
}

export function HomePage() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE)

  useEffect(() => {
    publicService.getProfile().then((p) => { if (p) setProfile(p) })
  }, [])

  return (
    <div className={styles.hero}>
      <div className="container">
        <motion.div className={styles.heroContent}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className={styles.greeting}>Hello, 我是</p>
          <h1 className={styles.name}>{profile.name}</h1>
          <div className={styles.typewriterLine}>
            <span className={styles.prefix}>I build </span>
            <TypewriterText
              texts={['全栈 Web 应用', '沉浸式交互体验', 'Python 后端服务', 'AI 驱动的工具', '游戏化 UI 界面']}
              speed={60} deleteSpeed={30} pause={2500}
            />
          </div>
          <p className={styles.subtitle}>{profile.bio}</p>
          <div className={styles.cta}>
            <MagneticButton>
              <Link to="/projects" className="btn btn-primary">查看项目 <FiArrowRight /></Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/about" className="btn">了解更多</Link>
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">核心能力</h2>
          <div className={styles.highlightGrid}>
            {HIGHLIGHTS.map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}>
                <NeonBorder className={styles.highlightCard}>
                  <div className={styles.highlightIcon}>{item.icon}</div>
                  <h3 className={styles.highlightTitle}>{item.title}</h3>
                  <p className={styles.highlightDesc}>{item.desc}</p>
                </NeonBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">数字足迹</h2>
          <div className={styles.statsGrid}>
            <StatCounter end={15} label="完成项目" suffix="+" />
            <StatCounter end={5000} label="代码提交" suffix="+" />
            <StatCounter end={8} label="技术栈掌握" suffix="" />
            <StatCounter end={24} label="日均编码" suffix="/7" />
          </div>
        </div>
      </section>
    </div>
  )
}
