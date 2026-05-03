import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'
import type { Article } from '../types'
import * as publicService from '../services/publicService'
import styles from './BlogDetailPage.module.css'

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [article, setArticle] = useState<Article | null>(null)

  useEffect(() => {
    if (slug) {
      publicService.getArticleBySlug(slug).then(setArticle)
    }
  }, [slug])

  if (!article) {
    return (
      <div className={styles.notFound}>
        <p>文章不存在</p>
        <Link to="/blog" className="btn">返回博客</Link>
      </div>
    )
  }

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container">
        <Link to="/blog" className={styles.back}>
          <FiArrowLeft /> 返回博客
        </Link>

        <article className={styles.article}>
          <header className={styles.header}>
            <span className={styles.category}>{article.category}</span>
            <h1 className={styles.title}>{article.title}</h1>
            <time className={styles.date}>
              {new Date(article.created_at).toLocaleDateString('zh-CN', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </time>
          </header>

          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content_md) }}
          />
        </article>
      </div>
    </motion.div>
  )
}

function renderMarkdown(md: string): string {
  let html = md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/```[\s\S]*?```/g, (m) => `<pre>${m.replace(/```\n?/g, '')}</pre>`)
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\|(.+)\|/g, (row) => {
      const cells = row.split('|').filter(Boolean).map((c) => `<td>${c.trim()}</td>`).join('')
      return `<tr>${cells}</tr>`
    })
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')

  html = '<p>' + html + '</p>'
  html = html.replace(/<p><h([1-3])>/g, '<h$1>').replace(/<\/h([1-3])><\/p>/g, '</h$1>')
  html = html.replace(/<p><pre>/g, '<pre>').replace(/<\/pre><\/p>/g, '</pre>')
  html = html.replace(/<p><ul>/g, '<ul>').replace(/<\/ul><\/p>/g, '</ul>')
  html = html.replace(/<p><li>/g, '<li>').replace(/<\/li><\/p>/g, '</li>')
  html = html.replace(/<p><tr>/g, '<table><tr>').replace(/<\/tr><\/p>/g, '</tr></table>')

  return html
}
