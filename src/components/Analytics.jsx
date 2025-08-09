import React from 'react';
import { formatCurrency } from '../utils/helpers';
import useLanguage from '../hooks/useLanguage';

const Analytics = ({ users, payments, services, stats }) => {
  const { t } = useLanguage();

  // Calculate additional analytics data
  const roleDistribution = [
    { name: 'Normal Users', value: users.filter(u => u.role === 'normal').length, color: '#6366f1' },
    { name: 'Marketing Users', value: users.filter(u => u.role === 'marketing').length, color: '#8b5cf6' },
    { name: 'Admins', value: users.filter(u => u.role === 'admin').length, color: '#ec4899' }
  ];

  const paymentStatus = [
    { name: 'Approved', value: payments.filter(p => p.status === 'Approved').length, color: '#10b981' },
    { name: 'Pending', value: payments.filter(p => p.status === 'Pending').length, color: '#f59e0b' },
    { name: 'Rejected', value: payments.filter(p => p.status === 'Rejected').length, color: '#ef4444' }
  ];

  // Calculate top services
  const serviceCounts = {};
  payments.filter(p => p.status === 'Approved').forEach(payment => {
    const service = services.find(s => s.id === payment.serviceId);
    if (service) {
      serviceCounts[service.name] = (serviceCounts[service.name] || 0) + 1;
    }
  });

  const topServices = Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  return (
    <div className="analytics-container">
      {/* Stats Grid */}
      <div className="stats-grid">
        {/* Role Distribution */}
        <div className="stat-card">
          <div className="section-header">
            <h2>{t('dashboardRoleDistribution')}</h2>
          </div>
          
          <div className="pie-chart">
            {roleDistribution.map((role, index) => (
              <div key={index} className="pie-segment">
                <div className="segment-info">
                  <div className="segment-color" style={{ backgroundColor: role.color }}></div>
                  <div className="segment-text">
                    <div className="segment-name">{role.name}</div>
                    <div className="segment-value">{role.value} ({Math.round(role.value / users.length * 100)}%)</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Payment Status */}
        <div className="stat-card">
          <div className="section-header">
            <h2>{t('dashboardPaymentStatus')}</h2>
          </div>
          
          <div className="pie-chart">
            {paymentStatus.map((status, index) => (
              <div key={index} className="pie-segment">
                <div className="segment-info">
                  <div className="segment-color" style={{ backgroundColor: status.color }}></div>
                  <div className="segment-text">
                    <div className="segment-name">{status.name}</div>
                    <div className="segment-value">{status.value} ({Math.round(status.value / payments.length * 100)}%)</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Top Services */}
      <div className="analytics-section">
        <div className="section-header">
          <h2>{t('dashboardTopServices')}</h2>
          <p>{t('dashboardTopServicesDesc')}</p>
        </div>
        
        <div className="top-services">
          {topServices.map((service, index) => (
            <div key={index} className="top-service-item">
              <div className="service-rank">#{index + 1}</div>
              <div className="service-name">{service.name}</div>
              <div className="service-count">{service.count} {t('dashboardSales')}</div>
              <div className="service-progress">
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${(service.count / Math.max(...topServices.map(s => s.count))) * 100}%`,
                    backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h3>{t('dashboardAvgTransaction')}</h3>
            <div className="metric-value">
              {payments.length > 0 ? formatCurrency(stats.totalRevenue / payments.length) : '$0.00'}
            </div>
            <div className="metric-desc">{t('dashboardAvgTransactionDesc')}</div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <h3>{t('dashboardConversionRate')}</h3>
            <div className="metric-value">24.8%</div>
            <div className="metric-desc">{t('dashboardConversionRateDesc')}</div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">⏱️</div>
          <div className="metric-content">
            <h3>{t('dashboardAvgApprovalTime')}</h3>
            <div className="metric-value">2.4 hours</div>
            <div className="metric-desc">{t('dashboardAvgApprovalTimeDesc')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;