import { useEffect, useState } from 'react'
import { FiGithub, FiMail, FiCode } from 'react-icons/fi'
import type { SiteConfig } from '../../types'
import * as publicService from '../../services/publicService'
import styles from './Footer.module.css'

const DEFAULT_CONFIG: SiteConfig = {
  id: 1, site_name: 'UNANG',
  footer_text: 'Built with ❤️ and Claude Code.',
  footer_github: 'https://github.com', footer_email: '',
}

export function Footer() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG)
  const year = new Date().getFullYear()

  useEffect(() => {
    publicService.getSiteConfig().then((c) => { if (c) setConfig(c) })
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.links}>
          {config.footer_github && (
            <a href={config.footer_github} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
              <FiGithub size={18} />
            </a>
          )}
          {config.footer_email && (
            <a href={`mailto:${config.footer_email}`} className={styles.iconLink}>
              <FiMail size={18} />
            </a>
          )}
          <a href="/admin" className={styles.iconLink}>
            <FiCode size={18} />
          </a>
        </div>
        <p className={styles.copy}>
          &copy; {year} {config.site_name}. {config.footer_text}
        </p>
      </div>
    </footer>
  )
}
