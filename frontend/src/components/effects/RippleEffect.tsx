import { useEffect, useRef, useCallback, type MouseEvent } from 'react'
import styles from './RippleEffect.module.css'

interface Ripple {
  id: number
  x: number
  y: number
}

export function RippleEffect() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(0)
  const ripples = useRef<Ripple[]>([])

  const addRipple = useCallback((x: number, y: number) => {
    const container = containerRef.current
    if (!container) return
    const id = nextId.current++
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
