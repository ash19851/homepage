import { useEffect, useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import styles from './BrightnessToggle.module.css'

const KEY = 'myhomepage-brightness'

export function BrightnessToggle() {
  const [light, setLight] = useState(() => {
    return localStorage.getItem(KEY) === 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-brightness', light ? 'light' : 'dark')
    localStorage.setItem(KEY, light ? 'light' : 'dark')
  }, [light])

  return (
    <button
      className={styles.btn}
      onClick={() => setLight(!light)}
      title={light ? '暗色模式' : '亮色模式'}
    >
      {light ? <FiMoon size={16} /> : <FiSun size={16} />}
    </button>
  )
}
