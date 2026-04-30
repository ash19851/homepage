import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectCard } from '../components/ui/ProjectCard'
import type { Project } from '../types'
import * as publicService from '../services/publicService'
import styles from './ProjectsPage.module.css'

const CATEGORIES = ['all', 'web', 'game', 'ai']

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    publicService.getProjects().then(setProjects)
  }, [])

  const filtered = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter)

  return (
    <div className={styles.page}>
      <section className="section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="section-title">项目展示</h1>
          </motion.div>

          <div className={styles.filters}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${filter === cat ? styles.filterActive : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat === 'all' ? '全部' : cat === 'web' ? 'Web' : cat === 'game' ? '游戏' : 'AI'}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: 40 }}>暂无项目，去后台添加吧</p>
          ) : (
            <div className={styles.grid}>
              <AnimatePresence>
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
