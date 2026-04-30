import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { FiUsers, FiEye, FiTrendingUp, FiGlobe } from 'react-icons/fi'
import * as adminService from '../../services/adminService'
import type { StatsOverview, StatsTimeline, StatsPageBreakdown } from '../../types'
import styles from './StatsDashboard.module.css'

export function StatsDashboard() {
  const [overview, setOverview] = useState<StatsOverview | null>(null)
  const [timeline, setTimeline] = useState<StatsTimeline[]>([])
  const [pages, setPages] = useState<StatsPageBreakdown[]>([])

  useEffect(() => {
    adminService.getStatsOverview().then(setOverview)
    adminService.getStatsTimeline(30).then(setTimeline)
    adminService.getStatsPages().then(setPages)
  }, [])

  return (
    <div className={styles.dashboard}>
      {/* 概览卡片 */}
      <div className={styles.overviewGrid}>
        {[
          { label: '总访问量', value: overview?.total_visits || 0, icon: <FiEye />, color: 'var(--color-accent-primary)' },
          { label: '今日访问', value: overview?.today_visits || 0, icon: <FiTrendingUp />, color: 'var(--color-accent-secondary)' },
          { label: '独立访客', value: overview?.unique_ips || 0, icon: <FiUsers />, color: 'var(--color-accent-tertiary)' },
          { label: '页面数', value: pages.length || 0, icon: <FiGlobe />, color: 'var(--color-success)' },
        ].map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <div className={styles.statIcon} style={{ color: stat.color }}>{stat.icon}</div>
            <div className={styles.statValue}>{stat.value.toLocaleString()}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 访问趋势图 */}
      <div className={styles.chartCard}>
        <h3>访问趋势 (近30天)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeline}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="date" stroke="var(--color-text-muted)" fontSize={12} />
            <YAxis stroke="var(--color-text-muted)" fontSize={12} />
            <Tooltip contentStyle={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
            <Line type="monotone" dataKey="visits" stroke="var(--color-accent-primary)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 页面分布图 */}
      <div className={styles.chartCard}>
        <h3>页面访问分布</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pages}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="page_path" stroke="var(--color-text-muted)" fontSize={12} />
            <YAxis stroke="var(--color-text-muted)" fontSize={12} />
            <Tooltip contentStyle={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
            <Bar dataKey="count" fill="var(--color-accent-secondary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
