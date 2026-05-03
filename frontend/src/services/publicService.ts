import { api } from './api'
import type { Profile, Project, Skill, SiteConfig, TimelineEntry, GuestbookMessage, Article, StatsOverview } from '../types'

function parseProject(p: Project): Project {
  if (typeof p.tech_stack === 'string') {
    try { p.tech_stack = JSON.parse(p.tech_stack) } catch { p.tech_stack = [] }
  }
  if (!Array.isArray(p.tech_stack)) p.tech_stack = []
  if (typeof p.images === 'string') {
    try { p.images = JSON.parse(p.images) } catch { p.images = [] }
  }
  if (!Array.isArray(p.images)) p.images = []
  return p
}

export async function getProfile(): Promise<Profile | null> {
  try {
    const res = await api.get<Profile>('/public/profile')
    return res.data
  } catch { return null }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await api.get<Project[]>('/public/projects')
    return (res.data || []).map(parseProject)
  } catch { return [] }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const res = await api.get<Skill[]>('/public/skills')
    return res.data || []
  } catch { return [] }
}

export async function getSiteConfig(): Promise<SiteConfig | null> {
  try {
    const res = await api.get<SiteConfig>('/public/site-config')
    return res.data
  } catch { return null }
}

export async function getTimeline(): Promise<TimelineEntry[]> {
  try {
    const res = await api.get<TimelineEntry[]>('/public/timeline')
    return res.data || []
  } catch { return [] }
}

export async function getGuestbook(): Promise<GuestbookMessage[]> {
  try {
    const res = await api.get<GuestbookMessage[]>('/public/guestbook')
    return res.data || []
  } catch { return [] }
}

export async function postGuestbook(name: string, message: string): Promise<GuestbookMessage | null> {
  try {
    const res = await api.post<GuestbookMessage>('/public/guestbook', { name, message })
    return res.data
  } catch { return null }
}

export async function getStats(): Promise<StatsOverview | null> {
  try {
    const res = await api.get<StatsOverview>('/public/stats')
    return res.data
  } catch { return null }
}

export async function getArticles(): Promise<Article[]> {
  try {
    const res = await api.get<Article[]>('/public/articles')
    return res.data || []
  } catch { return [] }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const res = await api.get<Article>(`/public/articles/${slug}`)
    return res.data
  } catch { return null }
}

export async function recordVisit(pagePath: string): Promise<void> {
  try { await api.post('/public/visit', { page_path: pagePath }) } catch { /* silent */ }
}
