import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Badge, Modal } from 'react-bootstrap';
import { FaCrown, FaRobot, FaChartLine, FaShieldAlt, FaCloud, FaDatabase, FaCheck, FaTimes, FaGem, FaStar, FaRocket, FaBolt } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/services.css';

const Services = () => {
  const { t } = useLanguage();
  const [services, setServices] = useState([]);
  const [userBalance, setUserBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    // Placeholder for backend integration
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Placeholder data
        setServices([
          {
            id: 1,
            name: t('basicAnalytics'),
            description: t('essentialAnalyticsBusiness'),
            price: 29.99,
            features: [t('realTimeAnalytics'), t('basicReports'), t('emailSupport'), t('storage5GB')],
            icon: <FaChartLine />,
            popular: false,
            subscribed: false
          },
          {
            id: 2,
            name: t('professionalAI'),
            description: t('advancedAIPowered'),
            price: 79.99,
            features: [t('advancedAIAnalytics'), t('machineLearning'), t('prioritySupport'), t('storage50GB'), t('customReports')],
            icon: <FaRobot />,
            popular: true,
            subscribed: true
          },
          {
            id: 3,
            name: t('enterpriseSuite'),
            description: t('completeEnterpriseSolution'),
            price: 199.99,
            features: [t('unlimitedAnalytics'), t('fullAISuite'), t('dedicatedSupport'), t('unlimitedStorage'), t('customIntegrations'), t('apiAccess')],
            icon: <FaCrown />,
            popular: false,
            subscribed: false
          },
          {
            id: 4,
            name: t('securityPro'),
            description: t('advancedSecurityMonitoring'),
            price: 49.99,
            features: [t('securityMonitoring'), t('threatDetection'), t('complianceReporting'), t('securityAlerts')],
            icon: <FaShieldAlt />,
            popular: false,
            subscribed: false
          },
          {
            id: 5,
            name: t('cloudStorage'),
            description: t('secureCloudStorage'),
            price: 19.99,
            features: [t('storage100GB'), t('automaticBackup'), t('fileSync'), t('secureSharing')],
            icon: <FaCloud />,
            popular: false,
            subscribed: false
          },
          {
            id: 6,
            name: t('databasePro'),
            description: t('professionalDatabaseManagement'),
            price: 39.99,
            features: [t('databaseManagement'), t('advancedQueries'), t('performanceOptimization'), t('dataBackup')],
            icon: <FaDatabase />,
            popular: false,
            subscribed: false
          }
        ]);
        
        setUserBalance(150.75);
        setLoading(false);
      } catch (error) {
        setError(t('error'));
        setLoading(false);
      }
    };
    fetchData();
  }, [t]);

  const handleSubscribe = (service) => {
    setSelectedService(service);
    setShowSubscribeModal(true);
  };

  const confirmSubscribe = async () => {
    if (!selectedService) return;
    
    try {
      // Placeholder for backend integration
      console.log('Subscribing to service:', selectedService);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setServices(prevServices =>
        prevServices.map(service =>
          service.id === selectedService.id
            ? { ...service, subscribed: true }
            : service
        )
      );
      
      // Update balance
      setUserBalance(prev => prev - selectedService.price);
      
      setShowSubscribeModal(false);
      setSelectedService(null);
      
    } catch (error) {
      setError(t('error'));
    }
  };

  const canSubscribe = (service) => {
    return !service.subscribed && userBalance >= service.price;
  };

  if (loading) {
    return (
      <div className="services-page modern-services">
        <div className="services-background">
          <div className="bg-shape shape-1"></div>
          <div className="bg-shape shape-2"></div>
          <div className="bg-shape shape-3"></div>
        </div>
        
        <Container>
          <Row className="justify-content-center min-vh-100 align-items-center">
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
    <div className="services-page modern-services">
      <div className="services-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>
      
      <Container>
        <Row className="mb-5">
          <Col>
            <div className="services-header">
              <div className="services-badge">
                <FaStar className="badge-icon" />
                <span>{t('premiumServices')}</span>
              </div>
              <h1 className="services-title">{t('services')}</h1>
              <div className="services-balance">
                <div className="balance-icon-wrapper">
                  <FaGem className="balance-icon" />
                </div>
                <div className="balance-info">
                  <div className="balance-label">{t('currentBalance')}</div>
                  <div className="balance-amount">${userBalance.toFixed(2)}</div>
                </div>
              </div>
              <p className="services-subtitle">
                {t('choosePerfectPlan')}
              </p>
            </div>
          </Col>
        </Row>
        
        {error && (
          <Row className="mb-4">
            <Col>
              <Alert variant="danger" className="services-alert">
                {error}
              </Alert>
            </Col>
          </Row>
        )}
        
        <Row>
          {services.map((service) => (
            <Col md={6} lg={4} className="mb-4" key={service.id}>
              <Card className={`service-card modern-service-card ${service.popular ? 'popular' : ''} ${service.subscribed ? 'subscribed' : ''}`}>
                {service.popular && (
                  <div className="popular-badge">
                    <Badge bg="warning">
                      <FaStar className="me-1" />
                      {t('mostPopular')}
                    </Badge>
                  </div>
                )}
                
                {service.subscribed && (
                  <div className="subscribed-badge">
                    <Badge bg="success">
                      <FaCheck className="me-1" />
                      {t('subscribed')}
                    </Badge>
                  </div>
                )}
                
                <Card.Body>
                  <div className="service-header">
                    <div className="service-icon-wrapper">
                      <div className="service-icon-bg">
                        {service.icon}
                      </div>
                    </div>
                    <Card.Title className="service-name">{service.name}</Card.Title>
                  </div>
                  
                  <Card.Text className="service-description">
                    {service.description}
                  </Card.Text>
                  
                  <div className="service-price">
                    <span className="price-amount">${service.price}</span>
                    <span className="price-period">/month</span>
                  </div>
                  
                  <div className="service-features">
                    <ul className="features-list">
                      {service.features.map((feature, index) => (
                        <li key={index}>
                          <FaCheck className="feature-check" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="service-actions">
                    {service.subscribed ? (
                      <Button variant="outline-success" className="service-btn" disabled>
                        <FaCheck className="me-2" />
                        {t('subscribed')}
                      </Button>
                    ) : userBalance < service.price ? (
                      <Button variant="outline-danger" className="service-btn" disabled>
                        <FaTimes className="me-2" />
                        {t('insufficientBalance')}
                      </Button>
                    ) : (
                      <Button 
                        variant={service.popular ? "warning" : "primary"}
                        className="service-btn"
                        onClick={() => handleSubscribe(service)}
                      >
                        <FaBolt className="me-2" />
                        {t('subscribe')}
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      
      {/* Subscribe Confirmation Modal */}
      <Modal show={showSubscribeModal} onHide={() => setShowSubscribeModal(false)} centered className="modern-modal">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            <FaRocket className="me-2" />
            {t('confirmSubscription')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedService && (
            <div className="modal-service-details">
              <div className="modal-service-icon">
                {selectedService.icon}
              </div>
              <h4>{selectedService.name}</h4>
              <div className="modal-price">
                <span className="price-amount">${selectedService.price}</span>
                <span className="price-period">/month</span>
              </div>
              
              <div className="balance-info">
                <div className="balance-row">
                  <span>{t('currentBalanceLabel')}</span>
                  <span className="balance-value">${userBalance.toFixed(2)}</span>
                </div>
                <div className="balance-row">
                  <span>{t('subscriptionCost')}</span>
                  <span className="cost-value">-${selectedService.price.toFixed(2)}</span>
                </div>
                <div className="balance-row total-row">
                  <span>{t('balanceAfterSubscription')}</span>
                  <span className="total-value">${(userBalance - selectedService.price).toFixed(2)}</span>
                </div>
              </div>
              
              <p className="modal-confirmation">
                {t('areYouSureSubscribe')}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSubscribeModal(false)}>
            {t('cancel')}
          </Button>
          <Button variant="primary" onClick={confirmSubscribe}>
            <FaBolt className="me-2" />
            {t('confirmSubscription')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Services;