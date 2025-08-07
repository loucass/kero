import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LanguageToggle from '../components/common/LanguageToggle';
import ThemeToggle from '../components/common/ThemeToggle';
import '../styles/signup.css';
import useLanguage from '../hooks/useLanguage';
import useTheme from '../hooks/useTheme';

const SignupPage = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'normal',
    referralId: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setError(t('allFieldsRequired'));
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError(t('passwordsDoNotMatch'));
      return;
    }
    
    if (formData.password.length < 6) {
      setError(t('passwordTooShort'));
      return;
    }
    
    // Simulate signup
    console.log('Signup data:', formData);
    alert('Signup successful! Please login.');
    navigate('/login');
  };

  return (
    <div className={`signup-page ${theme}`}>

      {/* Signup Section */}
      <section className="signup-section">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form-container">
              <div className="signup-header">
                <h1>{t('signupPageTitle')}</h1>
                <p>{t('signupPageSubtitle')}</p>
              </div>
              
              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                  <label htmlFor="name">{t('signupFullNamePlaceholder')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={t('signupFullNamePlaceholder')}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">{t('signupEmailAddressPlaceholder')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={t('signupEmailAddressPlaceholder')}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">{t('signupPasswordPlaceholder')}</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={t('signupPasswordPlaceholder')}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">{t('signupConfirmPasswordPlaceholder')}</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={t('signupConfirmPasswordPlaceholder')}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="role">{t('signupAccountTypeLabel')}</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="normal">{t('signupNormalUser')}</option>
                    <option value="marketing">{t('signupMarketingUser')}</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="referralId">{t('referralId')}</label>
                  <input
                    type="text"
                    id="referralId"
                    name="referralId"
                    value={formData.referralId}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={t('signupReferralPlaceholder')}
                  />
                </div>
                
                <button type="submit" className="btn btn-primary btn-block">
                  {t('signupButton')}
                </button>
              </form>
              
              <div className="signup-footer">
                <p>{t('signupHaveAccount')} <Link to="/login">{t('signupLoginLink')}</Link></p>
              </div>
            </div>
            
            <div className="signup-visual">
              <div className="visual-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
              </div>
              <div className="signup-graphic">
                <div className="graphic-line"></div>
                <div className="graphic-circle"></div>
                <div className="graphic-dots"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;