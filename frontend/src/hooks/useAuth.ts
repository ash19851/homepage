import { useState, useCallback } from 'react'
import { api } from './useApi'
import type { LoginResponse } from '../types'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.post<LoginResponse>('/admin/login', { username, password })
      localStorage.setItem('admin_token', res.data.access_token)
      return true
    } catch {
      setError('用户名或密码错误')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token')
    window.location.href = '/admin/login'
  }, [])

  const isAuthenticated = useCallback(() => {
    return !!localStorage.getItem('admin_token')
  }, [])

  return { login, logout, isAuthenticated, loading, error }
}
