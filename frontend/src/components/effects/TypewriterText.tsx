import { useState, useEffect } from 'react'
import styles from './TypewriterText.module.css'

interface Props {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  pause?: number
}

export function TypewriterText({ texts, speed = 80, deleteSpeed = 40, pause = 2000 }: Props) {
  const [displayed, setDisplayed] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[textIndex % texts.length]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayed(currentText.slice(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        } else {
          setTimeout(() => setIsDeleting(true), pause)
        }
      } else {
        if (charIndex > 0) {
          setDisplayed(currentText.slice(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        } else {
          setIsDeleting(false)
          setTextIndex(textIndex + 1)
        }
      }
    }, isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex, texts, speed, deleteSpeed, pause])

  return (
    <span className={styles.typewriter}>
      {displayed}
      <span className={styles.cursor}>|</span>
    </span>
  )
}
