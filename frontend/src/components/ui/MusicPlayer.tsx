import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMusic, FiPause, FiPlay, FiX } from 'react-icons/fi'
import * as publicService from '../../services/publicService'
import styles from './MusicPlayer.module.css'

export function MusicPlayer() {
  const [musicUrl, setMusicUrl] = useState('')
  const [playing, setPlaying] = useState(false)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    publicService.getSiteConfig().then((c) => {
      if (c?.music_url) {
        setMusicUrl(c.music_url)
        // Extract a display title from the URL
        try {
          const name = c.music_url.split('/').pop()?.split('?')[0] || 'Music'
          setTitle(decodeURIComponent(name))
        } catch {
          setTitle('Music')
        }
      }
    })
  }, [])

  useEffect(() => {
    if (!audioRef.current && musicUrl) {
      audioRef.current = new Audio(musicUrl)
      audioRef.current.loop = true
      audioRef.current.volume = 0.5
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [musicUrl])

  if (!musicUrl) return null

  const togglePlay = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setPlaying(!playing)
  }

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <button className={styles.closeBtn} onClick={() => setOpen(false)}>
              <FiX size={14} />
            </button>
            <span className={styles.title}>{title}</span>
            <button className={styles.playBtn} onClick={togglePlay}>
              {playing ? <FiPause size={16} /> : <FiPlay size={16} />}
            </button>
            {playing && (
              <div className={styles.bars}>
                <span className={styles.bar} />
                <span className={styles.bar} />
                <span className={styles.bar} />
                <span className={styles.bar} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <motion.button
          className={styles.fab}
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiMusic size={20} />
          {playing && <span className={styles.dot} />}
        </motion.button>
      )}
    </div>
  )
}
