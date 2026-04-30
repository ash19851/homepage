import { useState, useCallback } from 'react'
import axios, { type AxiosError } from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token')
    }
    return Promise.reject(error)
  }
)

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const request = useCallback(async <R>(fn: () => Promise<R>): Promise<R | null> => {
    setLoading(true)
    setError(null)
    try {
      const result = await fn()
      setData(result as unknown as T)
      return result
    } catch (err) {
      const msg = err instanceof Error ? err.message : '请求失败'
      setError(msg)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, request, setData }
}

export { api }
export default useApi
