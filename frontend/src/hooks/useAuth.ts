import { useState, useCallback } from 'react'
import * as adminService from '../services/adminService'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (username: string, password: string, captchaToken: string, captchaAnswer: string): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const result = await adminService.login(username, password, captchaToken, captchaAnswer)
      if (typeof result === 'string') {
        setError(result)
        return false
      }
      localStorage.setItem('admin_token', result.access_token)
      return true
    } catch {
      setError('登录失败')
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
