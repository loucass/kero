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
    <div className="notifications-container">
      <h2 className="notifications-title">{t('notifications')}</h2>
      
      {payments.length > 0 ? (
        <div className="notifications-list">
          {payments.map(payment => (
            <div key={payment.id} className="notification-item">
              <div className="notification-content">
                <div className="notification-header">
                  <span className="notification-name">{payment.fullName}</span>
                  <span className={`notification-status ${getStatusClass(payment.status)}`}>
                    {t(payment.status.toLowerCase())}
                  </span>
                </div>
                <div className="notification-date">
                  {formatDate(payment.date)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-notifications">
          <div className="no-notifications-icon">📭</div>
          <p>{t('noNotifications')}</p>
        </div>
      )}
    </div>
  );
};

export default NotificationList;