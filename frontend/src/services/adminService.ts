import { api } from './api'
import type { Profile, Project, Skill, SiteConfig, TimelineEntry, Article, StatsOverview, StatsTimeline, StatsPageBreakdown, LoginResponse } from '../types'

export async function getCaptcha(): Promise<{ token: string; question: string } | null> {
  try {
    const res = await api.get<{ token: string; question: string }>('/admin/captcha')
    return res.data
  } catch { return null }
}

export async function login(username: string, password: string, captchaToken: string, captchaAnswer: string): Promise<LoginResponse | string> {
  try {
    const res = await api.post<LoginResponse>('/admin/login', {
      username, password,
      captcha_token: captchaToken,
      captcha_answer: captchaAnswer,
    })
    return res.data
  } catch (err: any) {
    const detail = err?.response?.data?.detail
    if (typeof detail === 'string') return detail
    return '登录失败'
  }
}

export async function changePassword(newPassword: string): Promise<boolean> {
  try {
    await api.put('/admin/password', { new_password: newPassword })
    return true
  } catch { return false }
}

export async function getProfile(): Promise<Profile | null> {
  try { const res = await api.get<Profile>('/public/profile'); return res.data } catch { return null }
}

export async function getSiteConfig(): Promise<SiteConfig | null> {
  try { const res = await api.get<SiteConfig>('/public/site-config'); return res.data } catch { return null }
}

export async function updateProfile(data: Partial<Profile>): Promise<Profile | null> {
  try { const res = await api.put<Profile>('/admin/profile', data); return res.data } catch { return null }
}

export async function getProjects(): Promise<Project[]> {
  try { const res = await api.get<Project[]>('/admin/projects'); return res.data.map(deserializeProject) } catch { return [] }
}

function serializeProject(data: Partial<Project>): Record<string, unknown> {
  const payload: Record<string, unknown> = { ...data }
  if (Array.isArray(data.tech_stack)) {
    payload.tech_stack = JSON.stringify(data.tech_stack)
  }
  if (Array.isArray(data.images)) {
    payload.images = JSON.stringify(data.images)
  }
  return payload
}

function deserializeProject(p: Project): Project {
  if (typeof p.tech_stack === 'string') {
    try { p.tech_stack = JSON.parse(p.tech_stack) } catch { p.tech_stack = [] }
  }
  if (typeof p.images === 'string') {
    try { p.images = JSON.parse(p.images) } catch { p.images = [] }
  }
  return p
}

export async function updateProject(id: number, data: Partial<Project>): Promise<Project | null> {
  try { const res = await api.put<Project>(`/admin/projects/${id}`, serializeProject(data)); return deserializeProject(res.data) } catch { return null }
}

export async function createProject(data: Partial<Project>): Promise<Project | null> {
  try { const res = await api.post<Project>('/admin/projects', serializeProject(data)); return deserializeProject(res.data) } catch { return null }
}

export async function deleteProject(id: number): Promise<boolean> {
  try { await api.delete(`/admin/projects/${id}`); return true } catch { return false }
}

export async function getSkills(): Promise<Skill[]> {
  try { const res = await api.get<Skill[]>('/admin/skills'); return res.data } catch { return [] }
}

export async function updateSkill(id: number, data: Partial<Skill>): Promise<Skill | null> {
  try { const res = await api.put<Skill>(`/admin/skills/${id}`, data); return res.data } catch { return null }
}

export async function createSkill(data: Partial<Skill>): Promise<Skill | null> {
  try { const res = await api.post<Skill>('/admin/skills', data); return res.data } catch { return null }
}

export async function deleteSkill(id: number): Promise<boolean> {
  try { await api.delete(`/admin/skills/${id}`); return true } catch { return false }
}

export async function updateSiteConfig(data: Partial<SiteConfig>): Promise<SiteConfig | null> {
  try { const res = await api.put<SiteConfig>('/admin/site-config', data); return res.data } catch { return null }
}

export async function getTimeline(): Promise<TimelineEntry[]> {
  try { const res = await api.get<TimelineEntry[]>('/admin/timeline'); return res.data } catch { return [] }
}

export async function createTimelineEntry(data: Partial<TimelineEntry>): Promise<TimelineEntry | null> {
  try { const res = await api.post<TimelineEntry>('/admin/timeline', data); return res.data } catch { return null }
}

export async function updateTimelineEntry(id: number, data: Partial<TimelineEntry>): Promise<TimelineEntry | null> {
  try { const res = await api.put<TimelineEntry>(`/admin/timeline/${id}`, data); return res.data } catch { return null }
}

export async function deleteTimelineEntry(id: number): Promise<boolean> {
  try { await api.delete(`/admin/timeline/${id}`); return true } catch { return false }
}

export async function getStatsOverview(): Promise<StatsOverview | null> {
  try { const res = await api.get<StatsOverview>('/admin/stats/overview'); return res.data } catch { return null }
}

export async function getStatsTimeline(days = 30): Promise<StatsTimeline[]> {
  try { const res = await api.get<StatsTimeline[]>('/admin/stats/timeline', { params: { days } }); return res.data } catch { return [] }
}

export async function getStatsPages(): Promise<StatsPageBreakdown[]> {
  try { const res = await api.get<StatsPageBreakdown[]>('/admin/stats/pages'); return res.data } catch { return [] }
}

export async function getArticles(): Promise<Article[]> {
  try { const res = await api.get<Article[]>('/admin/articles'); return res.data } catch { return [] }
}

export async function createArticle(data: Partial<Article>): Promise<Article | null> {
  try { const res = await api.post<Article>('/admin/articles', data); return res.data } catch { return null }
}

export async function updateArticle(id: number, data: Partial<Article>): Promise<Article | null> {
  try { const res = await api.put<Article>(`/admin/articles/${id}`, data); return res.data } catch { return null }
}

export async function deleteArticle(id: number): Promise<boolean> {
  try { await api.delete(`/admin/articles/${id}`); return true } catch { return false }
}
