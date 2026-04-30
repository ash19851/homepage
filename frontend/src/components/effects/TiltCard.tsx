import { useRef, type ReactNode, type MouseEvent } from 'react'
import styles from './TiltCard.module.css'

interface Props {
  children: ReactNode
  className?: string
  maxTilt?: number
}

export function TiltCard({ children, className = '', maxTilt = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--tilt-x', `${y * -maxTilt}deg`)
    el.style.setProperty('--tilt-y', `${x * maxTilt}deg`)
    el.style.setProperty('--glint-x', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--glint-y', `${(y + 0.5) * 100}%`)
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--tilt-x', '0deg')
    el.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <div
      ref={ref}
      className={`${styles.tilt} ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}
