import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import type { ThemeName } from '../types';
import * as publicService from '../services/publicService';

const ALL_THEMES: ThemeName[] = ['cyberpunk', 'matrix', 'aurora', 'void', 'synthwave', 'minimal-white', 'glassmorphism', 'ink-art', 'memphis'];

function isValidTheme(t: string | null | undefined): t is ThemeName {
  return !!t && ALL_THEMES.includes(t as ThemeName);
}

interface ThemeContextValue {
  theme: ThemeName;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('cyberpunk');
  const location = useLocation();

  // Apply theme to DOM whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Fetch admin-configured theme from backend (re-fetch on route change)
  useEffect(() => {
    publicService.getSiteConfig().then((config) => {
      if (config?.site_theme && isValidTheme(config.site_theme)) {
        setTheme(config.site_theme);
      }
    });
  }, [location.pathname]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within ThemeProvider');
  return ctx;
}
