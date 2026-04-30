import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PageShell } from './components/layout/PageShell'
import { ThemeSwitcher } from './components/ui/ThemeSwitcher'
import { ParticleBackground } from './components/particles/ParticleBackground'
import { CursorGlow } from './components/effects/CursorGlow'
import { RippleEffect } from './components/effects/RippleEffect'
import { ScrollToTop } from './components/ui/ScrollToTop'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { AboutPage } from './pages/AboutPage'
import { SkillsPage } from './pages/SkillsPage'
import { AdminLogin } from './admin-pages/AdminLogin'
import { AdminDashboard } from './admin-pages/AdminDashboard'
import { AdminContent } from './admin-pages/AdminContent'
import { AdminStats } from './admin-pages/AdminStats'
import { AdminSettings } from './admin-pages/AdminSettings'
import { AdminLayout } from './components/admin/AdminLayout'
import { ProtectedRoute } from './components/admin/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <CursorGlow />
      <RippleEffect />
      <ParticleBackground />
      <Routes>
        {/* 公开页面 */}
        <Route element={<PageShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
        </Route>

        {/* 后台登录 */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 后台管理 (JWT保护) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="stats" element={<AdminStats />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
      <ThemeSwitcher />
      <ScrollToTop />
    </BrowserRouter>
  )
}
