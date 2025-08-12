import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { FaUserFriends, FaSearch, FaFilter, FaDownload, FaEye, FaEdit, FaTrash, FaDollarSign, FaChartLine, FaUsers } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/admin-reports.css';

const MarketingReports = () => {
  const { t } = useLanguage();
  const [marketingUsers, setMarketingUsers] = useState([]);
  const [filteredMarketingUsers, setFilteredMarketingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Placeholder for backend integration
    const fetchMarketingUsers = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Placeholder data
        const mockMarketingUsers = [
          {
            id: 1,
            name: 'Alex Johnson',
            email: 'alex.j@marketing.com',
            company: 'Digital Marketing Pro',
            signupDate: '2024-01-10',
            status: 'active',
            totalReferred: 45,
            paidReferrals: 12,
            totalCommission: 1250.50,
            availableEarnings: 850.00,
            lastActivity: '2024-01-28'
          },
          {
            id: 2,
            name: 'Sarah Williams',
            email: 'sarah.w@socialboost.com',
            company: 'Social Boost Agency',
            signupDate: '2024-01-08',
            status: 'active',
            totalReferred: 32,
            paidReferrals: 8,
            totalCommission: 980.00,
            availableEarnings: 620.00,
            lastActivity: '2024-01-27'
          },
          {
            id: 3,
            name: 'Mike Chen',
            email: 'mike.chen@techmarketing.io',
            company: 'Tech Marketing Solutions',
            signupDate: '2024-01-05',
            status: 'pending',
            totalReferred: 0,
            paidReferrals: 0,
            totalCommission: 0.00,
            availableEarnings: 0.00,
            lastActivity: '2024-01-25'
          },
          {
            id: 4,
            name: 'Emily Rodriguez',
            email: 'emily.r@brandbuilders.com',
            company: 'Brand Builders Inc',
            signupDate: '2024-01-03',
            status: 'active',
            totalReferred: 28,
            paidReferrals: 15,
            totalCommission: 1450.75,
            availableEarnings: 1100.25,
            lastActivity: '2024-01-28'
          },
          {
            id: 5,
            name: 'David Kim',
            email: 'david.kim@growthhackers.com',
            company: 'Growth Hackers Ltd',
            signupDate: '2024-01-01',
            status: 'suspended',
            totalReferred: 18,
            paidReferrals: 5,
            totalCommission: 420.00,
            availableEarnings: 320.00,
            lastActivity: '2024-01-20'
          }
        ];
        
        setMarketingUsers(mockMarketingUsers);
        setFilteredMarketingUsers(mockMarketingUsers);
        setLoading(false);
      } catch (error) {
        setError('Failed to load marketing user data');
        setLoading(false);
      }
    };

    fetchMarketingUsers();
  }, []);

  useEffect(() => {
    // Filter marketing users based on search term and status
    let filtered = marketingUsers;
    
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }
    
    setFilteredMarketingUsers(filtered);
  }, [marketingUsers, searchTerm, statusFilter]);

  const getStatusBadge = (status) => {
    const variants = {
      active: 'success',
      pending: 'warning',
      suspended: 'danger'
    };
    
    const labels = {
      active: 'Active',
      pending: 'Pending',
      suspended: 'Suspended'
    };
    
    return (
      <Badge bg={variants[status] || 'secondary'}>
        {labels[status] || status}
      </Badge>
    );
  };

  const getTotalStats = () => {
    const totalMarketingUsers = marketingUsers.length;
    const activeMarketingUsers = marketingUsers.filter(u => u.status === 'active').length;
    const totalReferred = marketingUsers.reduce((sum, u) => sum + u.totalReferred, 0);
    const totalCommission = marketingUsers.reduce((sum, u) => sum + u.totalCommission, 0);
    const availableEarnings = marketingUsers.reduce((sum, u) => sum + u.availableEarnings, 0);
    
    return { totalMarketingUsers, activeMarketingUsers, totalReferred, totalCommission, availableEarnings };
  };

  const { totalMarketingUsers, activeMarketingUsers, totalReferred, totalCommission, availableEarnings } = getTotalStats();

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Company', 'Signup Date', 'Status', 'Total Referred', 'Paid Referrals', 'Total Commission', 'Available Earnings', 'Last Activity'];
    const csvContent = [
      headers.join(','),
      ...filteredMarketingUsers.map(user => [
        user.name,
        user.email,
        user.company,
        user.signupDate,
        user.status,
        user.totalReferred,
        user.paidReferrals,
        user.totalCommission,
        user.availableEarnings,
        user.lastActivity
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'marketing-reports.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="admin-reports-page">
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
    <div className="admin-reports-page">
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="reports-title">Marketing Reports</h1>
            <p className="reports-subtitle">
              Detailed report of all marketing partners and their performance
            </p>
          </Col>
        </Row>

        {error && (
          <Row className="mb-4">
            <Col>
              <div className="alert alert-danger">{error}</div>
            </Col>
          </Row>
        )}

        {/* Summary Stats */}
        <Row className="mb-4">
          <Col md={6} lg={3}>
            <Card className="summary-card">
              <Card.Body>
                <div className="summary-header">
                  <FaUserFriends className="summary-icon" />
                  <span>Marketing Partners</span>
                </div>
                <div className="summary-value">{totalMarketingUsers.toLocaleString()}</div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="summary-card">
              <Card.Body>
                <div className="summary-header">
                  <FaUserFriends className="summary-icon active-icon" />
                  <span>Active Partners</span>
                </div>
                <div className="summary-value">{activeMarketingUsers.toLocaleString()}</div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="summary-card">
              <Card.Body>
                <div className="summary-header">
                  <FaUsers className="summary-icon" />
                  <span>Total Referred</span>
                </div>
                <div className="summary-value">{totalReferred.toLocaleString()}</div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="summary-card">
              <Card.Body>
                <div className="summary-header">
                  <FaDollarSign className="summary-icon" />
                  <span>Total Commission</span>
                </div>
                <div className="summary-value">${totalCommission.toLocaleString()}</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Additional Stats */}
        <Row className="mb-4">
          <Col md={6}>
            <Card className="overview-card">
              <Card.Header>
                <h5 className="mb-0">
                  <FaChartLine className="me-2" />
                  Performance Overview
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <div className="metric-item">
                      <div className="metric-label">Available Earnings</div>
                      <div className="metric-value">${availableEarnings.toLocaleString()}</div>
                      <div className="metric-change positive">Ready for payout</div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="metric-item">
                      <div className="metric-label">Avg. Commission per Partner</div>
                      <div className="metric-value">${(totalCommission / activeMarketingUsers || 0).toFixed(2)}</div>
                      <div className="metric-change positive">+12% vs last month</div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="overview-card">
              <Card.Header>
                <h5 className="mb-0">
                  <FaUsers className="me-2" />
                  Referral Statistics
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <div className="metric-item">
                      <div className="metric-label">Conversion Rate</div>
                      <div className="metric-value">
                        {totalReferred > 0 ? Math.round((marketingUsers.reduce((sum, u) => sum + u.paidReferrals, 0) / totalReferred) * 100) : 0}%
                      </div>
                      <div className="metric-change positive">Above average</div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="metric-item">
                      <div className="metric-label">Avg. Referrals per Partner</div>
                      <div className="metric-value">
                        {(totalReferred / activeMarketingUsers || 0).toFixed(1)}
                      </div>
                      <div className="metric-change positive">Growing</div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Filters and Search */}
        <Row className="mb-4">
          <Col md={8}>
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text>
                <FaFilter />
              </InputGroup.Text>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>

        {/* Marketing Users Table */}
        <Row className="mb-4">
          <Col>
            <Card className="reports-table-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaUserFriends className="me-2" />
                    Marketing Partners
                  </h5>
                  <Button variant="outline-primary" size="sm" onClick={exportToCSV}>
                    <FaDownload className="me-1" /> Export CSV
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Total Referred</th>
                        <th>Paid Referrals</th>
                        <th>Total Commission</th>
                        <th>Available Earnings</th>
                        <th>Last Activity</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMarketingUsers.length === 0 ? (
                        <tr>
                          <td colSpan="10" className="text-center">
                            No records found
                          </td>
                        </tr>
                      ) : (
                        filteredMarketingUsers.map((user) => (
                          <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.company}</td>
                            <td>{getStatusBadge(user.status)}</td>
                            <td>{user.totalReferred}</td>
                            <td>{user.paidReferrals}</td>
                            <td>${user.totalCommission.toFixed(2)}</td>
                            <td>${user.availableEarnings.toFixed(2)}</td>
                            <td>{user.lastActivity}</td>
                            <td>
                              <div className="action-buttons">
                                <Button variant="outline-primary" size="sm" className="me-1">
                                  <FaEye />
                                </Button>
                                <Button variant="outline-secondary" size="sm" className="me-1">
                                  <FaEdit />
                                </Button>
                                <Button variant="outline-danger" size="sm">
                                  <FaTrash />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Pagination Info */}
        <Row>
          <Col>
            <div className="pagination-info">
              <p className="mb-0">
                Showing {filteredMarketingUsers.length} of {marketingUsers.length} records
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MarketingReports;