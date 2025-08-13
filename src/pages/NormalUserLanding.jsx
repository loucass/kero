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
      title: t('neuralIntelligence'),
      description: t('neuralIntelligenceDesc')
    },
    {
      icon: <FaStar className="feature-icon" />,
      title: t('quantumProcessing'),
      description: t('quantumProcessingDesc')
    },
    {
      icon: <FaShieldAlt className="feature-icon" />,
      title: t('militaryGradeSecurity'),
      description: t('militaryGradeSecurityDesc')
    },
    {
      icon: <FaRocket className="feature-icon" />,
      title: t('hypersonicPerformance'),
      description: t('hypersonicPerformanceDesc')
    },
    {
      icon: <FaGem className="feature-icon" />,
      title: t('predictiveAnalytics'),
      description: t('predictiveAnalyticsDesc')
    },
    {
      icon: <FaCrown className="feature-icon" />,
      title: t('premiumSupport'),
      description: t('premiumSupportDesc')
    }
  ];
  const stats = [
    { value: '99.9%', label: t('uptime'), icon: <FaStar className="stat-icon" /> },
    { value: '50M+', label: t('apiCalls'), icon: <FaChartLine className="stat-icon" /> },
    { value: '1ms', label: t('responseTime'), icon: <FaRocket className="stat-icon" /> },
    { value: '24/7', label: t('support'), icon: <FaCrown className="stat-icon" /> }
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
                  <span>{t('enterpriseGrade')}</span>
                </div>
                <h1 className="hero-title">
                  <span className="title-line">{t('nextGenerationAI')}</span>
                  <span className="title-line highlight">{t('aiPlatform')}</span>
                </h1>
                <p className="hero-subtitle">
                  {t('transformBusiness')}
                </p>
                <div className="hero-buttons">
                  <Button as={Link} to="/signup" size="lg" className="hero-btn-primary me-3">
                    <FaMagic className="me-2" />
                    {t('startFreeTrial')}
                  </Button>
                  <Button as={Link} to="/login" size="lg" variant="outline-light" className="hero-btn-secondary">
                    {t('viewDemo')}
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
                {t('revolutionaryFeatures')}
              </h2>
              <p className="section-subtitle">
                {t('experienceFutureAI')}
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
                  <span>{t('limitedTimeOffer')}</span>
                </div>
                <h2 className="cta-title">{t('readyToDominate')}</h2>
                <p className="cta-subtitle">
                  {t('joinEliteBusinesses')}
                </p>
                <div className="cta-buttons">
                  <Button as={Link} to="/signup" size="lg" className="cta-btn-primary me-3">
                    <FaRocket className="me-2" />
                    {t('startYourJourney')}
                  </Button>
                  <Button size="lg" variant="outline-light" className="cta-btn-secondary">
                    {t('scheduleDemo')}
                  </Button>
                </div>
                <div className="cta-trust">
                  <div className="trust-item">
                    <FaStar className="trust-icon" />
                    <span>{t('rating')}</span>
                  </div>
                  <div className="trust-item">
                    <FaShieldAlt className="trust-icon" />
                    <span>{t('secure')}</span>
                  </div>
                  <div className="trust-item">
                    <FaCrown className="trust-icon" />
                    <span>{t('enterpriseReady')}</span>
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