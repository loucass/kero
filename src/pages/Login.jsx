import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useLanguage from '../hooks/useLanguage';
import { users } from "../data/users";
import "../styles/login.css"

const Login = ({ onLogin }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [referralId, setReferralId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      setReferralId(ref);
    }
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
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>{t('loginWelcomeBack')}</h1>
          <p>{t('loginSignInToAccount')}</p>
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
              placeholder={t('username')}
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
              placeholder={t('password')}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="referralId">{t('loginReferralId')}</label>
            <input
              type="text"
              id="referralId"
              value={referralId}
              onChange={(e) => setReferralId(e.target.value)}
              className="form-input"
              placeholder={t('referralId')}
            />
          </div>
          
          <button type="submit" className="btn btn-primary btn-block">
            {t('login')}
          </button>
        </form>
        
        <div className="login-footer">
          <p>{t('signupHaveAccount')} <Link to="/signup">{t('signupSignIn')}</Link></p>
        </div>
        
        <div className="demo-users">
          <p className="demo-title">{t('loginDemoUsers')}:</p>
          <ul className="demo-list">
            <li><span>{t('loginNormalUser')}:</span> John Doe / password</li>
            <li><span>{t('loginMarketingUser')}:</span> Jane Smith / password</li>
            <li><span>{t('loginAdmin')}:</span> Admin User / password</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;