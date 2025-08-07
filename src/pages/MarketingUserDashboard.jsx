import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../hooks/useData';
import {useLocalStorage} from '../hooks/useLocalStorage';
import '../styles/marketing-dashboard.css';
import useLanguage from '../hooks/useLanguage';
import useTheme from '../hooks/useTheme';

const MarketingUserDashboard = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { users, payments, services } = useData();
  const [user] = useLocalStorage('user', null);
  const [referredUsers, setReferredUsers] = useState([]);
  const [totalPayments, setTotalPayments] = useState(0);
  const [__, setMonthlyData] = useState([]);
  const [___, setTopServices] = useState([]);
  const [_, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('users');

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
    const serviceCounts = {};
    
    referred.forEach(referredUser => {
      const userPayments = payments.filter(p => p.userId === referredUser.id && p.status === 'Approved');
      userPayments.forEach(payment => {
        const service = services.find(s => s.id === payment.serviceId);
        if (service) {
          total += service.price;
          serviceCounts[service.name] = (serviceCounts[service.name] || 0) + 1;
        }
      });
    });
    setTotalPayments(total);

    // Generate monthly data for the chart
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const monthlyPayments = months.map(month => ({
      month,
      payments: Math.floor(Math.random() * 10) + 1,
      revenue: Math.floor(Math.random() * 1000) + 500
    }));
    setMonthlyData(monthlyPayments);

    // Get top services
    const sortedServices = Object.entries(serviceCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }));
    setTopServices(sortedServices);

    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user, navigate, users, payments, services]);

  return (
    <div className={`marketing-dashboard ${theme}`}>

      {/* Dashboard Section */}
      <section className="dashboard-section">
        <div className="container">
          <div className="dashboard-header">
            <h1>{t('dashboard')}</h1>
            <p>{t('welcome')}, {user?.name}!</p>
          </div>
          
          {/* Stats Overview */}
          <div className="stats-overview">
            <div className="stats-grid">
              <div className="stat-card primary">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3>{t('referredUsers')}</h3>
                  <div className="stat-value">{referredUsers.length}</div>
                  <div className="stat-change positive">
                    <span>↑</span> 12.5%
                  </div>
                </div>
              </div>
              
              <div className="stat-card success">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <h3>{t('totalPayments')}</h3>
                  <div className="stat-value">${totalPayments.toFixed(2)}</div>
                  <div className="stat-change positive">
                    <span>↑</span> 8.3%
                  </div>
                </div>
              </div>
              
              <div className="stat-card info">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h3>{t('dashboardConversionRate')}</h3>
                  <div className="stat-value">24.5%</div>
                  <div className="stat-change positive">
                    <span>↑</span> 3.2%
                  </div>
                </div>
              </div>
              
              <div className="stat-card warning">
                <div className="stat-icon">💵</div>
                <div className="stat-content">
                  <h3>{t('dashboardAvgRevenue')}</h3>
                  <div className="stat-value">${referredUsers.length > 0 ? (totalPayments / referredUsers.length).toFixed(2) : '0.00'}</div>
                  <div className="stat-change positive">
                    <span>↑</span> 5.7%
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="dashboard-tabs">
            <button 
              className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              {t('referredUsers')}
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
            {activeTab === 'users' && (
              <div className="users-content">
                <div className="referred-users-section">
                  <div className="section-header">
                    <h2>{t('referredUsers')}</h2>
                    <p>{t('dashboardReferredUsersDesc')}</p>
                  </div>
                  
                  {referredUsers.length > 0 ? (
                    <div className="users-table-container">
                      <table className="users-table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>{t('username')}</th>
                            <th>{t('referralId')}</th>
                            <th>{t('dashboardPaymentsCount')}</th>
                            <th>{t('dashboardRevenue')}</th>
                            <th>{t('dashboardStatus')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {referredUsers.map(referredUser => {
                            const userPayments = payments.filter(p => p.userId === referredUser.id && p.status === 'Approved');
                            const revenue = userPayments.reduce((sum, payment) => {
                              const service = services.find(s => s.id === payment.serviceId);
                              return sum + (service ? service.price : 0);
                            }, 0);
                            
                            return (
                              <tr key={referredUser.id}>
                                <td>{referredUser.id}</td>
                                <td>{referredUser.name}</td>
                                <td>{referredUser.referralId}</td>
                                <td>{userPayments.length}</td>
                                <td>${revenue.toFixed(2)}</td>
                                <td>
                                  <span className={`status-badge ${userPayments.length > 0 ? 'active' : 'inactive'}`}>
                                    {userPayments.length > 0 ? t('dashboardActive') : t('dashboardInactive')}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="no-data">
                      <div className="no-data-icon">👥</div>
                      <p>{t('dashboardNoReferredUsers')}</p>
                      <button className="btn btn-primary">
                        {t('dashboardShareReferral')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'analytics' && (
              <div className="analytics-content">
                {/* Performance Metrics */}
                <div className="performance-section">
                  <div className="section-header">
                    <h2>{t('dashboardPerformance')}</h2>
                    <p>{t('dashboardPerformanceDesc')}</p>
                  </div>
                  
                  <div className="performance-cards">
                    <div className="performance-card">
                      <div className="performance-icon">📈</div>
                      <h3>{t('dashboardConversionRate')}</h3>
                      <div className="performance-value">24.5%</div>
                      <div className="performance-change positive">+3.2%</div>
                      <div className="performance-desc">{t('dashboardConversionDesc')}</div>
                    </div>
                    
                    <div className="performance-card">
                      <div className="performance-icon">💵</div>
                      <h3>{t('dashboardAvgRevenue')}</h3>
                      <div className="performance-value">${referredUsers.length > 0 ? (totalPayments / referredUsers.length).toFixed(2) : '0.00'}</div>
                      <div className="performance-change positive">+12.8%</div>
                      <div className="performance-desc">{t('dashboardAvgRevenueDesc')}</div>
                    </div>
                    
                    <div className="performance-card">
                      <div className="performance-icon">🎯</div>
                      <h3>{t('dashboardTopService')}</h3>
                      <div className="performance-value">Premium Plan</div>
                      <div className="performance-change neutral">0%</div>
                      <div className="performance-desc">{t('dashboardTopServiceDesc')}</div>
                    </div>
                    
                    <div className="performance-card">
                      <div className="performance-icon">⏱️</div>
                      <h3>{t('dashboardAvgTime')}</h3>
                      <div className="performance-value">3.2 days</div>
                      <div className="performance-change negative">-1.5%</div>
                      <div className="performance-desc">{t('dashboardAvgTimeDesc')}</div>
                    </div>
                  </div>
                </div>
                
                {/* Activity Timeline */}
                <div className="timeline-section">
                  <div className="section-header">
                    <h2>{t('dashboardRecentActivity')}</h2>
                    <p>{t('dashboardRecentActivityDesc')}</p>
                  </div>
                  
                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="timeline-dot success"></div>
                      <div className="timeline-content">
                        <div className="timeline-title">{t('dashboardNewUser')}</div>
                        <div className="timeline-desc">{t('dashboardNewUserDesc')}</div>
                        <div className="timeline-time">2 hours ago</div>
                      </div>
                    </div>
                    
                    <div className="timeline-item">
                      <div className="timeline-dot primary"></div>
                      <div className="timeline-content">
                        <div className="timeline-title">{t('dashboardPayment')}</div>
                        <div className="timeline-desc">{t('dashboardPaymentDesc')}</div>
                        <div className="timeline-time">1 day ago</div>
                      </div>
                    </div>
                    
                    <div className="timeline-item">
                      <div className="timeline-dot warning"></div>
                      <div className="timeline-content">
                        <div className="timeline-title">{t('dashboardMilestone')}</div>
                        <div className="timeline-desc">{t('dashboardMilestoneDesc')}</div>
                        <div className="timeline-time">3 days ago</div>
                      </div>
                    </div>
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

export default MarketingUserDashboard;