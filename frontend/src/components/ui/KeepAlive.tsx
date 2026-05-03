import { useEffect, useRef } from 'react'
import { getSiteConfig } from '../../services/publicService'

const PING_INTERVAL = 10 * 60 * 1000 // 10 minutes (Render sleeps at 15 min)

export function KeepAlive() {
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true

    const ping = () => {
      getSiteConfig().catch(() => { /* silent */ })
    }

    ping() // ping immediately on mount
    const id = setInterval(ping, PING_INTERVAL)
    return () => clearInterval(id)
  }, [])

  return null
}
