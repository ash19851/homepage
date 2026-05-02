import { useState } from 'react'
import { motion } from 'framer-motion'
import { WeatherTool } from '../components/tools/WeatherTool'
import { MathTool } from '../components/tools/MathTool'
import { SubnetTool } from '../components/tools/SubnetTool'
import { DateTimeTool } from '../components/tools/DateTimeTool'
import { Guestbook } from '../components/tools/Guestbook'
import styles from './ToolsPage.module.css'

type Tab = 'weather' | 'math' | 'subnet' | 'datetime' | 'guestbook'

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'weather', label: '天气查询', icon: '🌤️' },
  { key: 'math', label: '数学计算', icon: '🔢' },
  { key: 'subnet', label: '子网掩码', icon: '🌐' },
  { key: 'datetime', label: '日期时间', icon: '🕐' },
  { key: 'guestbook', label: '留言板', icon: '💬' },
]

export function ToolsPage() {
  const [tab, setTab] = useState<Tab>('weather')

  return (
    <div className={styles.page}>
      <section className="section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="section-title">实用工具</h1>
          </motion.div>

          <div className={styles.tabs}>
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
                onClick={() => setTab(t.key)}
              >
                <span className={styles.tabIcon}>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.content}
          >
            {tab === 'weather' && <WeatherTool />}
            {tab === 'math' && <MathTool />}
            {tab === 'subnet' && <SubnetTool />}
            {tab === 'datetime' && <DateTimeTool />}
            {tab === 'guestbook' && <Guestbook />}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
