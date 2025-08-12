import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Accordion } from 'react-bootstrap';
import { FaHandshake, FaUsers, FaChartLine, FaShieldAlt, FaGlobe, FaClock, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/marketing-user-landing.css';

const MarketingUserLanding = () => {
  const { t } = useLanguage();

  const policies = [
    {
      icon: <FaHandshake className="policy-icon" />,
      title: 'Partnership Agreement',
      content: 'We believe in building long-term partnerships with our marketing affiliates. Our agreement is designed to be fair, transparent, and mutually beneficial. You earn commissions for every referred user who becomes a paying customer.'
    },
    {
      icon: <FaUsers className="policy-icon" />,
      title: 'User Privacy Policy',
      content: 'We strictly protect user privacy and data. All marketing activities must comply with our privacy guidelines and applicable data protection regulations. User information is never shared with third parties without explicit consent.'
    },
    {
      icon: <FaChartLine className="policy-icon" />,
      title: 'Performance Tracking',
      content: 'Real-time tracking dashboard shows your referral performance, earnings, and user engagement metrics. Transparent reporting ensures you always know how your marketing efforts are performing.'
    },
    {
      icon: <FaShieldAlt className="policy-icon" />,
      title: 'Compliance Requirements',
      content: 'All marketing materials must be truthful, accurate, and compliant with advertising standards. We provide guidelines and approval processes to ensure all promotional content meets our quality standards.'
    },
    {
      icon: <FaGlobe className="policy-icon" />,
      title: 'Global Reach',
      content: 'Our platform serves users worldwide. Marketing partners can target specific regions or operate globally, with localized support and multi-language capabilities.'
    },
    {
      icon: <FaClock className="policy-icon" />,
      title: 'Payment Terms',
      content: 'Commission payments are processed monthly with a minimum threshold of $100. Payments are made via secure methods with detailed transaction reports and tax documentation.'
    }
  ];

  const benefits = [
    { icon: <FaMoneyBillWave />, title: 'Competitive Commissions', description: 'Earn up to 30% commission on all referred user payments' },
    { icon: <FaChartLine />, title: 'Real-time Analytics', description: 'Track your performance with detailed analytics and reports' },
    { icon: <FaUsers />, title: 'Dedicated Support', description: 'Get personalized support from our marketing team' },
    { icon: <FaCheckCircle />, title: 'Reliable Tracking', description: 'Advanced tracking system ensures accurate commission calculation' }
  ];

  return (
    <div className="marketing-landing">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title float-animation">
                  Marketing Partner Portal
                </h1>
                <p className="hero-subtitle pulse-animation">
                  Join our marketing partnership program and earn competitive commissions while promoting cutting-edge AI solutions
                </p>
                <div className="hero-buttons">
                  <Button as={Link} to="/marketing/signup" size="lg" className="hero-btn-primary me-3">
                    Become a Partner
                  </Button>
                  <Button as={Link} to="/marketing/login" size="lg" variant="outline-light" className="hero-btn-secondary">
                    Partner Login
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6} className="hero-visual">
              <div className="hero-animation">
                <div className="partnership-visual">
                  <div className="central-hub glow-animation">
                    <FaHandshake className="hub-icon" />
                  </div>
                  <div className="orbit-nodes">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="orbit-node" style={{ 
                        animationDelay: `${i * 0.5}s`,
                        transform: `rotate(${i * 60}deg) translateX(120px) rotate(-${i * 60}deg)`
                      }}>
                        <FaUsers className="node-icon" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Why Partner With Us?</h2>
              <p className="section-subtitle">
                Discover the advantages of joining our marketing partnership program
              </p>
            </Col>
          </Row>
          <Row>
            {benefits.map((benefit, index) => (
              <Col md={6} lg={3} className="mb-4" key={index}>
                <Card className="benefit-card h-100">
                  <Card.Body className="text-center">
                    <div className="benefit-icon-wrapper">
                      {benefit.icon}
                    </div>
                    <Card.Title className="benefit-title">{benefit.title}</Card.Title>
                    <Card.Text className="benefit-description">
                      {benefit.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Policies Section */}
      <section className="policies-section">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Company Policies</h2>
              <p className="section-subtitle">
                Our commitment to transparency, ethics, and partnership excellence
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg={8} className="mx-auto">
              <Accordion className="policies-accordion">
                {policies.map((policy, index) => (
                  <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header>
                      <div className="policy-header">
                        <span className="policy-icon-small">{policy.icon}</span>
                        <span className="policy-title">{policy.title}</span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <p className="policy-content">{policy.content}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <Row className="text-center">
            <Col>
              <div className="cta-content">
                <h2 className="cta-title">Ready to Start Earning?</h2>
                <p className="cta-subtitle">
                  Join our network of successful marketing partners and start earning commissions today.
                </p>
                <Button as={Link} to="/marketing/signup" size="lg" className="cta-btn">
                  Apply Now
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default MarketingUserLanding;