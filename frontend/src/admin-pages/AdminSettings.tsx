import { useState } from 'react'
import * as adminService from '../services/adminService'

export function AdminSettings() {
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null)

  const handleSave = async () => {
    if (!pw || pw.length < 4) { setMsg({ text: '密码至少 4 位', ok: false }); return }
    if (pw !== pw2) { setMsg({ text: '两次密码不一致', ok: false }); return }
    const ok = await adminService.changePassword(pw)
    if (ok) { setMsg({ text: '密码已更新', ok: true }); setPw(''); setPw2('') }
    else { setMsg({ text: '修改失败', ok: false }) }
  }

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
          }} type="password" placeholder="新密码" value={pw} onChange={(e) => setPw(e.target.value)} />
          <input className="card" style={{
            padding: '10px 14px', background: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)', borderRadius: '4px',
            color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)',
            fontSize: 'var(--font-size-body)', outline: 'none'
          }} type="password" placeholder="确认密码" value={pw2} onChange={(e) => setPw2(e.target.value)} />
          <button className="btn btn-primary" onClick={handleSave}>保存</button>
          {msg && <p style={{ color: msg.ok ? 'var(--color-success)' : 'var(--color-danger)', fontSize: 'var(--font-size-small)' }}>{msg.text}</p>}
        </div>
      </div>
    </div>
  )
}
