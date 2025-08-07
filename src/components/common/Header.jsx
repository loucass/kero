import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import useLanguage from '../../hooks/useLanguage';
import useTheme from '../../hooks/useTheme';

const Header = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [user] = useLocalStorage('user', null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${theme}`}>
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="logo">
              <span className="logo-text">ServicePay</span>
            </Link>
          </div>
          
          <div className="header-right">
            {user && (
              <div className="user-info">
                <span className="welcome-text">{t('welcome')},</span>
                <span className="user-name">{user.name}</span>
              </div>
            )}
            
            <div className="header-actions">
              <ThemeToggle />
              <LanguageToggle />
              
              {user ? (
                <button 
                  onClick={handleLogout}
                  className="btn btn-logout"
                >
                  {t('logout')}
                </button>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline">{t('login')}</Link>
                  <Link to="/signup" className="btn btn-primary">{t('landingNewGetStarted')}</Link>
                </>
              )}
            </div>
            
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              ref={toggleButtonRef}
            >
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            </button>
          </div>
        </div>
        
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
          <div className="mobile-menu-content">
            <div className="mobile-toggles">
              <ThemeToggle />
              <LanguageToggle />
            </div>
            {user ? (
              <button 
                onClick={handleLogout}
                className="btn btn-logout mobile-btn"
              >
                {t('logout')}
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline mobile-btn" onClick={toggleMenu}>{t('login')}</Link>
                <Link to="/signup" className="btn btn-primary mobile-btn" onClick={toggleMenu}>{t('landingNewGetStarted')}</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;