import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import * as publicService from '../../services/publicService'
import styles from './Navbar.module.css'

const NAV_ITEMS = [
  { path: '/', label: '首页' },
  { path: '/projects', label: '项目' },
  { path: '/about', label: '关于' },
  { path: '/skills', label: '技能' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [siteName, setSiteName] = useState('UNANG')
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const location = useLocation()

  useEffect(() => {
    publicService.getSiteConfig().then((c) => {
      if (c) {
        setSiteName(c.site_name)
        document.title = `${c.site_name} · 个人主页`
      }
    })
  }, [])

  // scroll-aware hide/show
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY
          if (y < 60) setVisible(true)
          else if (y > lastScrollY.current + 8) setVisible(false)
          else if (y < lastScrollY.current - 8) setVisible(true)
          lastScrollY.current = y
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <motion.nav
      className={styles.navbar}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoBracket}>&lt;</span>
          <span className={styles.logoText}>{siteName}</span>
          <span className={styles.logoBracket}> /&gt;</span>
        </Link>

        <div className={styles.desktopNav}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navLink} ${isActive(item.path) ? styles.active : ''}`}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/admin" className={styles.adminLink}>
            后台
          </Link>
        </div>

        <button className={styles.menuBtn} onClick={() => setOpen(!open)}>
          {open ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.mobileLink} ${isActive(item.path) ? styles.active : ''}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              后台管理
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
