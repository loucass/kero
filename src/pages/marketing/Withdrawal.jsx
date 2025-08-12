import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Modal, Badge } from 'react-bootstrap';
import { FaWallet, FaMobileAlt, FaUniversity, FaMoneyBillWave, FaArrowRight, FaInfoCircle, FaCheck, FaClock, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/withdrawal.css';

const Withdrawal = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    amount: '',
    method: 'phone_wallet',
    phone: '',
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    iban: ''
  });
  const [currentBalance, setCurrentBalance] = useState(0);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const withdrawalMethods = [
    {
      id: 'phone_wallet',
      name: 'Phone Wallet',
      icon: <FaMobileAlt />,
      description: 'Withdraw to mobile wallet (Vodafone Cash, Etisalat Cash, etc.)',
      fields: ['phone']
    },
    {
      id: 'bank_account',
      name: 'Bank Account',
      icon: <FaUniversity />,
      description: 'Withdraw directly to your bank account',
      fields: ['bankName', 'accountNumber', 'accountHolder', 'iban']
    }
  ];

  useEffect(() => {
    fetchBalance();
    fetchWithdrawalHistory();
  }, []);

  const fetchBalance = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentBalance(1250.50);
    } catch (error) {
      setError('Failed to load current balance');
    }
  };

  const fetchWithdrawalHistory = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockHistory = [
        {
          id: '1',
          amount: 100.00,
          method: 'phone_wallet',
          recipientInfo: { phone: '+1 234 567 8900' },
          status: 'approved',
          createdAt: '2024-01-10T10:30:00Z',
          processedAt: '2024-01-10T14:45:00Z'
        },
        {
          id: '2',
          amount: 250.00,
          method: 'bank_account',
          recipientInfo: { 
            bankName: 'National Bank',
            accountNumber: '****1234',
            accountHolder: 'John Doe'
          },
          status: 'pending',
          createdAt: '2024-01-12T09:15:00Z',
          processedAt: null
        },
        {
          id: '3',
          amount: 50.00,
          method: 'phone_wallet',
          recipientInfo: { phone: '+1 234 567 8900' },
          status: 'rejected',
          createdAt: '2024-01-08T16:20:00Z',
          processedAt: '2024-01-08T17:30:00Z',
          adminNote: 'Invalid phone number format'
        }
      ];
      
      setWithdrawalHistory(mockHistory);
    } catch (error) {
      setError('Failed to load withdrawal history');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMethodChange = (methodId) => {
    setFormData(prev => ({
      ...prev,
      method: methodId,
      phone: '',
      bankName: '',
      accountNumber: '',
      accountHolder: '',
      iban: ''
    }));
  };

  const validateForm = () => {
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      throw new Error('Please enter a valid amount');
    }

    if (parseFloat(formData.amount) > currentBalance) {
      throw new Error('Amount exceeds available balance');
    }

    if (parseFloat(formData.amount) < 10) {
      throw new Error('Minimum withdrawal amount is $10');
    }

    const selectedMethod = withdrawalMethods.find(m => m.id === formData.method);
    for (const field of selectedMethod.fields) {
      if (!formData[field]) {
        throw new Error(`Please fill in all required fields`);
      }
    }

    if (formData.method === 'phone_wallet' && !formData.phone.match(/^\+?[\d\s\-\(\)]+$/)) {
      throw new Error('Please enter a valid phone number');
    }

    if (formData.method === 'bank_account') {
      if (!formData.accountNumber.match(/^[\d]+$/)) {
        throw new Error('Please enter a valid account number');
      }
        if (formData.iban && !formData.iban.match(/^[A-Z0-9]{2}[0-9]{2}[A-Z0-9]{1,30}$/)) {
        throw new Error('Please enter a valid IBAN');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      validateForm();
      
      // Prepare preview data
      const selectedMethod = withdrawalMethods.find(m => m.id === formData.method);
      const recipientInfo = {};
      selectedMethod.fields.forEach(field => {
        recipientInfo[field] = formData[field];
      });

      setPreviewData({
        amount: parseFloat(formData.amount),
        method: selectedMethod,
        recipientInfo
      });
      
      setShowConfirmModal(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmWithdrawal = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add to withdrawal history
      const newWithdrawal = {
        id: Date.now().toString(),
        amount: previewData.amount,
        method: previewData.method.id,
        recipientInfo: previewData.recipientInfo,
        status: 'pending',
        createdAt: new Date().toISOString(),
        processedAt: null
      };

      setWithdrawalHistory(prev => [newWithdrawal, ...prev]);
      setCurrentBalance(prev => prev - previewData.amount);
      
      setSuccess('Withdrawal request submitted successfully! You will receive a notification once processed.');
      
      // Reset form
      setFormData({
        amount: '',
        method: 'phone_wallet',
        phone: '',
        bankName: '',
        accountNumber: '',
        accountHolder: '',
        iban: ''
      });
      
      setShowConfirmModal(false);
      setPreviewData(null);
    } catch (err) {
      setError('Failed to submit withdrawal request');
    } finally {
      setLoading(false);
    }
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

  const getMethodDisplay = (method, recipientInfo) => {
    if (method === 'phone_wallet') {
      return `Phone Wallet: ${recipientInfo.phone}`;
    } else {
      return `Bank: ${recipientInfo.bankName} ****${recipientInfo.accountNumber.slice(-4)}`;
    }
  };

  const selectedMethod = withdrawalMethods.find(m => m.id === formData.method);

  return (
    <div className="withdrawal-page">
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="page-title">Withdraw Funds</h1>
            <p className="page-subtitle">
              Request withdrawal of your marketing earnings
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

        <Row>
          <Col lg={8}>
            <Card className="withdrawal-form-card">
              <Card.Body>
                <h4 className="form-title">Withdrawal Request</h4>
                
                <Form onSubmit={handleSubmit}>
                  {/* Current Balance */}
                  <div className="balance-display mb-4">
                    <div className="balance-info">
                      <FaWallet className="balance-icon" />
                      <div>
                        <div className="balance-label">Available Balance</div>
                        <div className="balance-amount">${currentBalance.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Withdrawal Method Selection */}
                  <Form.Group className="mb-4">
                    <Form.Label>Withdrawal Method</Form.Label>
                    <div className="withdrawal-methods">
                      {withdrawalMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`withdrawal-method ${formData.method === method.id ? 'selected' : ''}`}
                          onClick={() => handleMethodChange(method.id)}
                        >
                          <div className="method-icon">{method.icon}</div>
                          <div className="method-info">
                            <h6>{method.name}</h6>
                            <p>{method.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Form.Group>

                  {/* Amount Input */}
                  <Form.Group className="mb-4">
                    <Form.Label>Amount (USD)</Form.Label>
                    <div className="amount-input-group">
                      <span className="currency-symbol">$</span>
                      <Form.Control
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        min="10"
                        max={currentBalance}
                        step="0.01"
                        required
                      />
                    </div>
                    <div className="amount-info">
                      <small className="text-muted">
                        Minimum withdrawal: $10 | Maximum: ${currentBalance.toFixed(2)}
                      </small>
                    </div>
                    <div className="quick-amounts">
                      {[25, 50, 100, 250, 500].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline-primary"
                          size="sm"
                          onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
                          disabled={amount > currentBalance}
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                  </Form.Group>

                  {/* Dynamic Fields Based on Method */}
                  {formData.method === 'phone_wallet' && (
                    <Form.Group className="mb-4">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 8900"
                        required
                      />
                      <Form.Text className="text-muted">
                        Enter your mobile wallet number
                      </Form.Text>
                    </Form.Group>
                  )}

                  {formData.method === 'bank_account' && (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label>Bank Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="bankName"
                          value={formData.bankName}
                          onChange={handleChange}
                          placeholder="National Bank"
                          required
                        />
                      </Form.Group>
                      
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Account Number</Form.Label>
                            <Form.Control
                              type="text"
                              name="accountNumber"
                              value={formData.accountNumber}
                              onChange={handleChange}
                              placeholder="1234567890"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Account Holder Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="accountHolder"
                              value={formData.accountHolder}
                              onChange={handleChange}
                              placeholder="John Doe"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Form.Group className="mb-4">
                        <Form.Label>IBAN (Optional)</Form.Label>
                        <Form.Control
                          type="text"
                          name="iban"
                          value={formData.iban}
                          onChange={handleChange}
                          placeholder="US12 3456 7890 1234 5678 90"
                        />
                        <Form.Text className="text-muted">
                          For international transfers
                        </Form.Text>
                      </Form.Group>
                    </>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="submit-btn w-100"
                    disabled={loading || !formData.amount || parseFloat(formData.amount) > currentBalance}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaMoneyBillWave className="me-2" />
                        Request Withdrawal
                      </>
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            {/* Instructions Card */}
            <Card className="instructions-card">
              <Card.Body>
                <h5 className="instructions-title">
                  <FaInfoCircle className="me-2" />
                  Withdrawal Information
                </h5>
                <div className="instructions-list">
                  <div className="instruction-item">
                    <h6>Processing Time</h6>
                    <p>Withdrawal requests are typically processed within 1-3 business days.</p>
                  </div>
                  
                  <div className="instruction-item">
                    <h6>Minimum Amount</h6>
                    <p>The minimum withdrawal amount is $10.</p>
                  </div>
                  
                  <div className="instruction-item">
                    <h6>Fees</h6>
                    <p>No withdrawal fees for amounts above $50. $2 fee for amounts below $50.</p>
                  </div>
                  
                  <div className="instruction-item">
                    <h6>Verification</h6>
                    <p>All withdrawal requests are subject to verification before processing.</p>
                  </div>
                </div>
                
                <Alert variant="info" className="mt-3">
                  <small>
                    <strong>Note:</strong> Make sure your withdrawal information is accurate. Incorrect information may delay processing.
                  </small>
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Withdrawal History */}
        <Row className="mt-5">
          <Col>
            <Card className="history-card">
              <Card.Header>
                <h5 className="mb-0">Withdrawal History</h5>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <table className="history-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Status</th>
                        <th>Processed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withdrawalHistory.map((withdrawal) => (
                        <tr key={withdrawal.id}>
                          <td className="date">{formatDate(withdrawal.createdAt)}</td>
                          <td className="amount">${withdrawal.amount.toFixed(2)}</td>
                          <td className="method">
                            {getMethodDisplay(withdrawal.method, withdrawal.recipientInfo)}
                          </td>
                          <td>{getStatusBadge(withdrawal.status)}</td>
                          <td className="processed">
                            {withdrawal.processedAt ? formatDate(withdrawal.processedAt) : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {withdrawalHistory.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-muted">No withdrawal history found</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Withdrawal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {previewData && (
            <div className="confirmation-content">
              <div className="confirmation-item">
                <strong>Amount:</strong> ${previewData.amount.toFixed(2)}
              </div>
              <div className="confirmation-item">
                <strong>Method:</strong> {previewData.method.name}
              </div>
              <div className="confirmation-item">
                <strong>Recipient:</strong>
                {previewData.method.id === 'phone_wallet' ? (
                  <div>{previewData.recipientInfo.phone}</div>
                ) : (
                  <div>
                    <div>{previewData.recipientInfo.bankName}</div>
                    <div>Account: ****{previewData.recipientInfo.accountNumber.slice(-4)}</div>
                    <div>Holder: {previewData.recipientInfo.accountHolder}</div>
                  </div>
                )}
              </div>
              <div className="confirmation-item">
                <strong>Processing Fee:</strong> ${previewData.amount >= 50 ? '0.00' : '2.00'}
              </div>
              <div className="confirmation-item total">
                <strong>Total Amount:</strong> ${(previewData.amount - (previewData.amount >= 50 ? 0 : 2)).toFixed(2)}
              </div>
              
              <Alert variant="warning" className="mt-3">
                <small>
                  <strong>Warning:</strong> This action cannot be undone. Please verify all information before confirming.
                </small>
              </Alert>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={confirmWithdrawal}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processing...
              </>
            ) : (
              <>
                <FaCheck className="me-1" />
                Confirm Withdrawal
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Withdrawal;