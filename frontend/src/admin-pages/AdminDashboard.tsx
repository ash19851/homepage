import { useEffect, useState } from 'react'
import { FiFileText, FiBarChart2, FiSettings } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import * as adminService from '../services/adminService'
import type { StatsOverview } from '../types'

export function AdminDashboard() {
  const [overview, setOverview] = useState<StatsOverview | null>(null)

  useEffect(() => {
    adminService.getStatsOverview().then(setOverview)
  }, [])

  const cards = [
    { icon: <FiFileText size={28} />, label: '内容管理', value: '编辑', link: '/admin/content', color: 'var(--color-accent-primary)' },
    { icon: <FiBarChart2 size={28} />, label: '今日访问', value: String(overview?.today_visits || 0), link: '/admin/stats', color: 'var(--color-accent-secondary)' },
    { icon: <FiSettings size={28} />, label: '总访问量', value: String(overview?.total_visits || 0), link: '/admin/stats', color: 'var(--color-accent-tertiary)' },
  ]

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)', marginBottom: 24 }}>管理概览</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
        {cards.map((card) => (
          <Link key={card.label} to={card.link} style={{ textDecoration: 'none' }}>
            <div className="card" style={{ textAlign: 'center', padding: 32 }}>
              <div style={{ color: card.color, marginBottom: 12 }}>{card.icon}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-text-primary)' }}>{card.value}</div>
              <div style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)', marginTop: 6 }}>{card.label}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
