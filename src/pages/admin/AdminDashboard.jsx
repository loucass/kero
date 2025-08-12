import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { FaUsers, FaDollarSign, FaChartLine, FaUserFriends, FaMoneyBillWave, FaWallet, FaEye, FaCog, FaBell, FaExclamationTriangle } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/admin-dashboard.css';

const AdminDashboard = () => {
  const { t } = useLanguage();
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    payingUsers: 0,
    marketingUsers: 0,
    totalPaid: 0,
    marketingBudget: 0,
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
          totalUsers: 1542,
          payingUsers: 342,
          marketingUsers: 45,
          totalPaid: 45678.50,
          marketingBudget: 12500.00,
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

  const { totalUsers, payingUsers, marketingUsers, totalPaid, marketingBudget, loading, error } = dashboardData;

  const getPercentage = (part, total) => {
    return total > 0 ? Math.round((part / total) * 100) : 0;
  };

  const recentActivity = [
    {
      id: 1,
      type: 'user_signup',
      message: 'New user registration: john.doe@email.com',
      time: '5 minutes ago',
      icon: <FaUsers className="activity-icon user-icon" />
    },
    {
      id: 2,
      type: 'payment',
      message: 'Payment received: $29.99 from jane.smith@email.com',
      time: '15 minutes ago',
      icon: <FaDollarSign className="activity-icon payment-icon" />
    },
    {
      id: 3,
      type: 'marketing',
      message: 'New marketing partner application received',
      time: '1 hour ago',
      icon: <FaUserFriends className="activity-icon marketing-icon" />
    },
    {
      id: 4,
      type: 'system',
      message: 'System backup completed successfully',
      time: '2 hours ago',
      icon: <FaCog className="activity-icon system-icon" />
    },
    {
      id: 5,
      type: 'alert',
      message: 'High server load detected on API endpoints',
      time: '3 hours ago',
      icon: <FaExclamationTriangle className="activity-icon alert-icon" />
    }
  ];

  if (loading) {
    return (
      <div className="admin-dashboard-page">
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
    <div className="admin-dashboard-page">
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <p className="dashboard-subtitle">
              Overview of platform statistics and system status
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

        {/* Main Stats Cards */}
        <Row className="mb-4">
          <Col md={6} lg={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-header">
                  <FaUsers className="stat-icon users-icon" />
                  <span className="stat-label">{t('totalUsers')}</span>
                </div>
                <div className="stat-value">{totalUsers.toLocaleString()}</div>
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
                  <FaDollarSign className="stat-icon paying-icon" />
                  <span className="stat-label">{t('payingUsers')}</span>
                </div>
                <div className="stat-value">{payingUsers.toLocaleString()}</div>
                <div className="stat-subtitle">
                  {getPercentage(payingUsers, totalUsers)}% conversion rate
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-header">
                  <FaUserFriends className="stat-icon marketing-icon" />
                  <span className="stat-label">{t('marketingUsers')}</span>
                </div>
                <div className="stat-value">{marketingUsers.toLocaleString()}</div>
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
                  <FaMoneyBillWave className="stat-icon revenue-icon" />
                  <span className="stat-label">{t('totalPaid')}</span>
                </div>
                <div className="stat-value">${totalPaid.toLocaleString()}</div>
                <div className="stat-change positive">
                  <FaChartLine className="me-1" />
                  +15% this month
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Budget and Revenue Overview */}
        <Row className="mb-4">
          <Col lg={8}>
            <Card className="overview-card">
              <Card.Header>
                <h5 className="mb-0">
                  <FaChartLine className="me-2" />
                  Revenue Overview
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <div className="metric-item">
                      <div className="metric-label">Total Revenue</div>
                      <div className="metric-value">${totalPaid.toLocaleString()}</div>
                      <div className="metric-change positive">+15% vs last month</div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="metric-item">
                      <div className="metric-label">Average Revenue Per User</div>
                      <div className="metric-value">${(totalPaid / payingUsers || 0).toFixed(2)}</div>
                      <div className="metric-change positive">+8% vs last month</div>
                    </div>
                  </Col>
                </Row>
                <div className="chart-placeholder">
                  <div className="chart-text">
                    <FaChartLine className="chart-icon" />
                    <p>Revenue chart would be displayed here</p>
                    <small>Integration with charting library required</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="budget-card">
              <Card.Header>
                <h5 className="mb-0">
                  <FaWallet className="me-2" />
                  {t('marketingBudget')}
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="budget-amount">
                  ${marketingBudget.toLocaleString()}
                </div>
                <div className="budget-info">
                  <div className="budget-item">
                    <span>Available</span>
                    <span>${marketingBudget.toLocaleString()}</span>
                  </div>
                  <div className="budget-item">
                    <span>Allocated</span>
                    <span>$0.00</span>
                  </div>
                  <div className="budget-item">
                    <span>Remaining</span>
                    <span>${marketingBudget.toLocaleString()}</span>
                  </div>
                </div>
                <Button variant="outline-primary" size="sm" className="w-100">
                  Manage Budget
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Activity and Quick Actions */}
        <Row className="mb-4">
          <Col lg={8}>
            <Card className="activity-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaBell className="me-2" />
                    Recent Activity
                  </h5>
                  <Badge bg="primary">Live</Badge>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="activity-list">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-icon-wrapper">
                        {activity.icon}
                      </div>
                      <div className="activity-content">
                        <h6>{activity.message}</h6>
                        <small className="text-muted">{activity.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="actions-card">
              <Card.Header>
                <h5 className="mb-0">
                  <FaCog className="me-2" />
                  Quick Actions
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="quick-actions">
                  <Button variant="outline-primary" className="action-btn w-100 mb-2" as={Link} to="/admin/user-reports">
                    <FaUsers className="me-2" />
                    User Reports
                  </Button>
                  <Button variant="outline-primary" className="action-btn w-100 mb-2" as={Link} to="/admin/marketing-reports">
                    <FaUserFriends className="me-2" />
                    Marketing Reports
                  </Button>
                  <Button variant="outline-primary" className="action-btn w-100 mb-2">
                    <FaMoneyBillWave className="me-2" />
                    Manage Payments
                  </Button>
                  <Button variant="outline-primary" className="action-btn w-100 mb-2">
                    <FaBell className="me-2" />
                    System Alerts
                  </Button>
                  <Button variant="outline-primary" className="action-btn w-100">
                    <FaCog className="me-2" />
                    System Settings
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* System Status */}
        <Row>
          <Col>
            <Card className="status-card">
              <Card.Header>
                <h5 className="mb-0">
                  <FaEye className="me-2" />
                  System Status
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={3}>
                    <div className="status-item">
                      <div className="status-indicator online"></div>
                      <div className="status-info">
                        <h6>API Server</h6>
                        <small>Online • 99.9% uptime</small>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="status-item">
                      <div className="status-indicator online"></div>
                      <div className="status-info">
                        <h6>Database</h6>
                        <small>Online • Responsive</small>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="status-item">
                      <div className="status-indicator warning"></div>
                      <div className="status-info">
                        <h6>Payment Gateway</h6>
                        <small>High load • Monitoring</small>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="status-item">
                      <div className="status-indicator online"></div>
                      <div className="status-info">
                        <h6>CDN</h6>
                        <small>Online • Fast</small>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;