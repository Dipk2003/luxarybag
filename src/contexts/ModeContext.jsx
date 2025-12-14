import React, { createContext, useContext, useState, useEffect } from 'react';

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('ecommerce_mode') || 'STARTER';
  });

  useEffect(() => {
    localStorage.setItem('ecommerce_mode', mode);
  }, [mode]);

  const toggleMode = (newMode) => {
    setMode(newMode);
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode, isGrowthMode: mode === 'GROWTH' }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within ModeProvider');
  }
  return context;
};