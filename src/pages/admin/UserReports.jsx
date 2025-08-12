import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { FaUsers, FaSearch, FaFilter, FaDownload, FaEye, FaEdit, FaTrash, FaCalendar, FaDollarSign } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/admin-reports.css';

const UserReports = () => {
  const { t } = useLanguage();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');

  useEffect(() => {
    // Placeholder for backend integration
    const fetchUsers = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Placeholder data
        const mockUsers = [
          {
            id: 1,
            email: 'john.doe@email.com',
            name: 'John Doe',
            signupDate: '2024-01-15',
            status: 'active',
            plan: 'Professional AI',
            balance: 150.75,
            totalSpent: 299.99,
            lastLogin: '2024-01-28'
          },
          {
            id: 2,
            email: 'jane.smith@email.com',
            name: 'Jane Smith',
            signupDate: '2024-01-10',
            status: 'active',
            plan: 'Enterprise Suite',
            balance: 500.00,
            totalSpent: 599.99,
            lastLogin: '2024-01-27'
          },
          {
            id: 3,
            email: 'mike.wilson@email.com',
            name: 'Mike Wilson',
            signupDate: '2024-01-08',
            status: 'inactive',
            plan: 'Basic Analytics',
            balance: 25.50,
            totalSpent: 29.99,
            lastLogin: '2024-01-20'
          },
          {
            id: 4,
            email: 'sarah.johnson@email.com',
            name: 'Sarah Johnson',
            signupDate: '2024-01-05',
            status: 'active',
            plan: 'Professional AI',
            balance: 200.00,
            totalSpent: 329.99,
            lastLogin: '2024-01-28'
          },
          {
            id: 5,
            email: 'david.brown@email.com',
            name: 'David Brown',
            signupDate: '2024-01-03',
            status: 'active',
            plan: 'Security Pro',
            balance: 75.25,
            totalSpent: 79.99,
            lastLogin: '2024-01-26'
          },
          {
            id: 6,
            email: 'lisa.davis@email.com',
            name: 'Lisa Davis',
            signupDate: '2024-01-01',
            status: 'cancelled',
            plan: 'Basic Analytics',
            balance: 0.00,
            totalSpent: 29.99,
            lastLogin: '2024-01-15'
          }
        ];
        
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
        setLoading(false);
      } catch (error) {
        setError('Failed to load user data');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on search term and filters
    let filtered = users;
    
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }
    
    if (planFilter !== 'all') {
      filtered = filtered.filter(user => user.plan === planFilter);
    }
    
    setFilteredUsers(filtered);
  }, [users, searchTerm, statusFilter, planFilter]);

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

  const getPlanBadge = (plan) => {
    const variants = {
      'Basic Analytics': 'primary',
      'Professional AI': 'warning',
      'Enterprise Suite': 'success',
      'Security Pro': 'info'
    };
    
    return (
      <Badge bg={variants[plan] || 'secondary'}>
        {plan}
      </Badge>
    );
  };

  const getTotalStats = () => {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const totalRevenue = users.reduce((sum, u) => sum + u.totalSpent, 0);
    const avgBalance = users.reduce((sum, u) => sum + u.balance, 0) / users.length;
    
    return { totalUsers, activeUsers, totalRevenue, avgBalance };
  };

  const { totalUsers, activeUsers, totalRevenue, avgBalance } = getTotalStats();

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Signup Date', 'Status', 'Plan', 'Balance', 'Total Spent', 'Last Login'];
    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.signupDate,
        user.status,
        user.plan,
        user.balance,
        user.totalSpent,
        user.lastLogin
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user-reports.csv';
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
            <h1 className="reports-title">User Reports</h1>
            <p className="reports-subtitle">
              Comprehensive report of all registered users and their activity
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
                  <span>Total Users</span>
                </div>
                <div className="summary-value">{totalUsers.toLocaleString()}</div>
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
                <div className="summary-value">{activeUsers.toLocaleString()}</div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="summary-card">
              <Card.Body>
                <div className="summary-header">
                  <FaDollarSign className="summary-icon" />
                  <span>Total Revenue</span>
                </div>
                <div className="summary-value">${totalRevenue.toLocaleString()}</div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="summary-card">
              <Card.Body>
                <div className="summary-header">
                  <FaDollarSign className="summary-icon balance-icon" />
                  <span>Avg Balance</span>
                </div>
                <div className="summary-value">${avgBalance.toFixed(2)}</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Filters and Search */}
        <Row className="mb-4">
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by name or email..."
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
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text>
                <FaFilter />
              </InputGroup.Text>
              <Form.Select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
              >
                <option value="all">All Plans</option>
                <option value="Basic Analytics">Basic Analytics</option>
                <option value="Professional AI">Professional AI</option>
                <option value="Enterprise Suite">Enterprise Suite</option>
                <option value="Security Pro">Security Pro</option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>

        {/* Users Table */}
        <Row className="mb-4">
          <Col>
            <Card className="reports-table-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaUsers className="me-2" />
                    User Management
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
                        <th>Signup Date</th>
                        <th>Status</th>
                        <th>Plan</th>
                        <th>Balance</th>
                        <th>Total Spent</th>
                        <th>Last Login</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="text-center">
                            No records found
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((user) => (
                          <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.signupDate}</td>
                            <td>{getStatusBadge(user.status)}</td>
                            <td>{getPlanBadge(user.plan)}</td>
                            <td>${user.balance.toFixed(2)}</td>
                            <td>${user.totalSpent.toFixed(2)}</td>
                            <td>{user.lastLogin}</td>
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
                Showing {filteredUsers.length} of {users.length} records
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserReports;