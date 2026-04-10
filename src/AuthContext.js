import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('caniel_user');
    const savedAuth = localStorage.getItem('caniel_auth');
    if (savedUser && savedAuth) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username, password) => {
    // Default users: admin/admin (full access), user/user (limited)
    const users = {
      admin: { username: 'admin', password: 'admin', role: 'admin' },
      user: { username: 'user', password: 'user', role: 'user' }
    };

    if (users[username] && users[username].password === password) {
      const userData = users[username];
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('caniel_user', JSON.stringify(userData));
      localStorage.setItem('caniel_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('caniel_user');
    localStorage.removeItem('caniel_auth');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
