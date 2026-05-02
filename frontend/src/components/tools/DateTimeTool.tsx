import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './DateTimeTool.module.css'

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function formatDate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 25 } },
}

export function DateTimeTool() {
  const [now, setNow] = useState(new Date())
  const [tsInput, setTsInput] = useState('')
  const [tsResult, setTsResult] = useState('')

  const [d1, setD1] = useState(formatDate(new Date()).split(' ')[0])
  const [d2, setD2] = useState(formatDate(new Date()).split(' ')[0])
  const [diff, setDiff] = useState('')

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const convertTimestamp = () => {
    const val = parseInt(tsInput.trim())
    if (isNaN(val)) { setTsResult('无效时间戳'); return }
    const d = val > 9999999999 ? new Date(val) : new Date(val * 1000)
    setTsResult(formatDate(d))
  }

  const calcDiff = () => {
    const a = new Date(d1 + 'T00:00:00')
    const b = new Date(d2 + 'T00:00:00')
    const ms = Math.abs(b.getTime() - a.getTime())
    const days = Math.floor(ms / 86400000)
    setDiff(`${days} 天`)
  }

  return (
    <motion.div className={styles.dt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <motion.div className={styles.clock}
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
        <motion.div className={styles.clockTime}
          animate={{ textShadow: [
            '0 0 8px var(--color-accent)',
            '0 0 20px var(--color-accent)',
            '0 0 8px var(--color-accent)',
          ]}}
          transition={{ repeat: Infinity, duration: 2 }}>
          {pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
        </motion.div>
        <motion.div className={styles.clockDate}
          animate={{ opacity: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 2 }}>
          {now.getFullYear()}年{now.getMonth() + 1}月{now.getDate()}日{' '}
          {['日', '一', '二', '三', '四', '五', '六'][now.getDay()]}
        </motion.div>
        <div className={styles.clockTz}>
          {Intl.DateTimeFormat().resolvedOptions().timeZone}
        </div>
      </motion.div>

      <motion.div className={styles.section} variants={sectionVariants} initial="hidden" animate="show">
        <h4>时间戳转换</h4>
        <div className={styles.row}>
          <motion.input className={styles.input} value={tsInput}
            onChange={(e) => setTsInput(e.target.value)}
            placeholder="输入时间戳 (秒或毫秒)"
            whileFocus={{ scale: 1.01 }} />
          <motion.button className={styles.btn} onClick={convertTimestamp}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }}>
            转换
          </motion.button>
        </div>
        <AnimatePresence>
          {tsResult && (
            <motion.div className={styles.result}
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}>
              {tsResult}
            </motion.div>
          )}
        </AnimatePresence>
        <p className={styles.hint}>
          当前 Unix 时间戳 (秒): <strong>{Math.floor(now.getTime() / 1000)}</strong>
        </p>
      </motion.div>

      <motion.div className={styles.section} variants={sectionVariants} initial="hidden" animate="show">
        <h4>日期差计算</h4>
        <div className={styles.row}>
          <input className={styles.input} type="date" value={d1} onChange={(e) => setD1(e.target.value)} />
          <span className={styles.to}>至</span>
          <input className={styles.input} type="date" value={d2} onChange={(e) => setD2(e.target.value)} />
          <motion.button className={styles.btn} onClick={calcDiff}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }}>
            计算
          </motion.button>
        </div>
        <AnimatePresence>
          {diff && (
            <motion.div className={styles.result}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}>
              {diff}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
