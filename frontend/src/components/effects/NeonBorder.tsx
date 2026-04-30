import type { ReactNode } from 'react'
import styles from './NeonBorder.module.css'

interface Props {
  children: ReactNode
  className?: string
}

export function NeonBorder({ children, className }: Props) {
  return (
    <div className={`${styles.neon} ${className || ''}`}>
      {children}
    </div>
  )
}
