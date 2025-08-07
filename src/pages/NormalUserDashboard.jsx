import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import PaymentForm from '../components/PaymentForm';
import NotificationList from '../components/NotificationList';
import { useData } from '../hooks/useData';
import {useLocalStorage} from '../hooks/useLocalStorage';
import '../styles/normal-dashboard.css';
import useLanguage from '../hooks/useLanguage';
import useTheme from '../hooks/useTheme';

const NormalUserDashboard = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { services, payments, wallet, addPayment } = useData();
  const [user] = useLocalStorage('user', null);
  const [selectedService, setSelectedService] = useState(null);
  const [referralId, setReferralId] = useState('');
  const [userPayments, setUserPayments] = useState([]);
  const [_, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'normal') {
      navigate('/');
      return;
    }

    const ref = searchParams.get('ref');
    if (ref) {
      setReferralId(ref);
    }

    // Filter payments for the current user
    const filteredPayments = payments.filter(payment => payment.userId === user.id);
    setUserPayments(filteredPayments);

    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user, navigate, payments, searchParams]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handlePaymentSubmit = (paymentData) => {
    const newPayment = {
      userId: user.id,
      serviceId: selectedService.id,
      status: 'Pending',
      screenshot: paymentData.screenshot,
      fullName: paymentData.fullName,
      date: new Date().toISOString()
    };

    addPayment(newPayment);
    
    // Update local state
    setUserPayments(prev => [...prev, newPayment]);
    
    // Reset form
    setSelectedService(null);
    alert(t('paymentSubmitted'));
  };

  return (
    <div className={`normal-dashboard ${theme}`}>
      {/* Dashboard Section */}
      <section className="dashboard-section">
        <div className="container">
          <div className="dashboard-header">
            <h1>{t('dashboard')}</h1>
            <p>{t('welcome')}, {user?.name}!</p>
          </div>
          
          <div className="dashboard-content">
            <div className="dashboard-main">
              <div className="services-section">
                <div className="section-header">
                  <h2>{t('services')}</h2>
                  <p>{t('selectService')}</p>
                </div>
                <div className="services-grid">
                  {services.map(service => (
                    <ServiceCard 
                      key={service.id}
                      service={service}
                      onSelect={handleServiceSelect}
                      selected={selectedService?.id === service.id}
                    />
                  ))}
                </div>
              </div>
              
              <PaymentForm 
                selectedService={selectedService}
                walletNumber={wallet.number}
                onSubmit={handlePaymentSubmit}
                referralId={referralId}
                setReferralId={setReferralId}
              />
            </div>
            
            <div className="dashboard-sidebar">
              <NotificationList payments={userPayments} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NormalUserDashboard;