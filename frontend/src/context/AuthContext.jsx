import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Kept in memory only, per the security note in the project brief.
  // This means a hard refresh logs the admin out - acceptable for a
  // single-admin portfolio; upgrade to httpOnly cookies for anything
  // with more users or higher stakes.
  const [token, setToken] = useState(null);

  function login(newToken) {
    setToken(newToken);
  }

  function logout() {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
