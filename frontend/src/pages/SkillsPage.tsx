import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SkillBar } from '../components/ui/SkillBar'
import type { Skill, SkillCategory } from '../types'
import * as publicService from '../services/publicService'
import styles from './SkillsPage.module.css'

const CATEGORY_LABELS: Record<string, string> = {
  frontend: '前端技术',
  backend: '后端与数据库',
  ai: 'AI / 机器学习',
  tools: '工业与工具链',
  other: '其他',
}

function groupByCategory(skills: Skill[]): SkillCategory[] {
  const map = new Map<string, Skill[]>()
  for (const s of skills) {
    const list = map.get(s.category) || []
    list.push(s)
    map.set(s.category, list)
  }
  return Array.from(map.entries()).map(([category, items]) => ({
    category,
    label: CATEGORY_LABELS[category] || category,
    skills: items.sort((a, b) => a.sort_order - b.sort_order),
  }))
}

export function SkillsPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([])

  useEffect(() => {
    publicService.getSkills().then((skills) => {
      setCategories(groupByCategory(skills))
    })
  }, [])

  return (
    <div className={styles.page}>
      <section className="section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="section-title">技能树</h1>
          </motion.div>
          {categories.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: 40 }}>暂无技能数据，去后台添加吧</p>
          ) : (
            <div className={styles.grid}>
              {categories.map((category, ci) => (
                <motion.div key={category.category}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: ci * 0.15 }} viewport={{ once: true }}>
                  <div className={`card ${styles.categoryCard}`}>
                    <h2 className={styles.categoryTitle}>{category.label}</h2>
                    {category.skills.map((skill, si) => (
                      <SkillBar key={skill.id} name={skill.name} level={skill.level} icon={skill.icon || ''} index={si} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
