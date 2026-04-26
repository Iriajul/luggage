// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // load user from localStorage on first render
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ll_user');
    return saved ? JSON.parse(saved) : null;
  });

  const signIn = (email, name, role) => {
    const userData = { email, name, role };
    localStorage.setItem('ll_user', JSON.stringify(userData)); // save to localStorage
    setUser(userData);
  };

  const signOut = () => {
    localStorage.removeItem('ll_user'); // clear from localStorage
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);