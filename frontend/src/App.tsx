import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './themes/theme-context'
import { PageShell } from './components/layout/PageShell'
import { ParticleBackground } from './components/particles/ParticleBackground'
import { CursorGlow } from './components/effects/CursorGlow'
import { RippleEffect } from './components/effects/RippleEffect'
import { ScrollToTop } from './components/ui/ScrollToTop'
import { KeepAlive } from './components/ui/KeepAlive'
import { MusicPlayer } from './components/ui/MusicPlayer'
import { BrightnessToggle } from './components/ui/BrightnessToggle'
import { PageTransition } from './components/ui/PageTransition'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { AboutPage } from './pages/AboutPage'
import { SkillsPage } from './pages/SkillsPage'
import { ToolsPage } from './pages/ToolsPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { BlogListPage } from './pages/BlogListPage'
import { BlogDetailPage } from './pages/BlogDetailPage'
import { AdminLogin } from './admin-pages/AdminLogin'
import { AdminDashboard } from './admin-pages/AdminDashboard'
import { AdminContent } from './admin-pages/AdminContent'
import { AdminStats } from './admin-pages/AdminStats'
import { AdminSettings } from './admin-pages/AdminSettings'
import { AdminLayout } from './components/admin/AdminLayout'
import { ProtectedRoute } from './components/admin/ProtectedRoute'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<PageShell />}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/skills" element={<PageTransition><SkillsPage /></PageTransition>} />
          <Route path="/tools" element={<PageTransition><ToolsPage /></PageTransition>} />
          <Route path="/projects/:id" element={<PageTransition><ProjectDetailPage /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><BlogListPage /></PageTransition>} />
          <Route path="/blog/:slug" element={<PageTransition><BlogDetailPage /></PageTransition>} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

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
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CursorGlow />
        <RippleEffect />
        <ParticleBackground />
        <AnimatedRoutes />
        <ScrollToTop />
        <KeepAlive />
        <MusicPlayer />
        <BrightnessToggle />
      </ThemeProvider>
    </BrowserRouter>
  )
}
