import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert, Badge, ProgressBar } from 'react-bootstrap';
import { FaWallet, FaCrown, FaChartLine, FaBell, FaCog, FaUser, FaArrowRight, FaRocket, FaGem, FaStar, FaTrophy, FaFire, FaBolt } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/user-dashboard.css';

const UserDashboard = () => {
  const { t } = useLanguage();
  const [userData, setUserData] = useState({
    balance: 0,
    subscriptions: [],
    usageStats: {
      apiCalls: 0,
      storage: 0,
      bandwidth: 0
    },
    achievements: [],
    loading: true,
    error: ''
  });

  useEffect(() => {
    // Placeholder for backend integration
    const fetchUserData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Placeholder data
        setUserData({
          balance: 1247.50,
          subscriptions: [
            {
              id: 1,
              name: t('neuralAnalyticsPro'),
              price: 99.99,
              status: 'active',
              nextBilling: '2024-02-15',
              features: [t('advancedAI'), t('realTimeProcessing'), t('prioritySupport')]
            },
            {
              id: 2,
              name: t('quantumComputing'),
              price: 299.99,
              status: 'active',
              nextBilling: '2024-02-20',
              features: [t('quantumAlgorithms'), t('highPerformance'), t('dedicatedResources')]
            }
          ],
          usageStats: {
            apiCalls: 2456789,
            storage: 78.5,
            bandwidth: 94.2
          },
          achievements: [
            { id: 2, title: t('powerUser'), icon: <FaTrophy />, description: t('over1MApiCalls') },
            { id: 3, title: t('innovationLeader'), icon: <FaFire />, description: t('usingAdvancedFeatures') }
          ],
          loading: false,
          error: ''
        });
      } catch (error) {
        setUserData(prev => ({
          ...prev,
          loading: false,
          error: t('error')
        }));
      }
    };
    fetchUserData();
  }, [t]);

  const { balance, subscriptions, usageStats, achievements, loading, error } = userData;

  if (loading) {
    return (
      <div className="dashboard-page">
        <Container>
          <Row className="justify-content-center">
            <Col md={12} className="text-center">
              <div className="loading-spinner">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">{t('loading')}</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Container>
        <Row className="mb-4">
          <Col>
            <div className="dashboard-header">
              <div className="header-content">
                <div className="welcome-section">
                  <div className="welcome-badge">
                    <FaStar className="badge-icon" />
                    <span>PREMIUM USER</span>
                  </div>
                  <h1 className="dashboard-title">
                    {t('welcomeBack')}
                  </h1>
                  <p className="dashboard-subtitle">
                    {t('dashboardSubtitle')}
                  </p>
                </div>
                <div className="header-stats">
                  <div className="header-stat">
                    <div className="stat-value">${balance.toFixed(2)}</div>
                    <div className="stat-label">{t('accountBalance')}</div>
                  </div>
                  <div className="header-stat">
                    <div className="stat-value">{subscriptions.length}</div>
                    <div className="stat-label">{t('activeServices')}</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        
        {error && (
          <Row className="mb-4">
            <Col>
              <Alert variant="danger">{error}</Alert>
            </Col>
          </Row>
        )}
        
        {/* Premium Upgrade Notification */}
        <Row className="mb-4">
          <Col>
            <Alert className="premium-notification">
              <div className="premium-content">
                <div className="premium-left">
                  <div className="premium-icon-wrapper">
                    <FaGem className="premium-icon" />
                  </div>
                  <div className="premium-text">
                    <strong>{t('enterpriseEliteUpgrade')}</strong>
                    <p className="mb-0">{t('unlockQuantumProcessing')}</p>
                  </div>
                </div>
                <div className="premium-right">
                  <Button variant="premium" size="lg" as={Link} to="/services">
                    <FaRocket className="me-2" />
                    {t('upgradeNow')}
                  </Button>
                </div>
              </div>
            </Alert>
          </Col>
        </Row>
        
        {/* Stats Cards */}
        <Row className="mb-4">
          <Col md={6} lg={3}>
            <Card className="balance-card">
              <Card.Body>
                <div className="balance-header">
                  <div className="balance-icon-wrapper">
                    <FaWallet className="balance-icon" />
                  </div>
                  <span className="balance-label">{t('accountBalance')}</span>
                </div>
                <div className="balance-amount">
                  ${balance.toFixed(2)}
                </div>
                <div className="balance-subtitle">
                  {t('availableForServices')}
                </div>
                <div className="balance-actions">
                  <Button variant="outline-light" size="sm" as={Link} to="/wallet">
                    <FaBolt className="me-1" />
                    {t('addFunds')}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={3}>
            <Card className="status-card">
              <Card.Body>
                <div className="status-header">
                  <div className="status-icon-wrapper">
                    <FaCrown className="status-icon" />
                  </div>
                  <span className="status-label">{t('accountStatus')}</span>
                </div>
                <div className="status-value">
                  <Badge bg="success" className="status-badge">
                    <FaStar className="me-1" />
                    {t('premium')}
                  </Badge>
                </div>
                <div className="status-subtitle">
                  Since January 2024
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={3}>
            <Card className="performance-card">
              <Card.Body>
                <div className="performance-header">
                  <div className="performance-icon-wrapper">
                    <FaRocket className="performance-icon" />
                  </div>
                  <span className="performance-label">{t('performance')}</span>
                </div>
                <div className="performance-value">
                  99.9%
                </div>
                <div className="performance-subtitle">
                  {t('uptime')}
                </div>
                <div className="performance-indicator">
                  <div className="indicator-dot active"></div>
                  <span>{t('optimal')}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Subscriptions Section */}
        <Row className="mb-4">
          <Col>
            <Card className="subscriptions-card">
              <Card.Header>
                <div className="subscriptions-header">
                  <div className="header-left">
                    <FaCrown className="header-icon me-2" />
                    <h5 className="mb-0">{t('activeSubscriptions')}</h5>
                  </div>
                  <Button variant="outline-primary" size="sm" as={Link} to="/services">
                    <FaStar className="me-1" />
                    {t('browseServices')}
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                {subscriptions.length === 0 ? (
                  <div className="text-center py-5">
                    <FaCrown className="no-subscriptions-icon mb-3" />
                    <h5>{t('noActiveSubscriptions')}</h5>
                    <p className="text-muted">{t('subscribeToPremium')}</p>
                    <Button variant="primary" as={Link} to="/services">
                      <FaRocket className="me-2" />
                      {t('exploreServices')}
                    </Button>
                  </div>
                ) : (
                  <div className="subscriptions-grid">
                    {subscriptions.map((subscription) => (
                      <div key={subscription.id} className="subscription-card">
                        <div className="subscription-header">
                          <div className="subscription-icon">
                            <FaGem />
                          </div>
                          <div className="subscription-info">
                            <h6 className="subscription-name">{subscription.name}</h6>
                            <p className="subscription-price">${subscription.price}/month</p>
                          </div>
                          <div className="subscription-status">
                            <Badge bg="success">Active</Badge>
                          </div>
                        </div>
                        <div className="subscription-details">
                          <div className="detail-item">
                            <span className="detail-label">{t('nextBilling')}:</span>
                            <span className="detail-value">{subscription.nextBilling}</span>
                          </div>
                          <div className="subscription-features">
                            {subscription.features.map((feature, index) => (
                              <span key={index} className="feature-tag">
                                <FaStar className="feature-icon" />
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Achievements Section */}
        <Row className="mb-4">
          <Col>
            <Card className="achievements-card">
              <Card.Header>
                <div className="achievements-header">
                  <FaTrophy className="header-icon me-2" />
                  <h5 className="mb-0">{t('yourAchievements')}</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="achievements-grid">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="achievement-item">
                      <div className="achievement-icon">
                        {achievement.icon}
                      </div>
                      <div className="achievement-info">
                        <h6 className="achievement-title">{achievement.title}</h6>
                        <p className="achievement-description">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Quick Actions */}
        <Row>
          <Col md={6} lg={3}>
            <Card className="action-card">
              <Card.Body className="text-center">
                <div className="action-icon-wrapper">
                  <FaWallet className="action-icon" />
                </div>
                <h6>{t('wallet')}</h6>
                <p className="text-muted small">{t('manageYourFunds')}</p>
                <Button variant="primary" size="sm" as={Link} to="/wallet">
                  <FaBolt className="me-1" />
                  {t('viewWallet')}
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="action-card">
              <Card.Body className="text-center">
                <div className="action-icon-wrapper">
                  <FaCrown className="action-icon" />
                </div>
                <h6>{t('services')}</h6>
                <p className="text-muted small">{t('browsePremiumServices')}</p>
                <Button variant="primary" size="sm" as={Link} to="/services">
                  <FaStar className="me-1" />
                  {t('viewServices')}
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="action-card">
              <Card.Body className="text-center">
                <div className="action-icon-wrapper">
                  <FaChartLine className="action-icon" />
                </div>
                <h6>{t('analytics')}</h6>
                <p className="text-muted small">{t('advancedInsights')}</p>
                <Button variant="primary" size="sm">
                  <FaRocket className="me-1" />
                  {t('comingSoon')}
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="action-card">
              <Card.Body className="text-center">
                <div className="action-icon-wrapper">
                  <FaCog className="action-icon" />
                </div>
                <h6>{t('settings')}</h6>
                <p className="text-muted small">{t('accountPreferences')}</p>
                <Button variant="primary" size="sm">
                  <FaGem className="me-1" />
                  {t('settings')}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserDashboard;