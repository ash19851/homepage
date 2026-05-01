import { useEffect, useRef, useCallback } from 'react'
import styles from './RippleEffect.module.css'

export function RippleEffect() {
  const containerRef = useRef<HTMLDivElement>(null)

  const addRipple = useCallback((x: number, y: number) => {
    const container = containerRef.current
    if (!container) return
    const el = document.createElement('span')
    el.className = styles.ripple
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    container.appendChild(el)
    el.addEventListener('animationend', () => el.remove())
  }, [])

  useEffect(() => {
    const onClick = (e: globalThis.MouseEvent) => {
      // skip ripples on buttons / links / inputs
      const target = e.target as HTMLElement
      if (target.closest('button, a, input, select, textarea, [role="button"]')) return
      addRipple(e.clientX, e.clientY)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [addRipple])

  return <div ref={containerRef} className={styles.container} aria-hidden="true" />
}
