import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Article } from '../types'
import * as publicService from '../services/publicService'
import styles from './BlogListPage.module.css'

const CATEGORY_LABELS: Record<string, string> = {
  tech: '技术', ai: 'AI/机器学习', web: '网页', other: '其他',
}

export function BlogListPage() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    publicService.getArticles().then(setArticles)
  }, [])

  return (
    <div className="section">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="section-title">技术博客</h1>
        </motion.div>

        {articles.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: 40 }}>暂无文章</p>
        ) : (
          <div className={styles.list}>
            {articles.map((article, i) => (
              <motion.article
                key={article.id}
                className={styles.card}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Link to={`/blog/${article.slug}`} className={styles.link}>
                  <span className={styles.category}>
                    {CATEGORY_LABELS[article.category] || article.category}
                  </span>
                  <h2 className={styles.title}>{article.title}</h2>
                  <p className={styles.summary}>{article.summary}</p>
                  <time className={styles.date}>
                    {new Date(article.created_at).toLocaleDateString('zh-CN')}
                  </time>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
