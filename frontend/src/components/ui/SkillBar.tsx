import { motion } from 'framer-motion'
import styles from './SkillBar.module.css'

interface Props {
  name: string
  level: number
  icon?: string
  index?: number
}

export function SkillBar({ name, level, icon, index = 0 }: Props) {
  return (
    <motion.div
      className={styles.skillBar}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className={styles.header}>
        <span className={styles.name}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {name}
        </span>
        <span className={styles.level}>{level}%</span>
      </div>
      <div className={styles.track}>
        <motion.div
          className={styles.fill}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  )
}
