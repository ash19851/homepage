import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import * as adminService from '../../services/adminService'
import styles from './LoginForm.module.css'

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaQuestion, setCaptchaQuestion] = useState('')
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()

  const fetchCaptcha = async () => {
    const c = await adminService.getCaptcha()
    if (c) { setCaptchaToken(c.token); setCaptchaQuestion(c.question) }
  }

  useEffect(() => { fetchCaptcha() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const ok = await login(username, password, captchaToken, captchaAnswer)
    if (ok) { navigate('/admin') } else { fetchCaptcha(); setCaptchaAnswer('') }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>后台管理</h1>
      {error && <div className={styles.error}>{error}</div>}
      <input className={styles.input} type="text" placeholder="用户名" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input className={styles.input} type="password" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <div className={styles.captchaRow}>
        <span className={styles.captchaQuestion}>{captchaQuestion}</span>
        <button type="button" className={styles.captchaRefresh} onClick={fetchCaptcha} title="换一个">↻</button>
      </div>
      <input className={styles.input} type="text" placeholder="验证码答案" value={captchaAnswer} onChange={(e) => setCaptchaAnswer(e.target.value)} required autoComplete="off" />
      <button className={`btn btn-primary ${styles.submit}`} type="submit" disabled={loading}>
        {loading ? '登录中...' : '登录'}
      </button>
    </form>
  )
}
