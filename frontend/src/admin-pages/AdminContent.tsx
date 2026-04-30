import { useEffect, useState, useCallback } from 'react'
import { ContentEditor } from '../components/admin/ContentEditor'
import * as adminService from '../services/adminService'
import type { Profile, Project, Skill, SiteConfig } from '../types'

export function AdminContent() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null)

  const load = useCallback(() => {
    adminService.getProfile().then(setProfile)
    adminService.getProjects().then(setProjects)
    adminService.getSkills().then(setSkills)
    adminService.getSiteConfig().then(setSiteConfig)
  }, [])

  useEffect(() => { load() }, [load])

  const handleSaveProfile = async (data: Partial<Profile>): Promise<boolean> => {
    const result = await adminService.updateProfile(data)
    if (result) { setProfile(result); return true }
    return false
  }

  const handleSaveProject = async (data: Partial<Project>): Promise<boolean> => {
    let result: Project | null
    if (data.id) { result = await adminService.updateProject(data.id, data) }
    else { result = await adminService.createProject(data) }
    if (result) { load(); return true }
    return false
  }

  const handleDeleteProject = async (id: number): Promise<boolean> => {
    const ok = await adminService.deleteProject(id)
    if (ok) { load(); return true }
    return false
  }

  const handleSaveSkill = async (data: Partial<Skill>): Promise<boolean> => {
    let result: Skill | null
    if (data.id) { result = await adminService.updateSkill(data.id, data) }
    else { result = await adminService.createSkill(data) }
    if (result) { load(); return true }
    return false
  }

  const handleDeleteSkill = async (id: number): Promise<boolean> => {
    const ok = await adminService.deleteSkill(id)
    if (ok) { load(); return true }
    return false
  }

  const handleSaveSiteConfig = async (data: Partial<SiteConfig>): Promise<boolean> => {
    const result = await adminService.updateSiteConfig(data)
    if (result) { setSiteConfig(result); return true }
    return false
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)', marginBottom: 24 }}>内容管理</h1>
      <ContentEditor
        profile={profile}
        projects={projects}
        skills={skills}
        siteConfig={siteConfig}
        onSaveProfile={handleSaveProfile}
        onSaveProject={handleSaveProject}
        onDeleteProject={handleDeleteProject}
        onSaveSkill={handleSaveSkill}
        onDeleteSkill={handleDeleteSkill}
        onSaveSiteConfig={handleSaveSiteConfig}
      />
    </div>
  )
}
