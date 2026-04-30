import { useState } from 'react'

export function AdminSettings() {
  const [msg, setMsg] = useState<string | null>(null)

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)', marginBottom: 24 }}>设置</h1>
      <div className="card" style={{ maxWidth: 480 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: 16 }}>修改密码</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input className="card" style={{
            padding: '10px 14px', background: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)', borderRadius: '4px',
            color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)',
            fontSize: 'var(--font-size-body)', outline: 'none'
          }} type="password" placeholder="新密码" />
          <input className="card" style={{
            padding: '10px 14px', background: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)', borderRadius: '4px',
            color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)',
            fontSize: 'var(--font-size-body)', outline: 'none'
          }} type="password" placeholder="确认密码" />
          <button className="btn btn-primary" onClick={() => setMsg('密码已更新')}>保存</button>
          {msg && <p style={{ color: 'var(--color-success)', fontSize: 'var(--font-size-small)' }}>{msg}</p>}
        </div>
      </div>
    </div>
  )
}
