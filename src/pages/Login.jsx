import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { users } from '../data/users';
import LanguageToggle from '../components/common/LanguageToggle';
import ThemeToggle from '../components/common/ThemeToggle';
import '../styles/login.css';
import useTheme from '../hooks/useTheme';
import useLanguage from '../hooks/useLanguage';

const Login = ({ onLogin }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [referralId, setReferralId] = useState('');
  const [error, setError] = useState('');
  const [_, setIsScrolled] = useState(false);

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      setReferralId(ref);
    }

    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Find user by username (in a real app, this would be an API call)
    const user = users.find(u => u.name.toLowerCase() === username.toLowerCase());
    
    if (user && password === 'password') {
      // Simulate login
      onLogin({
        ...user,
        referralId: referralId || user.referralId
      });
      navigate(`/${user.role}`);
    } else {
      setError(t('invalidCredentials'));
    }
  };

  return (
    <div className={`login-page ${theme}`}>

      {/* Login Section */}
      <section className="login-section">
        <div className="container">
          <div className="login-content">
            <div className="login-form-container">
              <div className="login-header">
                <h1>{t('loginPageTitle')}</h1>
                <p>{t('loginPageSubtitle')}</p>
              </div>
              
              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="username">{t('username')}</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input"
                    placeholder={t('loginUsernamePlaceholder')}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">{t('password')}</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    placeholder={t('loginPasswordPlaceholder')}
                  />
                </div>
                
                <button type="submit" className="btn btn-primary btn-block">
                  {t('loginButton')}
                </button>
              </form>
              
              <div className="login-footer">
                <p>{t('loginNoAccount')} <Link to="/signup">{t('loginSignupLink')}</Link></p>
              </div>
            </div>
            
            <div className="login-visual">
              <div className="visual-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
              </div>
              <div className="login-graphic">
                <div className="graphic-line"></div>
                <div className="graphic-circle"></div>
                <div className="graphic-dots"></div>
              </div>
            </div>
          </div>
          
          <div className="demo-users">
            <h3>{t('loginDemoTitle')}</h3>
            <ul>
              <li>{t('loginDemoNormal')}</li>
              <li>{t('loginDemoMarketing')}</li>
              <li>{t('loginDemoAdmin')}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;