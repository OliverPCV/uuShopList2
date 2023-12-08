import React, { createContext, useContext, useState } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const translate = (key) => {
    return translations[currentLanguage][key] || key;
  };

  const changeLanguage = (newLanguage) => {
    setCurrentLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, translate, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};