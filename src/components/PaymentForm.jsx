import React, { useState } from 'react';
import { sanitizeInput } from '../utils/helpers';
import useLanguage from '../hooks/useLanguage';

const PaymentForm = ({ 
  selectedService, 
  walletNumber, 
  onSubmit, 
  referralId = '',
  setReferralId 
}) => {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match('image.*')) {
        alert(t('pleaseSelectImage'));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(t('fileTooLarge'));
        return;
      }
      
      setScreenshot(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!fullName.trim()) {
      alert(t('enterFullName'));
      return;
    }
    
    if (!screenshot) {
      alert(t('uploadScreenshot'));
      return;
    }
    
    const sanitizedFullName = sanitizeInput(fullName);
    const sanitizedReferralId = sanitizeInput(referralId);
    
    onSubmit({
      fullName: sanitizedFullName,
      referralId: sanitizedReferralId,
      screenshot: previewUrl
    });
  };

  return (
    <div className="payment-form-container">
      <h2 className="form-title">{t('selectService')}</h2>
      
      {selectedService ? (
        <div className="form-content">
          <div className="service-info">
            <h3>{selectedService.name}</h3>
            <p className="service-price">{selectedService.price} USD</p>
          </div>
          
          <div className="form-group">
            <label>{t('walletNumber')}</label>
            <div className="wallet-display">
              {walletNumber}
            </div>
          </div>
          
          <div className="form-group">
            <label>{t('fullName')}</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="form-input"
              placeholder={t('fullName')}
            />
          </div>
          
          <div className="form-group">
            <label>{t('referralId')}</label>
            <input
              type="text"
              value={referralId}
              onChange={(e) => setReferralId(e.target.value)}
              className="form-input"
              placeholder={t('referralId')}
            />
          </div>
          
          <div className="form-group">
            <label>{t('uploadScreenshot')}</label>
            <div className="file-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="file-label">
                <div className="upload-icon">📤</div>
                <p>{t('uploadScreenshot')}</p>
              </label>
            </div>
            {previewUrl && (
              <div className="image-preview">
                <img 
                  src={previewUrl} 
                  alt="Payment preview" 
                  className="preview-img"
                />
              </div>
            )}
          </div>
          
          <button 
            onClick={handleSubmit}
            className="btn btn-primary btn-block"
          >
            {t('submitPayment')}
          </button>
        </div>
      ) : (
        <div className="no-service-selected">
          <div className="no-service-icon">💳</div>
          <p>{t('noServices')}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;