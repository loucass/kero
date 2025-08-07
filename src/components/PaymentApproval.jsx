import React from 'react';
import { formatDate } from '../utils/helpers';
import useLanguage from '../hooks/useLanguage';

const PaymentApproval = ({ payments, services, updatePaymentStatus }) => {
  const { t } = useLanguage();

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Approved': return 'status-approved';
      case 'Rejected': return 'status-rejected';
      default: return '';
    }
  };

  const getServiceName = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return service ? service.name : 'Unknown';
  };

  return (
    <div className="glass card">
      <h2 className="card-header">{t('paymentSubmissions')}</h2>
      
      {payments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">{t('fullName')}</th>
                <th className="px-4 py-2 text-left">{t('serviceName')}</th>
                <th className="px-4 py-2 text-left">{t('price')}</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => {
                const service = services.find(s => s.id === payment.serviceId);
                return (
                  <tr key={payment.id}>
                    <td className="px-4 py-2">{payment.id}</td>
                    <td className="px-4 py-2">{payment.fullName}</td>
                    <td className="px-4 py-2">{getServiceName(payment.serviceId)}</td>
                    <td className="px-4 py-2">{service ? service.price : 'N/A'}</td>
                    <td className="px-4 py-2">{formatDate(payment.date)}</td>
                    <td className={`px-4 py-2 ${getStatusClass(payment.status)}`}>
                      {t(payment.status.toLowerCase())}
                    </td>
                    <td className="px-4 py-2">
                      {payment.status === 'Pending' && (
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => updatePaymentStatus(payment.id, 'Approved')}
                            className="btn btn-primary text-sm"
                          >
                            {t('approve')}
                          </button>
                          <button 
                            onClick={() => updatePaymentStatus(payment.id, 'Rejected')}
                            className="btn btn-secondary text-sm"
                          >
                            {t('reject')}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>{t('noPayments')}</p>
      )}
    </div>
  );
};

export default PaymentApproval;