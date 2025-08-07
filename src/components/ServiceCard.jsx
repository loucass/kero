import React from 'react';
import { formatCurrency } from '../utils/helpers';
import useLanguage from '../hooks/useLanguage';

const ServiceCard = ({ service, onSelect, selected }) => {
  const { language } = useLanguage();
  const serviceName = language === 'ar' ? service.nameAr : service.name;

  return (
    <div 
      className={`service-card glass ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(service)}
    >
      <h3>{serviceName}</h3>
      <p className="price">{formatCurrency(service.price)}</p>
    </div>
  );
};

export default ServiceCard;