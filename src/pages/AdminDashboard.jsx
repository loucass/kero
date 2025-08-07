import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserList from '../components/UserList';
import ServiceManagement from '../components/ServiceManagement';
import PaymentApproval from '../components/PaymentApproval';
import { useData } from '../hooks/useData';
import {useLocalStorage} from '../hooks/useLocalStorage';
import { formatCurrency } from '../utils/helpers';
import useLanguage from '../hooks/useLanguage';

const AdminDashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { 
    users, 
    payments, 
    services, 
    wallet, 
    updateService, 
    addService, 
    updateWallet, 
    updatePaymentStatus 
  } = useData();
  const [user] = useLocalStorage('user', null);
  const [newWalletNumber, setNewWalletNumber] = useState(wallet.number);
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  const handleWalletUpdate = () => {
    if (newWalletNumber.trim()) {
      updateWallet(newWalletNumber);
      alert(t('walletUpdated'));
    }
  };

  const filteredUsers = roleFilter === 'all' 
    ? users 
    : users.filter(u => u.role === roleFilter);

  // Calculate stats
  const totalUsers = users.length;
  const normalUsers = users.filter(u => u.role === 'normal').length;
  const marketingUsers = users.filter(u => u.role === 'marketing').length;
  const approvedPayments = payments.filter(p => p.status === 'Approved');
  const totalRevenue = approvedPayments.reduce((sum, payment) => {
    const service = services.find(s => s.id === payment.serviceId);
    return sum + (service ? service.price : 0);
  }, 0);

  // Calculate marketer stats
  const marketerStats = users
    .filter(u => u.role === 'marketing')
    .map(marketer => {
      const referredUsers = users.filter(u => u.referredBy === marketer.id);
      const referredPayments = payments.filter(p => {
        const isReferred = referredUsers.some(u => u.id === p.userId);
        return isReferred && p.status === 'Approved';
      });
      
      const revenue = referredPayments.reduce((sum, payment) => {
        const service = services.find(s => s.id === payment.serviceId);
        return sum + (service ? service.price : 0);
      }, 0);
      
      return {
        id: marketer.id,
        name: marketer.name,
        referredUsers: referredUsers.length,
        revenue
      };
    });

  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('adminPanel')}</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.name}!</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat-card glass">
          <div className="mb-2">
            <svg width={100} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('totalUsers')}</h3>
          <div className="value">{totalUsers}</div>
        </div>
        
        <div className="stat-card glass">
          <div className="mb-2">
            <svg width={100} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Normal Users</h3>
          <div className="value">{normalUsers}</div>
        </div>
        
        <div className="stat-card glass">
          <div className="mb-2">
            <svg width={100} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Marketing Users</h3>
          <div className="value">{marketingUsers}</div>
        </div>
        
        <div className="stat-card glass">
          <div className="mb-2">
            <svg width={100} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('totalPayments')}</h3>
          <div className="value">{formatCurrency(totalRevenue)}</div>
        </div>
      </div>
      
      {/* Wallet Management */}
      <div className="glass card mb-8">
        <h2 className="card-header flex items-center">
          <svg width={100} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
          Wallet Management
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={newWalletNumber}
            onChange={(e) => setNewWalletNumber(e.target.value)}
            className="form-input"
            placeholder="Wallet Number"
          />
          <button 
            onClick={handleWalletUpdate}
            className="btn btn-primary"
          >
            Update Wallet
          </button>
        </div>
      </div>
      
      {/* User Management */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <h2 className="text-xl font-semibold flex items-center">
            <svg width={100} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            {t('users')}
          </h2>
          <div>
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="form-input w-full md:w-auto"
            >
              <option value="all">All Roles</option>
              <option value="normal">Normal Users</option>
              <option value="marketing">Marketing Users</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>
        <UserList users={filteredUsers} />
      </div>
      
      {/* Marketer Stats */}
      <div className="glass card mb-8">
        <h2 className="card-header flex items-center">
          <svg width={100} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
          {t('marketerStats')}
        </h2>
        
        {marketerStats.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{t('username')}</th>
                  <th>{t('referredUsers')}</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {marketerStats.map(marketer => (
                  <tr key={marketer.id}>
                    <td>{marketer.id}</td>
                    <td>{marketer.name}</td>
                    <td>{marketer.referredUsers}</td>
                    <td>{formatCurrency(marketer.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <svg width={100} xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="mt-2">{t('noUsers')}</p>
          </div>
        )}
      </div>
      
      {/* Service Management */}
      <ServiceManagement 
        services={services}
        updateService={updateService}
        addService={addService}
      />
      
      {/* Payment Approval */}
      <PaymentApproval 
        payments={payments}
        services={services}
        updatePaymentStatus={updatePaymentStatus}
      />
    </div>
  );
};

export default AdminDashboard;