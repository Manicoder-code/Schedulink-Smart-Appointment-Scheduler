import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userRole, setUserRole] = useState('guest'); // 'master' or 'guest'
  const [isNewUser, setIsNewUser] = useState(true);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedRole = localStorage.getItem('userRole');
    const visitedBefore = localStorage.getItem('visitedBefore');
    
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    if (savedRole) {
      setUserRole(savedRole);
    }
    
    if (visitedBefore) {
      setIsNewUser(false);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  const setRole = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  const markAsVisited = () => {
    setIsNewUser(false);
    localStorage.setItem('visitedBefore', 'true');
  };

  const value = {
    isDarkMode,
    toggleDarkMode,
    userRole,
    setRole,
    isNewUser,
    markAsVisited
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

