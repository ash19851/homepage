import { useEffect, useRef } from 'react'
import styles from './CursorGlow.module.css'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    let raf = 0
    let mx = -200
    let my = -200
    let cx = -200
    let cy = -200

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const animate = () => {
      cx += (mx - cx) * 0.08
      cy += (my - cy) * 0.08
      glow.style.transform = `translate(${cx}px, ${cy}px)`
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={glowRef} className={styles.glow} aria-hidden="true" />
}
