import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiArrowLeft } from 'react-icons/fi'
import type { Project } from '../types'
import * as publicService from '../services/publicService'
import styles from './ProjectDetailPage.module.css'

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [project, setProject] = useState<Project | null>(null)
  const [imgIdx, setImgIdx] = useState(0)

  useEffect(() => {
    publicService.getProjects().then((projects) => {
      const found = projects.find((p) => p.id === Number(id))
      setProject(found || null)
    })
  }, [id])

  if (!project) {
    return (
      <div className={styles.notFound}>
        <p>项目不存在</p>
        <button className="btn" onClick={() => navigate('/projects')}>返回</button>
      </div>
    )
  }

  const allImages = project.images?.length ? project.images : (project.image_url ? [project.image_url] : [])

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.overlay} onClick={() => navigate('/projects')} />
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <button className={styles.closeBtn} onClick={() => navigate('/projects')}>
            <FiArrowLeft /> 返回
          </button>
        </div>

        {allImages.length > 0 && (
          <div className={styles.carousel}>
            <motion.img
              key={imgIdx}
              src={allImages[imgIdx]}
              alt={project.title}
              className={styles.image}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            />
            {allImages.length > 1 && (
              <div className={styles.dots}>
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === imgIdx ? styles.dotActive : ''}`}
                    onClick={() => setImgIdx(i)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className={styles.body}>
          <h1 className={styles.title}>{project.title}</h1>
          <span className={styles.category}>{project.category}</span>

          <p className={styles.desc}>
            {project.long_description || project.description}
          </p>

          {project.tech_stack?.length > 0 && (
            <div className={styles.tags}>
              {project.tech_stack.map((tech) => (
                <span key={tech} className={styles.tag}>{tech}</span>
              ))}
            </div>
          )}

          <div className={styles.links}>
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn">
                <FiGithub /> 源码
              </a>
            )}
            {project.demo_url && (
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <FiExternalLink /> 在线演示
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
