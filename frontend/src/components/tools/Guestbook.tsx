import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { GuestbookMessage } from '../../types'
import * as publicService from '../../services/publicService'
import styles from './Guestbook.module.css'

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  show: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 25, delay: i * 0.04 },
  }),
}

export function Guestbook() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState('')

  const load = useCallback(() => {
    publicService.getGuestbook().then(setMessages)
  }, [])

  useEffect(() => { load() }, [load])

  const submit = async () => {
    if (!name.trim() || !text.trim()) return
    setSubmitting(true)
    const result = await publicService.postGuestbook(name.trim(), text.trim())
    setSubmitting(false)
    if (result) {
      setText('')
      load()
      setToast('留言成功!')
      setTimeout(() => setToast(''), 2000)
    } else {
      setToast('留言失败，请重试')
      setTimeout(() => setToast(''), 2000)
    }
  }

  return (
    <motion.div className={styles.gb} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <AnimatePresence>
        {toast && (
          <motion.div className={styles.toast}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className={styles.form}
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
        <motion.input
          className={styles.input}
          value={name} onChange={(e) => setName(e.target.value)}
          placeholder="你的昵称"
          maxLength={30}
          whileFocus={{ scale: 1.01 }}
        />
        <motion.textarea
          className={styles.textarea}
          value={text} onChange={(e) => setText(e.target.value)}
          placeholder="说点什么吧..."
          rows={3} maxLength={500}
          whileFocus={{ scale: 1.01 }}
        />
        <motion.button className={styles.btn} onClick={submit} disabled={submitting}
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
          {submitting ? '提交中...' : '留言'}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {messages.length === 0 ? (
          <motion.p className={styles.empty}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            暂无留言，来抢沙发吧 ~
          </motion.p>
        ) : (
          <div className={styles.list}>
            {messages.map((m, i) => (
              <motion.div key={m.id} className={styles.item}
                custom={i} variants={itemVariants} initial="hidden" animate="show"
                whileHover={{ scale: 1.02, borderColor: 'var(--color-accent)' }}>
                <div className={styles.header}>
                  <span className={styles.name}>{m.name}</span>
                  <span className={styles.time}>
                    {new Date(m.created_at).toLocaleString('zh-CN', {
                      month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className={styles.text}>{m.message}</div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
