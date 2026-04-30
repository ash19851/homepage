import { useState } from 'react'
import styles from './GlitchText.module.css'

interface Props {
  text: string
  as?: 'h1' | 'h2' | 'span'
  className?: string
}

export function GlitchText({ text, as: Tag = 'span', className }: Props) {
  const [glitching, setGlitching] = useState(false)

  return (
    <Tag
      className={`${styles.glitch} ${className || ''}`}
      data-text={text}
      onMouseEnter={() => setGlitching(true)}
      onMouseLeave={() => setGlitching(false)}
    >
      {text}
      {glitching && (
        <>
          <span className={styles.clone} aria-hidden="true" data-clone="red">{text}</span>
          <span className={styles.clone} aria-hidden="true" data-clone="cyan">{text}</span>
        </>
      )}
    </Tag>
  )
}
