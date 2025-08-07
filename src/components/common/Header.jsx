import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import useLanguage from '../../hooks/useLanguage';

const Header = ({ user, onLogout }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <Link to={`/${user.role}`} className="header-logo">
              ServicePay
            </Link>
          </div>
          
          <div className="header-right">
            <div className="user-info">
              <span className="welcome-text">{t('welcome')},</span>
              <span className="user-name">{user.name}</span>
            </div>
            
            <ThemeToggle />
            <LanguageToggle />
            
            <button 
              onClick={handleLogout}
              className="btn btn-logout"
            >
              {t('logout')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;