import React from 'react';
import { formatDate } from '../utils/helpers';
import useLanguage from '../hooks/useLanguage';

const NotificationList = ({ payments }) => {
  const { t } = useLanguage();

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Approved': return 'status-approved';
      case 'Rejected': return 'status-rejected';
      default: return '';
    }
  };

  return (
    <div className="glass card">
      <h2 className="card-header">{t('notifications')}</h2>
      
      {payments.length > 0 ? (
        <div className="space-y-3">
          {payments.map(payment => (
            <div key={payment.id} className="notification-item slide-up">
              <div className="flex justify-between items-center">
                <span className="font-medium">{payment.fullName}</span>
                <span className={getStatusClass(payment.status)}>
                  {t(payment.status.toLowerCase())}
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {formatDate(payment.date)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="mt-2">{t('noNotifications')}</p>
        </div>
      )}
    </div>
  );
};

export default NotificationList;