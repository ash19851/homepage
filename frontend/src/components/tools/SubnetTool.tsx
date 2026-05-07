import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './SubnetTool.module.css'

interface SubnetResult {
  network: string
  broadcast: string
  firstHost: string
  lastHost: string
  totalHosts: number
  usableHosts: number
  subnetMask: string
  cidr: number
  ipBinary: string
  maskBinary: string
  class: string
}

function ipToBin(ip: string): string {
  return ip.split('.').map((o) => parseInt(o).toString(2).padStart(8, '0')).join('.')
}

function ipToNum(ip: string): number {
  const parts = ip.split('.').map(Number)
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0
}

function numToIp(num: number): string {
  return [(num >>> 24) & 0xff, (num >>> 16) & 0xff, (num >>> 8) & 0xff, num & 0xff].join('.')
}

function maskFromCidr(cidr: number): string {
  const mask = (~0 << (32 - cidr)) >>> 0
  return numToIp(mask)
}

function getClass(ip: string): string {
  const first = parseInt(ip.split('.')[0])
  if (first < 128) return 'A'
  if (first < 192) return 'B'
  if (first < 224) return 'C'
  if (first < 240) return 'D'
  return 'E'
}

function calculate(ip: string, cidr: number): SubnetResult | null {
  if (!ip || cidr < 0 || cidr > 32) return null
  const ipNum = ipToNum(ip)
  const maskNum = (~0 << (32 - cidr)) >>> 0
  const networkNum = (ipNum & maskNum) >>> 0
  const broadcastNum = (networkNum | ~maskNum) >>> 0
  const mask = maskFromCidr(cidr)

  return {
    network: numToIp(networkNum),
    broadcast: numToIp(broadcastNum),
    firstHost: cidr >= 31 ? '-' : numToIp(networkNum + 1),
    lastHost: cidr >= 31 ? '-' : numToIp(broadcastNum - 1),
    totalHosts: Math.pow(2, 32 - cidr),
    usableHosts: cidr >= 31 ? 0 : Math.pow(2, 32 - cidr) - 2,
    subnetMask: mask,
    cidr,
    ipBinary: ipToBin(ip),
    maskBinary: ipToBin(mask),
    class: getClass(ip),
  }
}

const PRESETS = [
  { label: '/8 (A类)', cidr: 8 },
  { label: '/16 (B类)', cidr: 16 },
  { label: '/24 (C类)', cidr: 24 },
  { label: '/28', cidr: 28 },
  { label: '/30', cidr: 30 },
  { label: '/32', cidr: 32 },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 350, damping: 22 } },
}

export function SubnetTool() {
  const [ip, setIp] = useState('192.168.1.1')
  const [cidr, setCidr] = useState(24)
  const [result, setResult] = useState<SubnetResult | null>(null)
  const [error, setError] = useState('')

  const handleCalc = () => {
    setError('')
    const parts = ip.split('.').map(Number)
    if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
      setError('请输入有效的 IPv4 地址')
      return
    }
    const r = calculate(ip, cidr)
    if (!r) {
      setError('计算失败')
      return
    }
    setResult(r)
  }

  return (
    <motion.div className={styles.subnet} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className={styles.inputRow}>
        <motion.input
          className={styles.input}
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="IP 地址, 如 192.168.1.1"
          whileFocus={{ scale: 1.01 }}
        />
        <span className={styles.slash}>/</span>
        <motion.input
          className={styles.cidrInput}
          type="number" min={0} max={32}
          value={cidr}
          onChange={(e) => setCidr(Number(e.target.value))}
          whileFocus={{ scale: 1.03 }}
        />
        <motion.button className={styles.btn} onClick={handleCalc}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }}>
          计算
        </motion.button>
      </div>

      <div className={styles.presets}>
        {PRESETS.map((p, i) => (
          <motion.button
            key={p.cidr}
            className={`${styles.presetBtn} ${cidr === p.cidr ? styles.presetActive : ''}`}
            onClick={() => setCidr(p.cidr)}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }}
          >
            {p.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p className={styles.error} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && (
          <motion.div className={styles.resultGrid} variants={containerVariants} initial="hidden" animate="show" exit={{ opacity: 0 }}>
            {[
              { label: '网络地址', value: result.network },
              { label: '广播地址', value: result.broadcast },
              { label: '子网掩码', value: `${result.subnetMask} (/${result.cidr})` },
              { label: '地址范围', value: `${result.firstHost} ~ ${result.lastHost}` },
              { label: '总地址数', value: result.totalHosts.toLocaleString() },
              { label: '可用主机数', value: result.usableHosts.toLocaleString() },
              { label: '地址类别', value: `${result.class} 类地址` },
            ].map((item) => (
              <motion.div key={item.label} className={styles.resultItem} variants={itemVariants}
                whileHover={{ scale: 1.03, borderColor: 'var(--color-accent)' }}>
                <span className={styles.label}>{item.label}</span>
                <motion.span className={styles.value}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  {item.value}
                </motion.span>
              </motion.div>
            ))}
            <motion.div className={`${styles.resultItem} ${styles.fullWidth}`} variants={itemVariants}>
              <span className={styles.label}>IP 二进制</span>
              <span className={styles.value} style={{ fontSize: '0.75rem' }}>{result.ipBinary}</span>
            </motion.div>
            <motion.div className={`${styles.resultItem} ${styles.fullWidth}`} variants={itemVariants}>
              <span className={styles.label}>掩码二进制</span>
              <span className={styles.value} style={{ fontSize: '0.75rem' }}>{result.maskBinary}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
