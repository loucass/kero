import React from 'react';
import { formatCurrency } from '../utils/helpers';
import useLanguage from '../hooks/useLanguage';

const ServiceCard = ({ service, onSelect, selected }) => {
  const { language, _ } = useLanguage();
  const serviceName = language === 'ar' ? service.nameAr : service.name;

  return (
    <div 
      className={`service-card ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(service)}
    >
      <div className="service-icon">💳</div>
      <h3>{serviceName}</h3>
      <p className="service-price">{formatCurrency(service.price)}</p>
    </div>
  );
};

export default ServiceCard;