import React, { useState } from 'react';
import { formatDate } from '../utils/helpers';
import useLanguage from '../hooks/useLanguage';

const PaymentApproval = ({ payments, services, updatePaymentStatus }) => {
  const { t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = payments.filter(payment => {
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesSearch = payment.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getServiceName = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return service ? service.name : 'Unknown';
  };

  const getServicePrice = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return service ? service.price : 0;
  };

  return (
    <div className="payment-approval">
      <div className="section-header">
        <h2>{t('paymentSubmissions')}</h2>
        <p>{t('dashboardManagePayments')}</p>
      </div>
      
      <div className="payment-controls">
        <div className="search-container">
          <div className="search-icon">🔍</div>
          <input
            type="text"
            placeholder={t('dashboardSearchPayments')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">{t('dashboardAllStatuses')}</option>
            <option value="Pending">{t('pending')}</option>
            <option value="Approved">{t('approved')}</option>
            <option value="Rejected">{t('rejected')}</option>
          </select>
        </div>
      </div>
      
      <div className="payments-table-container">
        {filteredPayments.length > 0 ? (
          <div className="table-responsive">
            <table className="payments-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{t('fullName')}</th>
                  <th>{t('serviceName')}</th>
                  <th>{t('price')}</th>
                  <th>{t('dashboardDate')}</th>
                  <th>{t('dashboardStatus')}</th>
                  <th>{t('dashboardActions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map(payment => (
                  <tr key={payment.id}>
                    <td data-label="ID">{payment.id}</td>
                    <td data-label={t('fullName')}>{payment.fullName}</td>
                    <td data-label={t('serviceName')}>{getServiceName(payment.serviceId)}</td>
                    <td data-label={t('price')}>${getServicePrice(payment.serviceId)}</td>
                    <td data-label={t('dashboardDate')}>{formatDate(payment.date)}</td>
                    <td data-label={t('dashboardStatus')}>
                      <span className={`status-badge ${payment.status.toLowerCase()}`}>
                        {t(payment.status.toLowerCase())}
                      </span>
                    </td>
                    <td data-label={t('dashboardActions')}>
                      {payment.status === 'Pending' && (
                        <div className="action-buttons">
                          <button 
                            onClick={() => updatePaymentStatus(payment.id, 'Approved')}
                            className="btn-action btn-approve"
                          >
                            {t('approve')}
                          </button>
                          <button 
                            onClick={() => updatePaymentStatus(payment.id, 'Rejected')}
                            className="btn-action btn-reject"
                          >
                            {t('reject')}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-payments">
            <div className="no-payments-icon">💳</div>
            <p>{t('dashboardNoPaymentsFound')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentApproval;