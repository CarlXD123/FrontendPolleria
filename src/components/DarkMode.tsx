// DarkModeContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface DarkModeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}
interface DarkModeProviderProps {
  children: React.ReactNode;
}


const DarkMode = createContext<DarkModeContextProps | undefined>(undefined);

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <DarkMode.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkMode.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkMode);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};
