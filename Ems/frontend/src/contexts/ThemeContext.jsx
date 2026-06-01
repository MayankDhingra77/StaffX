import { createContext, useContext, useState, useEffect } from 'react';

const ThemeCtx = createContext({});

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('staffx_theme') !== 'light');

  useEffect(() => {
    localStorage.setItem('staffx_theme', dark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <ThemeCtx.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() { return useContext(ThemeCtx); }
