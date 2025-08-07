import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import PaymentForm from '../components/PaymentForm';
import NotificationList from '../components/NotificationList';
import { useData } from '../hooks/useData';
import {useLocalStorage} from '../hooks/useLocalStorage';
import useLanguage from '../hooks/useLanguage';

const NormalUserDashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { services, payments, wallet, addPayment } = useData();
  const [user] = useLocalStorage('user', null);
  const [selectedService, setSelectedService] = useState(null);
  const [referralId, setReferralId] = useState('');
  const [userPayments, setUserPayments] = useState([]);

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
    <div className="container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('dashboard')}</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.name}!</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className='mb'>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <svg width={100} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
              {t('services')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        
        <div>
          <NotificationList payments={userPayments} />
        </div>
      </div>
    </div>
  );
};

export default NormalUserDashboard;