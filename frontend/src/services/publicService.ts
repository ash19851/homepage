import { api } from './api'
import type { Profile, Project, Skill, SiteConfig } from '../types'

function parseProject(p: Project): Project {
  if (typeof p.tech_stack === 'string') {
    try { p.tech_stack = JSON.parse(p.tech_stack) } catch { p.tech_stack = [] }
  }
  if (!Array.isArray(p.tech_stack)) p.tech_stack = []
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

export async function recordVisit(pagePath: string): Promise<void> {
  try { await api.post('/public/visit', { page_path: pagePath }) } catch { /* silent */ }
}
