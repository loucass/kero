import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaRobot, FaChartLine, FaShieldAlt, FaRocket, FaBrain, FaCloud, FaStar, FaGem, FaCrown, FaMagic } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/normal-user-landing.css';

const NormalUserLanding = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <FaBrain className="feature-icon" />,
      title: 'Neural Intelligence',
      description: 'Advanced neural networks that learn and adapt to your unique business patterns with unprecedented accuracy.'
    },
    {
      icon: <FaStar className="feature-icon" />,
      title: 'Quantum Processing',
      description: 'Harness the power of quantum-inspired algorithms for lightning-fast data processing and insights.'
    },
    {
      icon: <FaShieldAlt className="feature-icon" />,
      title: 'Military-Grade Security',
      description: 'Enterprise-level encryption with biometric authentication and real-time threat detection.'
    },
    {
      icon: <FaRocket className="feature-icon" />,
      title: 'Hypersonic Performance',
      description: 'Sub-millisecond response times with our proprietary optimization technology.'
    },
    {
      icon: <FaGem className="feature-icon" />,
      title: 'Predictive Analytics',
      description: 'Forecast trends and opportunities with 99.9% accuracy using our advanced ML models.'
    },
    {
      icon: <FaCrown className="feature-icon" />,
      title: 'Premium Support',
      description: '24/7 dedicated support with AI-powered assistance and human experts.'
    }
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime', icon: <FaStar className="stat-icon" /> },
    { value: '50M+', label: 'API Calls', icon: <FaChartLine className="stat-icon" /> },
    { value: '1ms', label: 'Response Time', icon: <FaRocket className="stat-icon" /> },
    { value: '24/7', label: 'Support', icon: <FaCrown className="stat-icon" /> }
  ];

  return (
    <div className="normal-landing">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="hero-content">
              <div className="hero-text">
                <div className="hero-badge">
                  <FaStar className="badge-icon" />
                  <span>ENTERPRISE GRADE</span>
                </div>
                <h1 className="hero-title">
                  <span className="title-line">Next-Generation</span>
                  <span className="title-line highlight">AI Platform</span>
                </h1>
                <p className="hero-subtitle">
                  Transform your business with cutting-edge artificial intelligence and quantum computing technologies
                </p>
                <div className="hero-buttons">
                  <Button as={Link} to="/signup" size="lg" className="hero-btn-primary me-3">
                    <FaMagic className="me-2" />
                    Start Free Trial
                  </Button>
                  <Button as={Link} to="/login" size="lg" variant="outline-light" className="hero-btn-secondary">
                    View Demo
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6} className="hero-visual">
              <div className="hero-animation">
                <div className="ai-core">
                  <div className="core-ring core-ring-1"></div>
                  <div className="core-ring core-ring-2"></div>
                  <div className="core-ring core-ring-3"></div>
                  <div className="central-brain">
                    <FaBrain className="brain-icon" />
                  </div>
                  <div className="energy-particles">
                    {[...Array(30)].map((_, i) => (
                      <div key={i} className={`energy-particle particle-${i + 1}`} />
                    ))}
                  </div>
                  <div className="data-streams">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className={`data-stream stream-${i + 1}`} />
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <Container>
          <Row>
            {stats.map((stat, index) => (
              <Col md={6} lg={3} key={index}>
                <div className="stat-item">
                  <div className="stat-icon-wrapper">
                    {stat.icon}
                  </div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">
                <FaMagic className="title-icon me-3" />
                Revolutionary Features
              </h2>
              <p className="section-subtitle">
                Experience the future of AI with our cutting-edge technology stack
              </p>
            </Col>
          </Row>
          <Row>
            {features.map((feature, index) => (
              <Col md={6} lg={4} className="mb-4" key={index}>
                <Card className="feature-card h-100">
                  <Card.Body className="text-center">
                    <div className="feature-icon-wrapper">
                      {feature.icon}
                    </div>
                    <Card.Title className="feature-title">{feature.title}</Card.Title>
                    <Card.Text className="feature-description">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <Row className="text-center">
            <Col>
              <div className="cta-content">
                <div className="cta-badge">
                  <FaCrown className="badge-icon" />
                  <span>LIMITED TIME OFFER</span>
                </div>
                <h2 className="cta-title">Ready to Dominate Your Industry?</h2>
                <p className="cta-subtitle">
                  Join the elite businesses that are already leveraging our AI platform to achieve unprecedented growth and efficiency.
                </p>
                <div className="cta-buttons">
                  <Button as={Link} to="/signup" size="lg" className="cta-btn-primary me-3">
                    <FaRocket className="me-2" />
                    Start Your Journey
                  </Button>
                  <Button size="lg" variant="outline-light" className="cta-btn-secondary">
                    Schedule Demo
                  </Button>
                </div>
                <div className="cta-trust">
                  <div className="trust-item">
                    <FaStar className="trust-icon" />
                    <span>4.9/5 Rating</span>
                  </div>
                  <div className="trust-item">
                    <FaShieldAlt className="trust-icon" />
                    <span>100% Secure</span>
                  </div>
                  <div className="trust-item">
                    <FaCrown className="trust-icon" />
                    <span>Enterprise Ready</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default NormalUserLanding;