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
    <div className="glass card mt-8">
      <h2 className="card-header">{t('selectService')}</h2>
      
      {selectedService ? (
        <div className="space-y-6">
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-1">{selectedService.name}</h3>
            <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{selectedService.price} USD</p>
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">{t('walletNumber')}</label>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-center">
              {walletNumber}
            </div>
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">{t('fullName')}</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="form-input"
              placeholder={t('fullName')}
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">{t('referralId')}</label>
            <input
              type="text"
              value={referralId}
              onChange={(e) => setReferralId(e.target.value)}
              className="form-input"
              placeholder={t('referralId')}
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">{t('uploadScreenshot')}</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <svg width={100} xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {t('uploadScreenshot')}
                </p>
              </label>
            </div>
            {previewUrl && (
              <div className="mt-4">
                <img 
                  src={previewUrl} 
                  alt="Payment preview" 
                  className="max-w-full h-48 object-contain mx-auto rounded-lg border border-gray-200 dark:border-gray-700"
                />
              </div>
            )}
          </div>
          
          <button 
            onClick={handleSubmit}
            className="btn btn-primary w-full py-3 text-lg"
          >
            {t('submitPayment')}
          </button>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <svg width={100} xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="mt-2">{t('noServices')}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;