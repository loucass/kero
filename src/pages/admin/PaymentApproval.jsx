import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Modal, Form } from 'react-bootstrap';
import { FaDollarSign, FaCheck, FaTimes, FaEye, FaSearch, FaFilter, FaClock, FaUser, FaPhone, FaImage } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/payment-approval.css';

const PaymentApproval = () => {
  const { t } = useLanguage();
  const [paymentRequests, setPaymentRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPaymentRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [paymentRequests, statusFilter, searchTerm]);

  const fetchPaymentRequests = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockRequests = [
        {
          id: '1',
          userId: 'user1',
          userName: 'John Doe',
          userEmail: 'john.doe@email.com',
          amount: 50.00,
          phoneNumber: '+1 234 567 8900',
          screenshot: 'https://picsum.photos/seed/payment1/400/300.jpg',
          status: 'pending',
          createdAt: '2024-01-15T10:30:00Z',
          adminNote: ''
        },
        {
          id: '2',
          userId: 'user2',
          userName: 'Jane Smith',
          userEmail: 'jane.smith@email.com',
          amount: 100.00,
          phoneNumber: '+1 234 567 8901',
          screenshot: 'https://picsum.photos/seed/payment2/400/300.jpg',
          status: 'pending',
          createdAt: '2024-01-15T11:45:00Z',
          adminNote: ''
        },
        {
          id: '3',
          userId: 'user3',
          userName: 'Bob Johnson',
          userEmail: 'bob.johnson@email.com',
          amount: 25.00,
          phoneNumber: '+1 234 567 8902',
          screenshot: 'https://picsum.photos/seed/payment3/400/300.jpg',
          status: 'approved',
          createdAt: '2024-01-14T09:15:00Z',
          adminNote: 'Payment verified and approved'
        },
        {
          id: '4',
          userId: 'user4',
          userName: 'Alice Brown',
          userEmail: 'alice.brown@email.com',
          amount: 75.00,
          phoneNumber: '+1 234 567 8903',
          screenshot: 'https://picsum.photos/seed/payment4/400/300.jpg',
          status: 'rejected',
          createdAt: '2024-01-14T14:20:00Z',
          adminNote: 'Screenshot unclear, please upload a clearer image'
        }
      ];
      
      setPaymentRequests(mockRequests);
      setLoading(false);
    } catch (error) {
      setError('Failed to load payment requests');
      setLoading(false);
    }
  };

  const filterRequests = () => {
    let filtered = paymentRequests;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(request => 
        request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.phoneNumber.includes(searchTerm)
      );
    }
    
    setFilteredRequests(filtered);
  };

  const handleStatusChange = async (requestId, newStatus, note = '') => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPaymentRequests(prev => prev.map(request => 
        request.id === requestId 
          ? { ...request, status: newStatus, adminNote: note }
          : request
      ));
      
      setSuccess(`Payment request ${newStatus} successfully`);
      setShowModal(false);
      setAdminNote('');
    } catch (error) {
      setError('Failed to update payment request status');
    }
  };

  const openApprovalModal = (request) => {
    setSelectedRequest(request);
    setAdminNote(request.adminNote || '');
    setShowModal(true);
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      approved: 'success',
      rejected: 'danger'
    };
    
    const icons = {
      pending: <FaClock className="me-1" />,
      approved: <FaCheck className="me-1" />,
      rejected: <FaTimes className="me-1" />
    };
    
    return (
      <Badge bg={variants[status]} className="status-badge">
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="payment-approval-page">
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
    <div className="payment-approval-page">
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="page-title">Payment Approval</h1>
            <p className="page-subtitle">
              Review and approve user payment requests
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

        {success && (
          <Row className="mb-4">
            <Col>
              <Alert variant="success">{success}</Alert>
            </Col>
          </Row>
        )}

        {/* Stats Cards */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-header">
                  <FaDollarSign className="stat-icon total-icon" />
                  <span className="stat-label">Total Requests</span>
                </div>
                <div className="stat-value">{paymentRequests.length}</div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-header">
                  <FaClock className="stat-icon pending-icon" />
                  <span className="stat-label">Pending</span>
                </div>
                <div className="stat-value">
                  {paymentRequests.filter(r => r.status === 'pending').length}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-header">
                  <FaCheck className="stat-icon approved-icon" />
                  <span className="stat-label">Approved</span>
                </div>
                <div className="stat-value">
                  {paymentRequests.filter(r => r.status === 'approved').length}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-header">
                  <FaTimes className="stat-icon rejected-icon" />
                  <span className="stat-label">Rejected</span>
                </div>
                <div className="stat-value">
                  {paymentRequests.filter(r => r.status === 'rejected').length}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Row className="mb-4">
          <Col md={6}>
            <div className="search-box">
              <FaSearch className="search-icon" />
              <Form.Control
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="filter-box">
              <FaFilter className="filter-icon" />
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </Form.Select>
            </div>
          </Col>
        </Row>

        {/* Payment Requests Table */}
        <Row>
          <Col>
            <Card className="requests-card">
              <Card.Header>
                <h5 className="mb-0">Payment Requests</h5>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <table className="requests-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Amount</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((request) => (
                        <tr key={request.id}>
                          <td>
                            <div className="user-info">
                              <div className="user-avatar">
                                <FaUser />
                              </div>
                              <div>
                                <div className="user-name">{request.userName}</div>
                                <div className="user-email">{request.userEmail}</div>
                              </div>
                            </div>
                          </td>
                          <td className="amount">${request.amount.toFixed(2)}</td>
                          <td className="phone">
                            <FaPhone className="me-1" />
                            {request.phoneNumber}
                          </td>
                          <td>{getStatusBadge(request.status)}</td>
                          <td className="date">{formatDate(request.createdAt)}</td>
                          <td className="actions">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => openApprovalModal(request)}
                              className="me-2"
                            >
                              <FaEye className="me-1" />
                              Review
                            </Button>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => openImageModal(request.screenshot)}
                            >
                              <FaImage className="me-1" />
                              Screenshot
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredRequests.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-muted">No payment requests found</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Approval Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Review Payment Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <div className="review-content">
              <Row>
                <Col md={6}>
                  <h6>User Information</h6>
                  <div className="info-item">
                    <strong>Name:</strong> {selectedRequest.userName}
                  </div>
                  <div className="info-item">
                    <strong>Email:</strong> {selectedRequest.userEmail}
                  </div>
                  <div className="info-item">
                    <strong>Phone:</strong> {selectedRequest.phoneNumber}
                  </div>
                  <div className="info-item">
                    <strong>Amount:</strong> ${selectedRequest.amount.toFixed(2)}
                  </div>
                  <div className="info-item">
                    <strong>Date:</strong> {formatDate(selectedRequest.createdAt)}
                  </div>
                </Col>
                <Col md={6}>
                  <h6>Payment Screenshot</h6>
                  <div className="screenshot-preview">
                    <img 
                      src={selectedRequest.screenshot} 
                      alt="Payment Screenshot"
                      onClick={() => openImageModal(selectedRequest.screenshot)}
                    />
                  </div>
                </Col>
              </Row>
              
              <Row className="mt-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Admin Note</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      placeholder="Add a note for this decision..."
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button 
            variant="danger" 
            onClick={() => handleStatusChange(selectedRequest.id, 'rejected', adminNote)}
            disabled={selectedRequest?.status !== 'pending'}
          >
            <FaTimes className="me-1" />
            Reject
          </Button>
          <Button 
            variant="success" 
            onClick={() => handleStatusChange(selectedRequest.id, 'approved', adminNote)}
            disabled={selectedRequest?.status !== 'pending'}
          >
            <FaCheck className="me-1" />
            Approve
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Image Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Screenshot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img src={selectedImage} alt="Payment Screenshot" className="full-image" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaymentApproval;