import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { FaUsers, FaDollarSign, FaCalendar, FaSearch, FaFilter, FaDownload, FaEye } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/marketing-reports.css';

const MarketingReports = () => {
  const { t } = useLanguage();
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Placeholder for backend integration
    const fetchReports = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Placeholder data
        const mockReports = [
          {
            id: 1,
            userEmail: 'john.doe@email.com',
            signupDate: '2024-01-15',
            status: 'active',
            totalPaid: 150.00,
            commission: 30.00,
            lastPayment: '2024-01-20'
          },
          {
            id: 2,
            userEmail: 'jane.smith@email.com',
            signupDate: '2024-01-10',
            status: 'active',
            totalPaid: 299.99,
            commission: 60.00,
            lastPayment: '2024-01-25'
          },
          {
            id: 3,
            userEmail: 'mike.wilson@email.com',
            signupDate: '2024-01-08',
            status: 'inactive',
            totalPaid: 0.00,
            commission: 0.00,
            lastPayment: null
          },
          {
            id: 4,
            userEmail: 'sarah.johnson@email.com',
            signupDate: '2024-01-05',
            status: 'active',
            totalPaid: 450.00,
            commission: 90.00,
            lastPayment: '2024-01-28'
          },
          {
            id: 5,
            userEmail: 'david.brown@email.com',
            signupDate: '2024-01-03',
            status: 'active',
            totalPaid: 79.99,
            commission: 16.00,
            lastPayment: '2024-01-22'
          },
          {
            id: 6,
            userEmail: 'lisa.davis@email.com',
            signupDate: '2024-01-01',
            status: 'cancelled',
            totalPaid: 29.99,
            commission: 6.00,
            lastPayment: '2024-01-15'
          }
        ];
        
        setReports(mockReports);
        setFilteredReports(mockReports);
        setLoading(false);
      } catch (error) {
        setError('Failed to load reports');
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    // Filter reports based on search term and status
    let filtered = reports;
    
    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }
    
    setFilteredReports(filtered);
  }, [reports, searchTerm, statusFilter]);

  const getStatusBadge = (status) => {
    const variants = {
      active: 'success',
      inactive: 'warning',
      cancelled: 'danger'
    };
    
    const labels = {
      active: 'Active',
      inactive: 'Inactive',
      cancelled: 'Cancelled'
    };
    
    return (
      <Badge bg={variants[status] || 'secondary'}>
        {labels[status] || status}
      </Badge>
    );
  };

  const getTotalStats = () => {
    const totalReferred = reports.length;
    const activeUsers = reports.filter(r => r.status === 'active').length;
    const totalPaid = reports.reduce((sum, r) => sum + r.totalPaid, 0);
    const totalCommission = reports.reduce((sum, r) => sum + r.commission, 0);
    
    return { totalReferred, activeUsers, totalPaid, totalCommission };
  };

  const { totalReferred, activeUsers, totalPaid, totalCommission } = getTotalStats();

  const exportToCSV = () => {
    const headers = ['User Email', 'Signup Date', 'Status', 'Total Paid', 'Commission', 'Last Payment'];
    const csvContent = [
      headers.join(','),
      ...filteredReports.map(report => [
        report.userEmail,
        report.signupDate,
        report.status,
        report.totalPaid,
        report.commission,
        report.lastPayment || 'N/A'
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
      <div className="marketing-reports-page">
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
    <div className="marketing-reports-page">
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="reports-title">Marketing Reports</h1>
            <p className="reports-subtitle">
              Detailed report of all referred users and their payment activity
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
                  <FaUsers className="summary-icon" />
                  <span>Total Referred</span>
                </div>
                <div className="summary-value">{totalReferred}</div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="summary-card">
              <Card.Body>
                <div className="summary-header">
                  <FaUsers className="summary-icon active-icon" />
                  <span>Active Users</span>
                </div>
                <div className="summary-value">{activeUsers}</div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="summary-card">
              <Card.Body>
                <div className="summary-header">
                  <FaDollarSign className="summary-icon" />
                  <span>Total Paid</span>
                </div>
                <div className="summary-value">${totalPaid.toFixed(2)}</div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="summary-card">
              <Card.Body>
                <div className="summary-header">
                  <FaDollarSign className="summary-icon commission-icon" />
                  <span>Total Commission</span>
                </div>
                <div className="summary-value">${totalCommission.toFixed(2)}</div>
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
                placeholder="Search by email..."
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
                <option value="inactive">Inactive</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>

        {/* Reports Table */}
        <Row className="mb-4">
          <Col>
            <Card className="reports-table-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaCalendar className="me-2" />
                    Referred Users Report
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
                        <th>User Email</th>
                        <th>Signup Date</th>
                        <th>Status</th>
                        <th>Total Paid</th>
                        <th>Commission</th>
                        <th>Last Payment</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReports.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center">
                            No records found
                          </td>
                        </tr>
                      ) : (
                        filteredReports.map((report) => (
                          <tr key={report.id}>
                            <td>{report.userEmail}</td>
                            <td>{report.signupDate}</td>
                            <td>{getStatusBadge(report.status)}</td>
                            <td>${report.totalPaid.toFixed(2)}</td>
                            <td>${report.commission.toFixed(2)}</td>
                            <td>{report.lastPayment || 'N/A'}</td>
                            <td>
                              <Button variant="outline-primary" size="sm">
                                <FaEye className="me-1" /> View
                              </Button>
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
                Showing {filteredReports.length} of {reports.length} records
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MarketingReports;