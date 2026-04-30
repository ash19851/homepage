import { StatsDashboard } from '../components/admin/StatsDashboard'

export function AdminStats() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)', marginBottom: 24 }}>数据统计</h1>
      <StatsDashboard />
    </div>
  )
}
