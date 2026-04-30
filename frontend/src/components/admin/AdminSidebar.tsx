import { NavLink, useNavigate } from 'react-router-dom'
import { FiHome, FiFileText, FiBarChart2, FiSettings, FiLogOut, FiArrowLeft } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import styles from './AdminSidebar.module.css'

const NAV = [
  { path: '/admin', label: '概览', icon: <FiHome size={18} /> },
  { path: '/admin/content', label: '内容管理', icon: <FiFileText size={18} /> },
  { path: '/admin/stats', label: '数据统计', icon: <FiBarChart2 size={18} /> },
  { path: '/admin/settings', label: '设置', icon: <FiSettings size={18} /> },
]

export function AdminSidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandBracket}>&lt;</span>
        <span className={styles.brandText}>ADMIN</span>
        <span className={styles.brandBracket}> /&gt;</span>
      </div>
      <nav className={styles.nav}>
        {NAV.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className={styles.bottom}>
        <button className={styles.navLink} onClick={() => navigate('/')}>
          <FiArrowLeft size={18} /> <span>返回主页</span>
        </button>
        <button className={styles.navLink} onClick={logout}>
          <FiLogOut size={18} /> <span>退出登录</span>
        </button>
      </div>
    </aside>
  )
}
