import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({
  language: 'bn',
  setLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('bn');

  useEffect(() => {
    const saved = localStorage.getItem('language');
    if (saved && (saved === 'en' || saved === 'bn')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
