import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';
import type { ThemeName } from '../types';

/* === State & Reducer === */
interface ThemeState {
  current: ThemeName;
}

type ThemeAction = { type: 'SET_THEME'; payload: ThemeName };

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'SET_THEME':
      document.documentElement.setAttribute('data-theme', action.payload);
      localStorage.setItem('theme', action.payload);
      return { current: action.payload };
    default:
      return state;
  }
}

function getInitialTheme(): ThemeName {
  const saved = localStorage.getItem('theme') as ThemeName | null;
  if (saved && ['cyberpunk', 'matrix', 'aurora', 'void', 'synthwave', 'minimal-white', 'glassmorphism', 'ink-art', 'memphis'].includes(saved)) {
    return saved;
  }
  return 'cyberpunk';
}

/* === Context === */
interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, { current: getInitialTheme() });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.current);
  }, []);

  const setTheme = (theme: ThemeName) => dispatch({ type: 'SET_THEME', payload: theme });

  return (
    <ThemeContext.Provider value={{ theme: state.current, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within ThemeProvider');
  return ctx;
}
