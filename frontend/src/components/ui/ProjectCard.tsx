import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import type { Project } from '../../types'
import { NeonBorder } from '../effects/NeonBorder'
import { TiltCard } from '../effects/TiltCard'
import styles from './ProjectCard.module.css'

interface Props {
  project: Project
  index?: number
}

export function ProjectCard({ project, index = 0 }: Props) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <TiltCard maxTilt={6}>
        <NeonBorder className={styles.card}>
          <div className={styles.clickable} onClick={() => navigate(`/projects/${project.id}`)}>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.desc}>{project.description}</p>
            {project.tech_stack && project.tech_stack.length > 0 && (
              <div className={styles.tags}>
                {project.tech_stack.map((tech) => (
                  <span key={tech} className={styles.tag}>{tech}</span>
                ))}
              </div>
            )}
          </div>
          <div className={styles.links}>
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer" className={styles.link} onClick={(e) => e.stopPropagation()}>
                <FiGithub /> 源码
              </a>
            )}
            {project.demo_url && (
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className={styles.link} onClick={(e) => e.stopPropagation()}>
                <FiExternalLink /> 演示
              </a>
            )}
          </div>
        </NeonBorder>
      </TiltCard>
    </motion.div>
  )
}
