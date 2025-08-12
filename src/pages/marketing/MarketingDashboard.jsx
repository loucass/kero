import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { FaUsers, FaDollarSign, FaLink, FaChartLine, FaCopy, FaExternalLinkAlt, FaEye, FaCalendar, FaTrophy } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/marketing-dashboard.css';

const MarketingDashboard = () => {
  const { t } = useLanguage();
  const [dashboardData, setDashboardData] = useState({
    totalReferred: 0,
    availableEarnings: 0,
    referralLink: '',
    paidReferrals: 0,
    loading: true,
    error: ''
  });

  useEffect(() => {
    // Placeholder for backend integration
    const fetchDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Placeholder data
        setDashboardData({
          totalReferred: 45,
          availableEarnings: 1250.50,
          referralLink: 'https://aiplatform.com/signup?ref=MARKET123',
          paidReferrals: 12,
          loading: false,
          error: ''
        });
      } catch (error) {
        setDashboardData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load dashboard data'
        }));
      }
    };

    fetchDashboardData();
  }, []);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Referral link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const { totalReferred, availableEarnings, referralLink, paidReferrals, loading, error } = dashboardData;

  if (loading) {
    return (
      <div className="marketing-dashboard-page">
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
    <div className="marketing-dashboard-page">
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="dashboard-title">Marketing Dashboard</h1>
            <p className="dashboard-subtitle">
              Track your referral performance and earnings
            </p>
          </Col>
        </Row>

        {error && (
          <Row className="mb-4">
            <Col>
              <Alert variant="danger">{error}</Alert>
            </Col>
          </Row>
        )}

        {/* Stats Cards */}
        <Row className="mb-4">
          <Col md={6} lg={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-header">
                  <FaUsers className="stat-icon users-icon" />
                  <span className="stat-label">{t('totalReferred')}</span>
                </div>
                <div className="stat-value">{totalReferred}</div>
                <div className="stat-change positive">
                  <FaChartLine className="me-1" />
                  +12% this month
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-header">
                  <FaDollarSign className="stat-icon earnings-icon" />
                  <span className="stat-label">{t('availableEarnings')}</span>
                </div>
                <div className="stat-value">${availableEarnings.toFixed(2)}</div>
                <div className="stat-change positive">
                  <FaChartLine className="me-1" />
                  +8% this month
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-header">
                  <FaLink className="stat-icon link-icon" />
                  <span className="stat-label">{t('referralLink')}</span>
                </div>
                <div className="stat-value-small">Active</div>
                <div className="stat-actions">
                  <Button variant="outline-primary" size="sm" onClick={() => copyToClipboard(referralLink)}>
                    <FaCopy className="me-1" /> Copy
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-header">
                  <FaTrophy className="stat-icon paid-icon" />
                  <span className="stat-label">{t('paidReferrals')}</span>
                </div>
                <div className="stat-value">{paidReferrals}</div>
                <div className="stat-change positive">
                  <FaChartLine className="me-1" />
                  +3 this week
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Referral Link Section */}
        <Row className="mb-4">
          <Col>
            <Card className="referral-card">
              <Card.Header>
                <h5 className="mb-0">
                  <FaLink className="me-2" />
                  Your Referral Link
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="referral-link-container">
                  <div className="referral-link-display">
                    <span className="referral-link-text">{referralLink}</span>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => copyToClipboard(referralLink)}
                    >
                      <FaCopy className="me-1" /> Copy Link
                    </Button>
                  </div>
                  <div className="referral-stats">
                    <div className="stat-item">
                      <span className="stat-number">{totalReferred}</span>
                      <span className="stat-text">Total Clicks</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{Math.round((paidReferrals / totalReferred) * 100)}%</span>
                      <span className="stat-text">Conversion Rate</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">${(availableEarnings / paidReferrals || 0).toFixed(2)}</span>
                      <span className="stat-text">Avg. Commission</span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Activity */}
        <Row className="mb-4">
          <Col lg={8}>
            <Card className="activity-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaCalendar className="me-2" />
                    Recent Activity
                  </h5>
                  <Button variant="outline-primary" size="sm" as={Link} to="/marketing/reports">
                    View All Reports <FaExternalLinkAlt className="ms-1" />
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon new-referral">
                      <FaUsers />
                    </div>
                    <div className="activity-content">
                      <h6>New Referral</h6>
                      <p>john.doe@email.com signed up using your referral link</p>
                      <small className="text-muted">2 hours ago</small>
                    </div>
                  </div>
                  
                  <div className="activity-item">
                    <div className="activity-icon payment">
                      <FaDollarSign />
                    </div>
                    <div className="activity-content">
                      <h6>Commission Earned</h6>
                      <p>$25.00 commission from jane.smith@email.com subscription</p>
                      <small className="text-muted">1 day ago</small>
                    </div>
                  </div>
                  
                  <div className="activity-item">
                    <div className="activity-icon conversion">
                      <FaTrophy />
                    </div>
                    <div className="activity-content">
                      <h6>Successful Conversion</h6>
                      <p>mike.wilson@email.com upgraded to premium plan</p>
                      <small className="text-muted">3 days ago</small>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="tips-card">
              <Card.Header>
                <h5 className="mb-0">
                  <FaEye className="me-2" />
                  Marketing Tips
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="tips-list">
                  <div className="tip-item">
                    <h6>Share on Social Media</h6>
                    <p>Post your referral link on LinkedIn, Twitter, and Facebook to reach more people.</p>
                  </div>
                  
                  <div className="tip-item">
                    <h6>Create Content</h6>
                    <p>Write blog posts or create videos about AI platform benefits and include your link.</p>
                  </div>
                  
                  <div className="tip-item">
                    <h6>Email Marketing</h6>
                    <p>Send personalized emails to your network with your referral link.</p>
                  </div>
                  
                  <div className="tip-item">
                    <h6>Track Performance</h6>
                    <p>Monitor your referral stats to understand what works best.</p>
                  </div>
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
                <FaLink className="action-icon mb-3" />
                <h6>Share Link</h6>
                <p className="text-muted small">Share on social media</p>
                <Button variant="outline-primary" size="sm">
                  Share Now
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="action-card">
              <Card.Body className="text-center">
                <FaChartLine className="action-icon mb-3" />
                <h6>Analytics</h6>
                <p className="text-muted small">View detailed stats</p>
                <Button variant="outline-primary" size="sm" as={Link} to="/marketing/reports">
                  View Reports
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="action-card">
              <Card.Body className="text-center">
                <FaDollarSign className="action-icon mb-3" />
                <h6>Withdraw</h6>
                <p className="text-muted small">Request payout</p>
                <Button variant="outline-primary" size="sm">
                  Withdraw Funds
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="action-card">
              <Card.Body className="text-center">
                <FaUsers className="action-icon mb-3" />
                <h6>Resources</h6>
                <p className="text-muted small">Marketing materials</p>
                <Button variant="outline-primary" size="sm">
                  Get Resources
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MarketingDashboard;