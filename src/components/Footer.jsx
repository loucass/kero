import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/footer.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer mt-auto py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>AI Platform</h5>
            <p className="text-muted">
              Experience the future of AI-powered services with our innovative platform.
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>{t('features')}</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted">Smart Analytics</a></li>
              <li><a href="#" className="text-muted">Real-time Processing</a></li>
              <li><a href="#" className="text-muted">Secure Platform</a></li>
              <li><a href="#" className="text-muted">24/7 Support</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>{t('contact')}</h5>
            <ul className="list-unstyled text-muted">
              <li>Email: support@aiplatform.com</li>
              <li>Phone: +1 234 567 8900</li>
              <li>Address: 123 AI Street, Tech City</li>
            </ul>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            <p className="text-muted mb-0">
              &copy; 2024 AI Platform. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;