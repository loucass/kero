import { useState, useEffect } from 'react';
import { useData } from '../hooks/useData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import UserManagement from '../components/UserManagement';
import ServiceManagement from '../components/ServiceManagement';
import PaymentApproval from '../components/PaymentApproval';
import Analytics from '../components/Analytics';
import '../styles/admin-dashboard.css';
import useLanguage from '../hooks/useLanguage';
import useTheme from '../hooks/useTheme';

const AdminDashboard = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
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
  const [_, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  const [stats, setStats] = useState({
    totalUsers: 0,
    normalUsers: 0,
    marketingUsers: 0,
    totalPayments: 0,
    approvedPayments: 0,
    pendingPayments: 0,
    totalRevenue: 0,
    monthlyGrowth: 0
  });
  const [isEditingWallet, setIsEditingWallet] = useState(false);
  const [tempWalletNumber, setTempWalletNumber] = useState('');

  useEffect(() => {
    if (user == null) return;

    const totalUsers = users?.length || 0;
    const normalUsers = users?.filter(u => u.role === 'normal')?.length || 0;
    const marketingUsers = users?.filter(u => u.role === 'marketing')?.length || 0;
    const totalPayments = payments?.length || 0;
    const approvedPayments = payments?.filter(p => p.status === 'Approved') || [];
    const pendingPayments = payments?.filter(p => p.status === 'Pending')?.length || 0;
    
    const totalRevenue = approvedPayments.reduce((sum, payment) => {
      const service = services?.find(s => s.id === payment.serviceId);
      return sum + (service ? service.price : 0);
    }, 0);

    const monthlyGrowth = Math.floor(Math.random() * 20) + 5;

    setStats({
      totalUsers,
      normalUsers,
      marketingUsers,
      totalPayments,
      approvedPayments: approvedPayments.length,
      pendingPayments,
      totalRevenue,
      monthlyGrowth
    });

    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user, users, payments, services]);

  useEffect(() => {
    if (wallet && typeof wallet === 'object' && 'number' in wallet) {
      setTempWalletNumber(wallet.number || '');
    } else {
      console.warn('Invalid wallet structure:', wallet);
      setTempWalletNumber('');
    }
  }, [wallet]);

  const handleEditWallet = () => {
    setIsEditingWallet(true);
  };

  const handleSaveWallet = () => {
    if (!wallet || tempWalletNumber.trim() === '') {
      console.warn('Cannot save: Invalid wallet or empty wallet number');
      setIsEditingWallet(false);
      return;
    }
    const updatedWallet = {
      ...wallet,
      number: tempWalletNumber.trim()
    };
    console.log('Updating wallet with:', updatedWallet);
    updateWallet(updatedWallet.number);
    setIsEditingWallet(false);
  };

  const handleCancelWalletEdit = () => {
    setTempWalletNumber(wallet?.number || '');
    setIsEditingWallet(false);
  };

  return (
    <div className={`admin-dashboard ${theme}`}>
      <section className="dashboard-section">
        <div className="container">
          <div className="dashboard-header">
            <h1>{t('adminPanel')}</h1>
            <p>{t('welcome')}, {user?.name}!</p>
            
            <div className="wallet-info">
              <div className="wallet-label">{t('walletNumber')}</div>
              
              {isEditingWallet ? (
                <div className="wallet-edit-container">
                  <input
                    type="text"
                    value={tempWalletNumber}
                    onChange={(e) => setTempWalletNumber(e.target.value)}
                    className="wallet-input"
                    placeholder={t('enterWalletNumber')}
                  />
                  <div className="wallet-edit-actions">
                    <button 
                      onClick={handleSaveWallet}
                      className="wallet-btn wallet-save-btn"
                    >
                      {t('save')}
                    </button>
                    <button 
                      onClick={handleCancelWalletEdit}
                      className="wallet-btn wallet-cancel-btn"
                    >
                      {t('cancel')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="wallet-display-container">
                  <div className="wallet-number">{wallet?.number || 'N/A'}</div>
                  <button 
                    onClick={handleEditWallet}
                    className="wallet-edit-btn btn-action btn-edit"
                    title={t('editWalletNumber')}
                  >
                    edit
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="stats-overview">
            <div className="stats-grid">
              <div className="stat-card primary">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3>{t('totalUsers')}</h3>
                  <div className="stat-value">{stats.totalUsers}</div>
                  <div className="stat-change positive">
                    <span>↑</span> {stats.monthlyGrowth}%
                  </div>
                </div>
              </div>
              
              <div className="stat-card success">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <h3>{t('totalPayments')}</h3>
                  <div className="stat-value">${stats.totalRevenue.toFixed(2)}</div>
                  <div className="stat-change positive">
                    <span>↑</span> 12.3%
                  </div>
                </div>
              </div>
              
              <div className="stat-card info">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h3>{t('dashboardPendingApprovals')}</h3>
                  <div className="stat-value">{stats.pendingPayments}</div>
                  <div className="stat-change neutral">
                    <span>→</span> 0%
                  </div>
                </div>
              </div>
              
              <div className="stat-card warning">
                <div className="stat-icon">📈</div>
                <div className="stat-content">
                  <h3>{t('dashboardGrowthRate')}</h3>
                  <div className="stat-value">{stats.monthlyGrowth}%</div>
                  <div className="stat-change positive">
                    <span>↑</span> 3.7%
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="dashboard-tabs">
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
          
          <div className="tab-content">
            {activeTab === 'users' && (
              <UserManagement users={users || []} />
            )}
            
            {activeTab === 'services' && (
              <ServiceManagement 
                services={services || []}
                updateService={updateService}
                addService={addService}
              />
            )}
            
            {activeTab === 'payments' && (
              <PaymentApproval 
                payments={payments || []}
                services={services || []}
                updatePaymentStatus={updatePaymentStatus}
              />
            )}
            
            {activeTab === 'analytics' && (
              <Analytics 
                users={users || []}
                payments={payments || []}
                services={services || []}
                stats={stats}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;