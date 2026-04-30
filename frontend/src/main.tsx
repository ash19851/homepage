import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './themes/cyberpunk.css'
import './themes/matrix.css'
import './themes/aurora.css'
import './themes/void.css'
import './themes/synthwave.css'
import './themes/minimal-white.css'
import './themes/glassmorphism.css'
import './themes/ink-art.css'
import './themes/memphis.css'
import App from './App.tsx'
import { ThemeProvider } from './themes/theme-context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
