import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGem, FaRocket, FaShieldAlt, FaStar } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/auth.css';

const NormalLogin = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      setSuccess(t('referralCodeDetected'));
    }
  }, [searchParams, t]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Placeholder for backend integration
      console.log('Login attempt:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Placeholder logic - in real app, this would be handled by backend
      setSuccess(t('loginSuccessful'));
      
      // Simulate redirect after successful login
      setTimeout(() => {
        // In real app, this would use React Router navigation
        console.log('Redirecting to dashboard...');
      }, 1500);
      
    } catch (err) {
      setError(t('loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-page modern-login">
      <div className="auth-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>
      
      <Container>
        <Row className="justify-content-center min-vh-100 align-items-center">
          <Col md={6} lg={5} xl={4}>
            <Card className="auth-card modern-auth-card">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="auth-icon-wrapper">
                    <div className="auth-icon-bg">
                      <FaUser className="auth-icon" />
                    </div>
                  </div>
                  <div className="auth-badge">
                    <FaStar className="badge-icon" />
                    <span>{t('premiumAccess')}</span>
                  </div>
                  <h2 className="auth-title">{t('login')}</h2>
                  <p className="auth-subtitle">
                    {t('welcomeBack')}
                  </p>
                </div>
                
                {error && (
                  <Alert variant="danger" className="auth-alert">
                    <FaShieldAlt className="alert-icon me-2" />
                    {error}
                  </Alert>
                )}
                
                {success && (
                  <Alert variant="success" className="auth-alert">
                    <FaRocket className="alert-icon me-2" />
                    {success}
                  </Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4 form-group-modern">
                    <Form.Label>{t('email')}</Form.Label>
                    <div className="input-group-modern">
                      <span className="input-icon">
                        <FaUser />
                      </span>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('enterEmail')}
                        required
                        className="form-control-modern"
                      />
                    </div>
                  </Form.Group>
                  
                  <Form.Group className="mb-4 form-group-modern">
                    <Form.Label>{t('password')}</Form.Label>
                    <div className="input-group-modern">
                      <span className="input-icon">
                        <FaLock />
                      </span>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={t('enterPassword')}
                        required
                        className="form-control-modern"
                      />
                      <Button
                        variant="link"
                        onClick={togglePasswordVisibility}
                        className="password-toggle-btn"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </div>
                  </Form.Group>
                  
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      label={t('rememberMe')}
                      className="remember-me-check"
                    />
                    <Link to="/forgot-password" className="forgot-link">
                      {t('forgotPassword')}
                    </Link>
                  </div>
                  
                  <Button
                    type="submit"
                    className="auth-btn-modern w-100 mb-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        {t('loading')}
                      </>
                    ) : (
                      <>
                        <FaGem className="me-2" />
                        {t('login')}
                      </>
                    )}
                  </Button>
                </Form>
                
                <div className="auth-divider-modern my-4">
                  <span>OR</span>
                </div>
                
                <div className="text-center">
                  <p className="mb-0 auth-signup-text">
                    {t('dontHaveAccount')}{' '}
                    <Link to="/signup" className="auth-signup-link">
                      {t('signup')}
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NormalLogin;