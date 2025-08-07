import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signup.css';
import useLanguage from '../hooks/useLanguage';

const SignupPage = () => {
  const { t } = useLanguage();
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
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1>{t('signupCreateAccount')}</h1>
          <p>{t('signupJoinPlatform')}</p>
        </div>
        
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">{t('signupFullName')}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder={t('signupFullName')}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">{t('signupEmailAddress')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder={t('signupEmailAddress')}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">{t('signupCreatePassword')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder={t('signupCreatePassword')}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">{t('signupConfirmPassword')}</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-control"
              placeholder={t('signupConfirmPassword')}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">{t('signupAccountType')}</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-control"
            >
              <option value="normal">{t('signupNormalUser')}</option>
              <option value="marketing">{t('signupMarketingUser')}</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="referralId">{t('signupReferralId')}</label>
            <input
              type="text"
              id="referralId"
              name="referralId"
              value={formData.referralId}
              onChange={handleChange}
              className="form-control"
              placeholder={t('signupEnterReferralId')}
            />
          </div>
          
          <button type="submit" className="btn btn-primary btn-block">
            {t('signupCreateAccountBtn')}
          </button>
        </form>
        
        <div className="signup-footer">
          <p>{t('signupHaveAccount')} <Link to="/login">{t('signupSignIn')}</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;