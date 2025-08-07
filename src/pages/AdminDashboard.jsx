import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../hooks/useData';
import {useLocalStorage} from '../hooks/useLocalStorage';
import ServiceManagement from '../components/ServiceManagement';
import PaymentApproval from '../components/PaymentApproval';
import UserList from '../components/UserList';
import '../styles/admin-dashboard.css';
import useLanguage from '../hooks/useLanguage';
import useTheme from '../hooks/useTheme';

const AdminDashboard = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
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
  const [activeTab, setActiveTab] = useState('overview');
  const [monthlyStats, setMonthlyStats] = useState({
    users: 0,
    payments: 0,
    revenue: 0
  });
  const [roleFilter, setRoleFilter] = useState('all');
  const [_, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    // Calculate stats
    const totalUsers = users.length;
    const approvedPayments = payments.filter(p => p.status === 'Approved');
    const totalRevenue = approvedPayments.reduce((sum, payment) => {
      const service = services.find(s => s.id === payment.serviceId);
      return sum + (service ? service.price : 0);
    }, 0);

    // Generate monthly stats
    setMonthlyStats({
      users: totalUsers,
      payments: approvedPayments.length,
      revenue: totalRevenue
    });

    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user, navigate, users, payments, services]);

  const filteredUsers = roleFilter === 'all' 
    ? users 
    : users.filter(u => u.role === roleFilter);

  const handleWalletUpdate = () => {
    if (newWalletNumber.trim()) {
      updateWallet(newWalletNumber);
      alert(t('walletUpdated'));
    }
  };

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
    <div className={`admin-dashboard ${theme}`}>
      {/* Dashboard Section */}
      <section className="dashboard-section">
        <div className="container">
          <div className="dashboard-header">
            <h1>{t('adminPanel')}</h1>
            <p>{t('welcome')}, {user?.name}!</p>
          </div>
          
          {/* Stats Overview */}
          <div className="stats-overview">
            <div className="stats-grid">
              <div className="stat-card primary">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3>{t('totalUsers')}</h3>
                  <div className="stat-value">{monthlyStats.users}</div>
                  <div className="stat-change positive">
                    <span>↑</span> 8.2%
                  </div>
                </div>
              </div>
              
              <div className="stat-card success">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <h3>{t('totalPayments')}</h3>
                  <div className="stat-value">{monthlyStats.payments}</div>
                  <div className="stat-change positive">
                    <span>↑</span> 12.5%
                  </div>
                </div>
              </div>
              
              <div className="stat-card info">
                <div className="stat-icon">💵</div>
                <div className="stat-content">
                  <h3>{t('totalRevenue')}</h3>
                  <div className="stat-value">${monthlyStats.revenue.toFixed(2)}</div>
                  <div className="stat-change positive">
                    <span>↑</span> 15.3%
                  </div>
                </div>
              </div>
              
              <div className="stat-card warning">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h3>{t('dashboardPendingPayments')}</h3>
                  <div className="stat-value">{payments.filter(p => p.status === 'Pending').length}</div>
                  <div className="stat-change negative">
                    <span>↓</span> 2.1%
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="dashboard-tabs">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              {t('dashboardOverview')}
            </button>
            <button 
              className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              {t('users')}
            </button>
            <button 
              className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              {t('manageServices')}
            </button>
            <button 
              className={`tab-btn ${activeTab === 'payments' ? 'active' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              {t('paymentSubmissions')}
            </button>
            <button 
              className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              {t('dashboardAnalytics')}
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-content">
                {/* Quick Actions */}
                <div className="quick-actions">
                  <div className="section-header">
                    <h2>{t('dashboardQuickActions')}</h2>
                    <p>{t('dashboardQuickActionsDesc')}</p>
                  </div>
                  
                  <div className="actions-grid">
                    <div className="action-card">
                      <div className="action-icon">💳</div>
                      <h3>{t('updateWallet')}</h3>
                      <div className="action-form">
                        <input
                          type="text"
                          value={newWalletNumber}
                          onChange={(e) => setNewWalletNumber(e.target.value)}
                          className="form-input"
                          placeholder={t('walletNumber')}
                        />
                        <button 
                          onClick={handleWalletUpdate}
                          className="btn btn-primary"
                        >
                          {t('save')}
                        </button>
                      </div>
                    </div>
                    
                    <div className="action-card">
                      <div className="action-icon">👥</div>
                      <h3>{t('addUser')}</h3>
                      <button className="btn btn-primary">
                        {t('addUser')}
                      </button>
                    </div>
                    
                    <div className="action-card">
                      <div className="action-icon">📊</div>
                      <h3>{t('generateReport')}</h3>
                      <button className="btn btn-primary">
                        {t('generateReport')}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* System Health */}
                <div className="system-health">
                  <div className="section-header">
                    <h2>{t('dashboardSystemHealth')}</h2>
                    <p>{t('dashboardSystemHealthDesc')}</p>
                  </div>
                  
                  <div className="health-cards">
                    <div className="health-card">
                      <div className="health-icon">✅</div>
                      <h3>{t('dashboardServerStatus')}</h3>
                      <div className="health-value">{t('dashboardOperational')}</div>
                      <div className="health-desc">99.9% uptime</div>
                    </div>
                    
                    <div className="health-card">
                      <div className="health-icon">⚡</div>
                      <h3>{t('dashboardResponseTime')}</h3>
                      <div className="health-value">124ms</div>
                      <div className="health-desc">Average response time</div>
                    </div>
                    
                    <div className="health-card">
                      <div className="health-icon">💾</div>
                      <h3>{t('dashboardStorage')}</h3>
                      <div className="health-value">45%</div>
                      <div className="health-desc">Storage used</div>
                    </div>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="recent-activity">
                  <div className="section-header">
                    <h2>{t('dashboardRecentActivity')}</h2>
                    <p>{t('dashboardRecentActivityDesc')}</p>
                  </div>
                  
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="activity-icon success">✓</div>
                      <div className="activity-content">
                        <div className="activity-title">{t('dashboardPaymentApproved')}</div>
                        <div className="activity-desc">{t('dashboardPaymentApprovedDesc')}</div>
                        <div className="activity-time">2 hours ago</div>
                      </div>
                    </div>
                    
                    <div className="activity-item">
                      <div className="activity-icon primary">👤</div>
                      <div className="activity-content">
                        <div className="activity-title">{t('dashboardNewUser')}</div>
                        <div className="activity-desc">{t('dashboardNewUserDesc')}</div>
                        <div className="activity-time">5 hours ago</div>
                      </div>
                    </div>
                    
                    <div className="activity-item">
                      <div className="activity-icon warning">⚠️</div>
                      <div className="activity-content">
                        <div className="activity-title">{t('dashboardServiceUpdated')}</div>
                        <div className="activity-desc">{t('dashboardServiceUpdatedDesc')}</div>
                        <div className="activity-time">1 day ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'users' && (
              <div className="users-content">
                <div className="users-controls">
                  <div className="section-header">
                    <h2>{t('users')}</h2>
                    <p>{t('dashboardUsersDesc')}</p>
                  </div>
                  
                  <div className="filter-controls">
                    <select 
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="form-select"
                    >
                      <option value="all">{t('dashboardAllRoles')}</option>
                      <option value="normal">{t('normal')}</option>
                      <option value="marketing">{t('marketing')}</option>
                      <option value="admin">{t('admin')}</option>
                    </select>
                    
                    <button className="btn btn-primary">
                      {t('addUser')}
                    </button>
                  </div>
                </div>
                
                <UserList users={filteredUsers} />
              </div>
            )}
            
            {activeTab === 'services' && (
              <div className="services-content">
                <ServiceManagement 
                  services={services}
                  updateService={updateService}
                  addService={addService}
                />
              </div>
            )}
            
            {activeTab === 'payments' && (
              <div className="payments-content">
                <PaymentApproval 
                  payments={payments}
                  services={services}
                  updatePaymentStatus={updatePaymentStatus}
                />
              </div>
            )}
            
            {activeTab === 'analytics' && (
              <div className="analytics-content">
                {/* User Analytics */}
                <div className="analytics-section">
                  <div className="section-header">
                    <h2>{t('dashboardUserAnalytics')}</h2>
                    <p>{t('dashboardUserAnalyticsDesc')}</p>
                  </div>
                  
                  <div className="analytics-cards">
                    <div className="analytics-card">
                      <div className="analytics-icon">👥</div>
                      <h3>{t('totalUsers')}</h3>
                      <div className="analytics-value">{users.length}</div>
                      <div className="analytics-chart">
                        <div className="chart-bar" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    
                    <div className="analytics-card">
                      <div className="analytics-icon">📈</div>
                      <h3>{t('dashboardNewUsers')}</h3>
                      <div className="analytics-value">24</div>
                      <div className="analytics-chart">
                        <div className="chart-bar" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    
                    <div className="analytics-card">
                      <div className="analytics-icon">🔄</div>
                      <h3>{t('dashboardRetention')}</h3>
                      <div className="analytics-value">87%</div>
                      <div className="analytics-chart">
                        <div className="chart-bar" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Revenue Analytics */}
                <div className="analytics-section">
                  <div className="section-header">
                    <h2>{t('dashboardRevenueAnalytics')}</h2>
                    <p>{t('dashboardRevenueAnalyticsDesc')}</p>
                  </div>
                  
                  <div className="analytics-cards">
                    <div className="analytics-card">
                      <div className="analytics-icon">💰</div>
                      <h3>{t('totalRevenue')}</h3>
                      <div className="analytics-value">${monthlyStats.revenue.toFixed(2)}</div>
                      <div className="analytics-chart">
                        <div className="chart-bar" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    
                    <div className="analytics-card">
                      <div className="analytics-icon">📊</div>
                      <h3>{t('dashboardAvgRevenue')}</h3>
                      <div className="analytics-value">${(monthlyStats.revenue / users.length).toFixed(2)}</div>
                      <div className="analytics-chart">
                        <div className="chart-bar" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    
                    <div className="analytics-card">
                      <div className="analytics-icon">📈</div>
                      <h3>{t('dashboardGrowth')}</h3>
                      <div className="analytics-value">+15.3%</div>
                      <div className="analytics-chart">
                        <div className="chart-bar" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Marketer Performance */}
                <div className="analytics-section">
                  <div className="section-header">
                    <h2>{t('marketerStats')}</h2>
                    <p>{t('dashboardMarketerStatsDesc')}</p>
                  </div>
                  
                  <div className="marketer-stats-table">
                    <table className="stats-table">
                      <thead>
                        <tr>
                          <th>{t('username')}</th>
                          <th>{t('referredUsers')}</th>
                          <th>{t('dashboardRevenue')}</th>
                          <th>{t('dashboardConversion')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {marketerStats.map((marketer, index) => (
                          <tr key={index}>
                            <td>{marketer.name}</td>
                            <td>{marketer.referredUsers}</td>
                            <td>${marketer.revenue.toFixed(2)}</td>
                            <td>{(marketer.referredUsers / users.length * 100).toFixed(1)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;