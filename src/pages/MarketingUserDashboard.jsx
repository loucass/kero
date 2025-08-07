import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../hooks/useData';
import {useLocalStorage} from '../hooks/useLocalStorage';
import { formatCurrency } from '../utils/helpers';
import useLanguage from '../hooks/useLanguage';

const MarketingUserDashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { users, payments, services } = useData();
  const [user] = useLocalStorage('user', null);
  const [referredUsers, setReferredUsers] = useState([]);
  const [totalPayments, setTotalPayments] = useState(0);

  useEffect(() => {
    if (!user || user.role !== 'marketing') {
      navigate('/');
      return;
    }

    // Find users referred by the current marketer
    const referred = users.filter(u => u.referredBy === user.id);
    setReferredUsers(referred);

    // Calculate total payments from referred users
    let total = 0;
    referred.forEach(referredUser => {
      const userPayments = payments.filter(p => p.userId === referredUser.id && p.status === 'Approved');
      userPayments.forEach(payment => {
        const service = services.find(s => s.id === payment.serviceId);
        if (service) {
          total += service.price;
        }
      });
    });
    setTotalPayments(total);
  }, [user, navigate, users, payments, services]);

  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('dashboard')}</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.name}!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="stat-card glass">
          <div className="mb-2">
            <svg width={100} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('referredUsers')}</h3>
          <div className="value">{referredUsers.length}</div>
        </div>
        
        <div className="stat-card glass">
          <div className="mb-2">
            <svg width={100} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('totalPayments')}</h3>
          <div className="value">{formatCurrency(totalPayments)}</div>
        </div>
      </div>
      
      <div className="glass card">
        <h2 className="card-header flex items-center">
          <svg width={100} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          {t('referredUsers')}
        </h2>
        
        {referredUsers.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{t('username')}</th>
                  <th>{t('referralId')}</th>
                </tr>
              </thead>
              <tbody>
                {referredUsers.map(referredUser => (
                  <tr key={referredUser.id}>
                    <td>{referredUser.id}</td>
                    <td>{referredUser.name}</td>
                    <td>{referredUser.referralId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="mt-2">{t('noUsers')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketingUserDashboard;