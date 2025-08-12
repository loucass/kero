import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Modal } from 'react-bootstrap';
import { FaWallet, FaMobileAlt, FaMoneyBillWave, FaUpload, FaQrcode, FaCreditCard, FaInfoCircle, FaGem, FaStar, FaBolt, FaRocket } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/wallet-recharge.css';

const WalletRecharge = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    amount: '',
    phoneNumber: '',
    screenshot: null,
    paymentMethod: 'mobile'
  });
  const [currentBalance, setCurrentBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  
  const paymentMethods = [
    {
      id: 'mobile',
      name: 'Mobile Payment',
      icon: <FaMobileAlt />,
      description: 'Pay using mobile wallet or banking app',
      phoneNumber: '+1 234 567 8900'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: <FaCreditCard />,
      description: 'Direct bank transfer to our account',
      accountNumber: 'AI-PLATFORM-1234'
    }
  ];

  useEffect(() => {
    // Placeholder for backend integration
    const fetchBalance = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setCurrentBalance(150.75);
      } catch (error) {
        setError('Failed to load current balance');
      }
    };
    fetchBalance();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        screenshot: file
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
        setShowPreview(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Validate form
      if (!formData.amount || parseFloat(formData.amount) <= 0) {
        throw new Error('Please enter a valid amount');
      }
      if (!formData.screenshot) {
        throw new Error('Please upload payment screenshot');
      }
      
      // Placeholder for backend integration
      console.log('Wallet recharge request:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Placeholder logic - in real app, this would be handled by backend
      setSuccess('Payment verification submitted successfully! Your wallet will be updated within 24 hours.');
      
      // Reset form
      setFormData({
        amount: '',
        phoneNumber: '',
        screenshot: null,
        paymentMethod: 'mobile'
      });
      setShowPreview(false);
      setPreviewUrl('');
      
    } catch (err) {
      setError(err.message || 'Failed to submit payment verification');
    } finally {
      setLoading(false);
    }
  };

  const selectedPaymentMethod = paymentMethods.find(method => method.id === formData.paymentMethod);

  return (
    <div className="wallet-recharge-page modern-wallet">
      <div className="wallet-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>
      
      <Container>
        <Row className="mb-5">
          <Col>
            <div className="wallet-header">
              <div className="wallet-badge">
                <FaStar className="badge-icon" />
                <span>WALLET RECHARGE</span>
              </div>
              <h1 className="wallet-title">{t('walletRecharge')}</h1>
              <p className="wallet-subtitle">
                Add funds to your wallet securely and quickly
              </p>
            </div>
          </Col>
        </Row>
        
        {error && (
          <Row className="mb-4">
            <Col>
              <Alert variant="danger" className="wallet-alert">
                {error}
              </Alert>
            </Col>
          </Row>
        )}
        
        {success && (
          <Row className="mb-4">
            <Col>
              <Alert variant="success" className="wallet-alert">
                <FaRocket className="alert-icon me-2" />
                {success}
              </Alert>
            </Col>
          </Row>
        )}
        
        <Row>
          <Col lg={8}>
            <Card className="recharge-form-card modern-form-card">
              <Card.Body>
                <div className="form-header">
                  <div className="form-icon-wrapper">
                    <div className="form-icon-bg">
                      <FaMoneyBillWave className="form-icon" />
                    </div>
                  </div>
                  <h4 className="form-title">Recharge Form</h4>
                </div>
                
                <Form onSubmit={handleSubmit}>
                  {/* Payment Method Selection */}
                  <Form.Group className="mb-4 form-group-modern">
                    <Form.Label>Payment Method</Form.Label>
                    <div className="payment-methods">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`payment-method ${formData.paymentMethod === method.id ? 'selected' : ''}`}
                          onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                        >
                          <div className="method-icon-wrapper">
                            {method.icon}
                          </div>
                          <div className="method-info">
                            <h6>{method.name}</h6>
                            <p>{method.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Form.Group>
                  
                  {/* Amount Input */}
                  <Form.Group className="mb-4 form-group-modern">
                    <Form.Label>{t('amount')} (USD)</Form.Label>
                    <div className="amount-input-group">
                      <span className="currency-symbol">$</span>
                      <Form.Control
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        min="1"
                        step="0.01"
                        required
                        className="form-control-modern"
                      />
                    </div>
                    <div className="quick-amounts">
                      {[10, 25, 50, 100].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline-primary"
                          size="sm"
                          className="quick-amount-btn"
                          onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                  </Form.Group>
                  
                  {/* Payment Details */}
                  <Form.Group className="mb-4 form-group-modern">
                    <Form.Label>Payment Details</Form.Label>
                    <Alert className="payment-info modern-payment-info">
                      <FaInfoCircle className="me-2" />
                      <div>
                        <strong>Send payment to:</strong><br />
                        {selectedPaymentMethod?.phoneNumber || selectedPaymentMethod?.accountNumber}<br />
                        <small>Please include your user ID in the payment reference</small>
                      </div>
                    </Alert>
                  </Form.Group>
                  
                  {/* Phone Number */}
                  <Form.Group className="mb-4 form-group-modern">
                    <Form.Label>{t('phoneNumber')}</Form.Label>
                    <div className="input-group-modern">
                      <span className="input-icon">
                        <FaMobileAlt />
                      </span>
                      <Form.Control
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                        className="form-control-modern"
                      />
                    </div>
                  </Form.Group>
                  
                  {/* Screenshot Upload */}
                  <Form.Group className="mb-4 form-group-modern">
                    <Form.Label>{t('uploadScreenshot')}</Form.Label>
                    <div className="file-upload-area modern-file-upload">
                      <input
                        type="file"
                        id="screenshot"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input"
                        required
                      />
                      <label htmlFor="screenshot" className="file-upload-label">
                        <FaUpload className="upload-icon" />
                        <div>
                          <strong>Choose file</strong>
                          <p>or drag and drop</p>
                          <small>PNG, JPG, GIF up to 10MB</small>
                        </div>
                      </label>
                      {formData.screenshot && (
                        <div className="file-name">
                          {formData.screenshot.name}
                        </div>
                      )}
                    </div>
                  </Form.Group>
                  
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="submit-btn-modern w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        {t('loading')}
                      </>
                    ) : (
                      <>
                        <FaBolt className="me-2" />
                        {t('submit')}
                      </>
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={4}>
            {/* Current Balance Card */}
            <Card className="balance-card modern-balance-card">
              <Card.Body>
                <div className="balance-header">
                  <div className="balance-icon-wrapper">
                    <FaWallet className="balance-icon" />
                  </div>
                  <span>Current Balance</span>
                </div>
                <div className="balance-amount">
                  ${currentBalance.toFixed(2)}
                </div>
                <div className="balance-info">
                  <small>Available for services</small>
                </div>
              </Card.Body>
            </Card>
            
            {/* Instructions Card */}
            <Card className="instructions-card modern-instructions-card">
              <Card.Body>
                <div className="instructions-header">
                  <div className="instructions-icon-wrapper">
                    <FaQrcode className="instructions-icon" />
                  </div>
                  <h5 className="instructions-title">How to Recharge</h5>
                </div>
                <ol className="instructions-list">
                  <li>Select your preferred payment method</li>
                  <li>Enter the amount you want to add</li>
                  <li>Send payment to the provided number/account</li>
                  <li>Upload payment screenshot as proof</li>
                  <li>Submit for verification</li>
                </ol>
                <Alert variant="info" className="mt-3 modern-note-alert">
                  <small>
                    <strong>Note:</strong> Payment verification typically takes 1-24 hours. You'll receive a notification once your wallet is updated.
                  </small>
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      {/* Image Preview Modal */}
      <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg" centered className="modern-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            <FaRocket className="me-2" />
            Payment Screenshot Preview
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {previewUrl && (
            <div className="text-center">
              <img src={previewUrl} alt="Payment Screenshot" className="preview-image" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPreview(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WalletRecharge;