import { useState, useEffect, useRef } from 'react'
import styles from './StatCounter.module.css'

interface Props {
  end: number
  label: string
  suffix?: string
  duration?: number
}

export function StatCounter({ end, label, suffix = '', duration = 2000 }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()

          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return (
    <div ref={ref} className={styles.counter}>
      <div className={styles.number}>
        {count}{suffix}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  )
}
