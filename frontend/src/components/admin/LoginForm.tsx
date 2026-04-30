import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import styles from './LoginForm.module.css'

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const ok = await login(username, password)
    if (ok) navigate('/admin')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>后台管理</h1>
      {error && <div className={styles.error}>{error}</div>}
      <input className={styles.input} type="text" placeholder="用户名" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input className={styles.input} type="password" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button className={`btn btn-primary ${styles.submit}`} type="submit" disabled={loading}>
        {loading ? '登录中...' : '登录'}
      </button>
    </form>
  )
}
