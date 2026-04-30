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
  { icon: <FiCode size={24} />, title: '全栈开发', desc: 'React + FastAPI 构建现代Web应用' },
  { icon: <FiCpu size={24} />, title: 'AI 协作编程', desc: '基于 Claude Code 的高效开发工作流' },
  { icon: <FiLayers size={24} />, title: '多主题系统', desc: '5种科技风主题，CSS变量驱动即时切换' },
  { icon: <FiZap size={24} />, title: '粒子动效', desc: 'tsParticles 引擎驱动沉浸式动态背景' },
]

const DEFAULT_PROFILE: Profile = {
  id: 1, name: 'UNANG', title: '全栈开发者 · AI 协作实践者',
  bio: '专注全栈开发与 AI 协作编程，打造科技感与实用性兼备的数字体验。',
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
