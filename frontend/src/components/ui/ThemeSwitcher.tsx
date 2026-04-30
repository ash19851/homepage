import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiLayers } from 'react-icons/fi'
import { useThemeContext } from '../../themes/theme-context'
import { THEMES } from '../../types'
import styles from './ThemeSwitcher.module.css'

export function ThemeSwitcher() {
  const { theme, setTheme } = useThemeContext()
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.panelTitle}>切换主题</div>
            {THEMES.map((t) => (
              <button
                key={t.key}
                className={`${styles.option} ${t.key === theme ? styles.optionActive : ''}`}
                onClick={() => { setTheme(t.key); setOpen(false) }}
              >
                <span className={styles.dot} data-theme-dot={t.key} />
                <span className={styles.optionLabel}>{t.label}</span>
                <span className={styles.optionDesc}>{t.description}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button className={styles.trigger} onClick={() => setOpen(!open)}>
        <FiLayers size={18} />
        <span>{THEMES.find((t) => t.key === theme)?.label || '主题'}</span>
      </button>
    </div>
  )
}
