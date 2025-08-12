import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserPlus, FaGem, FaRocket, FaShieldAlt, FaStar } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/auth.css';

const NormalSignup = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      setFormData(prev => ({
        ...prev,
        referralCode: ref
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Placeholder for backend integration
      console.log('Signup attempt:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Placeholder logic - in real app, this would be handled by backend
      setSuccess('Account created successfully! Please check your email to verify your account.');
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        referralCode: searchParams.get('ref') || ''
      });
      
    } catch (err) {
      setError('Signup failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
                      <FaUserPlus className="auth-icon" />
                    </div>
                  </div>
                  <div className="auth-badge">
                    <FaStar className="badge-icon" />
                    <span>CREATE ACCOUNT</span>
                  </div>
                  <h2 className="auth-title">{t('signup')}</h2>
                  <p className="auth-subtitle">
                    Create your account and get started today!
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
                    <Form.Label>Full Name</Form.Label>
                    <div className="input-group-modern">
                      <span className="input-icon">
                        <FaUser />
                      </span>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="form-control-modern"
                      />
                    </div>
                  </Form.Group>
                  
                  <Form.Group className="mb-4 form-group-modern">
                    <Form.Label>{t('email')}</Form.Label>
                    <div className="input-group-modern">
                      <span className="input-icon">
                        <FaEnvelope />
                      </span>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
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
                        placeholder="Create a password"
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
                  
                  <Form.Group className="mb-4 form-group-modern">
                    <Form.Label>{t('confirmPassword')}</Form.Label>
                    <div className="input-group-modern">
                      <span className="input-icon">
                        <FaLock />
                      </span>
                      <Form.Control
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                        className="form-control-modern"
                      />
                      <Button
                        variant="link"
                        onClick={toggleConfirmPasswordVisibility}
                        className="password-toggle-btn"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </div>
                  </Form.Group>
                  
                  <Form.Group className="mb-4 form-group-modern">
                    <Form.Label>Referral Code (Optional)</Form.Label>
                    <div className="input-group-modern">
                      <span className="input-icon">
                        <FaUser />
                      </span>
                      <Form.Control
                        type="text"
                        name="referralCode"
                        value={formData.referralCode}
                        onChange={handleChange}
                        placeholder="Enter referral code"
                        className="form-control-modern"
                      />
                    </div>
                  </Form.Group>
                  
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
                        {t('signup')}
                      </>
                    )}
                  </Button>
                </Form>
                
                <div className="auth-divider-modern my-4">
                  <span>OR</span>
                </div>
                
                <div className="text-center">
                  <p className="mb-0 auth-signup-text">
                    {t('alreadyHaveAccount')}{' '}
                    <Link to="/login" className="auth-signup-link">
                      {t('login')}
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

export default NormalSignup;