import React from 'react';
import useLanguage from '../../hooks/useLanguage';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      onClick={toggleLanguage}
      className="btn btn-language-toggle"
      aria-label="Language"
      title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <div className="language-toggle-inner">
        <span className={`lang-option ${language === 'en' ? 'active' : ''}`}>EN</span>
        <span className="lang-divider">|</span>
        <span className={`lang-option ${language === 'ar' ? 'active' : ''}`}>عربي</span>
      </div>
    </button>
  );
};

export default LanguageToggle;