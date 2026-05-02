import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './WeatherTool.module.css'

interface GeocodingResult {
  name: string
  country: string
  latitude: number
  longitude: number
}

interface DailyWeather {
  date: string
  maxTemp: number
  minTemp: number
  weatherCode: number
}

const WEATHER_CODES: Record<number, { icon: string; label: string }> = {
  0: { icon: '☀️', label: '晴天' },
  1: { icon: '🌤️', label: '大部晴' },
  2: { icon: '⛅', label: '多云' },
  3: { icon: '☁️', label: '阴天' },
  45: { icon: '🌫️', label: '雾' },
  48: { icon: '🌫️', label: '霜雾' },
  51: { icon: '🌦️', label: '小毛毛雨' },
  53: { icon: '🌦️', label: '毛毛雨' },
  55: { icon: '🌦️', label: '大毛毛雨' },
  61: { icon: '🌧️', label: '小雨' },
  63: { icon: '🌧️', label: '中雨' },
  65: { icon: '🌧️', label: '大雨' },
  71: { icon: '🌨️', label: '小雪' },
  73: { icon: '🌨️', label: '中雪' },
  75: { icon: '🌨️', label: '大雪' },
  77: { icon: '🌨️', label: '雪粒' },
  80: { icon: '🌦️', label: '阵雨' },
  81: { icon: '🌧️', label: '大阵雨' },
  82: { icon: '🌧️', label: '暴阵雨' },
  85: { icon: '🌨️', label: '阵雪' },
  86: { icon: '🌨️', label: '大阵雪' },
  95: { icon: '⛈️', label: '雷暴' },
  96: { icon: '⛈️', label: '雷暴+冰雹' },
  99: { icon: '⛈️', label: '强雷暴+冰雹' },
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 20 } },
}

export function WeatherTool() {
  const [city, setCity] = useState('Beijing')
  const [coords, setCoords] = useState<GeocodingResult | null>(null)
  const [weather, setWeather] = useState<DailyWeather[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const searchCity = useCallback(async (query: string) => {
    if (!query.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=zh`)
      const data = await res.json()
      if (data.results?.length > 0) {
        setCoords(data.results[0])
        fetchWeather(data.results[0].latitude, data.results[0].longitude)
      } else {
        setError('未找到该城市')
        setLoading(false)
      }
    } catch {
      setError('搜索失败，请检查网络')
      setLoading(false)
    }
  }, [])

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=7`
      )
      const data = await res.json()
      const daily: DailyWeather[] = data.daily.time.map((date: string, i: number) => ({
        date,
        maxTemp: Math.round(data.daily.temperature_2m_max[i]),
        minTemp: Math.round(data.daily.temperature_2m_min[i]),
        weatherCode: data.daily.weathercode[i],
      }))
      setWeather(daily)
    } catch {
      setError('获取天气失败')
    }
    setLoading(false)
  }

  useEffect(() => {
    searchCity(city)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const formatDay = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00')
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const diff = (d.getTime() - today.getTime()) / 86400000
    if (diff === 0) return '今天'
    if (diff === 1) return '明天'
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return `${d.getMonth() + 1}/${d.getDate()} ${weekdays[d.getDay()]}`
  }

  return (
    <motion.div className={styles.weather} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <motion.div className={styles.search} whileHover={{ scale: 1.01 }}>
        <input
          className={styles.input}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchCity(city)}
          placeholder="输入城市名 (如 Beijing, Tokyo, London)"
        />
        <motion.button className={styles.btn} onClick={() => searchCity(city)} disabled={loading}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          搜索
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.p className={styles.error} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {coords && (
          <motion.p className={styles.location} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            📍 {coords.name}{coords.country ? `, ${coords.country}` : ''}
            <span className={styles.coords}>({coords.latitude.toFixed(2)}, {coords.longitude.toFixed(2)})</span>
          </motion.p>
        )}
      </AnimatePresence>

      {loading && (
        <motion.p className={styles.loading} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          加载中...
        </motion.p>
      )}

      <AnimatePresence>
        {weather.length > 0 && (
          <motion.div className={styles.grid} variants={containerVariants} initial="hidden" animate="show">
            {weather.map((day) => {
              const w = WEATHER_CODES[day.weatherCode] || { icon: '🌡️', label: '未知' }
              return (
                <motion.div key={day.date} className={styles.card} variants={cardVariants}
                  whileHover={{ scale: 1.08, y: -4, boxShadow: '0 8px 25px rgba(0,0,0,0.2)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                  <div className={styles.day}>{formatDay(day.date)}</div>
                  <motion.div className={styles.icon} animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
                    {w.icon}
                  </motion.div>
                  <div className={styles.label}>{w.label}</div>
                  <div className={styles.temps}>
                    <span className={styles.high}>{day.maxTemp}°</span>
                    <span className={styles.low}>{day.minTemp}°</span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <p className={styles.attribution}>
        数据来源: <a href="https://open-meteo.com/" target="_blank" rel="noopener">Open-Meteo</a>
      </p>
    </motion.div>
  )
}
