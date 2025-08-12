import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FaUsers, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/auth.css';

const MarketingLogin = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      console.log('Marketing login attempt:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Placeholder logic - in real app, this would be handled by backend
      setSuccess('Login successful! Redirecting to marketing dashboard...');
      
      // Simulate redirect after successful login
      setTimeout(() => {
        // In real app, this would use React Router navigation
        console.log('Redirecting to marketing dashboard...');
      }, 1500);
      
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-page marketing-auth">
      <Container>
        <Row className="justify-content-center min-vh-100 align-items-center">
          <Col md={6} lg={5} xl={4}>
            <Card className="auth-card">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="auth-icon marketing-icon">
                    <FaUsers />
                  </div>
                  <h2 className="auth-title">Marketing {t('login')}</h2>
                  <p className="auth-subtitle">
                    Welcome back! Please login to your marketing partner account.
                  </p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert variant="success" className="mb-4">
                    {success}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>{t('email')}</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaUsers />
                      </span>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your marketing email"
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>{t('password')}</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaLock />
                      </span>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={togglePasswordVisibility}
                        className="password-toggle"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      label={t('rememberMe')}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="auth-btn marketing-btn w-100 mb-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        {t('loading')}
                      </>
                    ) : (
                      'Marketing Login'
                    )}
                  </Button>

                  <div className="text-center">
                    <Link to="/forgot-password" className="auth-link">
                      {t('forgotPassword')}
                    </Link>
                  </div>
                </Form>

                <div className="auth-divider my-4">
                  <span>OR</span>
                </div>

                <div className="text-center">
                  <p className="mb-0">
                    {t('dontHaveAccount')}{' '}
                    <Link to="/marketing/signup" className="auth-link">
                      Marketing {t('signup')}
                    </Link>
                  </p>
                </div>

                <div className="auth-divider my-4">
                  <span>OR</span>
                </div>

                <div className="text-center">
                  <p className="mb-0">
                    <Link to="/login" className="auth-link">
                      User Login
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

export default MarketingLogin;