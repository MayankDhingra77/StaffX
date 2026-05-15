import { createContext, useContext, useState, useEffect } from 'react';

const AuthCtx = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('staffx_user')); } catch { return null; }
  });
  useEffect(() => {
    if (user) localStorage.setItem('staffx_user', JSON.stringify(user));
    else localStorage.removeItem('staffx_user');
  }, [user]);
  return (
    <AuthCtx.Provider value={{ user, login: (role, data) => setUser({ role, ...data }), logout: () => setUser(null), isAuthenticated: !!user }}>
      {children}
    </AuthCtx.Provider>
  );
}
export function useAuth() { return useContext(AuthCtx); }
