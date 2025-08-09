import React, { useState } from 'react';
import { sanitizeInput } from '../utils/helpers';
import useLanguage from '../hooks/useLanguage';

const ServiceManagement = ({ services, updateService, addService }) => {
  const { t } = useLanguage();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', nameAr: '', price: '' });
  const [newService, setNewService] = useState({ name: '', nameAr: '', price: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.nameAr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEditing = (service) => {
    setEditingId(service.id);
    setEditForm({
      name: service.name,
      nameAr: service.nameAr,
      price: service.price
    });
  };

  const handleEditSubmit = () => {
    if (!editForm.name.trim() || !editForm.nameAr.trim() || !editForm.price) {
      alert(t('allFieldsRequired'));
      return;
    }

    updateService({
      id: editingId,
      name: sanitizeInput(editForm.name),
      nameAr: sanitizeInput(editForm.nameAr),
      price: parseFloat(editForm.price)
    });

    setEditingId(null);
  };

  const handleAddService = () => {
    if (!newService.name.trim() || !newService.nameAr.trim() || !newService.price) {
      alert(t('allFieldsRequired'));
      return;
    }

    addService({
      name: sanitizeInput(newService.name),
      nameAr: sanitizeInput(newService.nameAr),
      price: parseFloat(newService.price)
    });

    setNewService({ name: '', nameAr: '', price: '' });
  };

  return (
    <div className="service-management">
      <div className="section-header">
        <h2>{t('manageServices')}</h2>
        <p>{t('dashboardManageServicesDesc')}</p>
      </div>
      
      <div className="service-controls">
        <div className="search-container">
          <div className="search-icon">🔍</div>
          <input
            type="text"
            placeholder={t('dashboardSearchServices')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <button 
          onClick={() => document.getElementById('add-service-modal').classList.add('active')}
          className="btn btn-primary"
        >
          {t('addService')}
        </button>
      </div>
      
      <div className="services-table-container">
        {filteredServices.length > 0 ? (
          <div className="table-responsive">
            <table className="services-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{t('serviceName')} (EN)</th>
                  <th>{t('serviceName')} (AR)</th>
                  <th>{t('price')}</th>
                  <th>{t('dashboardActions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map(service => (
                  <tr key={service.id}>
                    <td data-label="ID">{service.id}</td>
                    <td data-label={`${t('serviceName')} (EN)`}>
                      {editingId === service.id ? (
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          className="edit-input"
                        />
                      ) : (
                        service.name
                      )}
                    </td>
                    <td data-label={`${t('serviceName')} (AR)`}>
                      {editingId === service.id ? (
                        <input
                          type="text"
                          value={editForm.nameAr}
                          onChange={(e) => setEditForm({...editForm, nameAr: e.target.value})}
                          className="edit-input"
                        />
                      ) : (
                        service.nameAr
                      )}
                    </td>
                    <td data-label={t('price')}>
                      {editingId === service.id ? (
                        <input
                          type="number"
                          value={editForm.price}
                          onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                          className="edit-input"
                        />
                      ) : (
                        `$${service.price}`
                      )}
                    </td>
                    <td data-label={t('dashboardActions')}>
                      {editingId === service.id ? (
                        <div className="action-buttons">
                          <button 
                            onClick={handleEditSubmit}
                            className="btn-action btn-save"
                          >
                            {t('save')}
                          </button>
                          <button 
                            onClick={() => setEditingId(null)}
                            className="btn-action btn-cancel"
                          >
                            {t('cancel')}
                          </button>
                        </div>
                      ) : (
                        <div className="action-buttons">
                          <button 
                            onClick={() => startEditing(service)}
                            className="btn-action btn-edit"
                          >
                            {t('edit')}
                          </button>
                          <button 
                            onClick={() => {
                              if (window.confirm(t('dashboardConfirmDelete'))) {
                                // Handle delete
                              }
                            }}
                            className="btn-action btn-delete"
                          >
                            {t('dashboardDelete')}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-services">
            <div className="no-services-icon">💳</div>
            <p>{t('dashboardNoServicesFound')}</p>
          </div>
        )}
      </div>
      
      {/* Add Service Modal */}
      <div id="add-service-modal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{t('addService')}</h2>
            <button 
              onClick={() => document.getElementById('add-service-modal').classList.remove('active')}
              className="modal-close"
            >
              ×
            </button>
          </div>
          
          <div className="modal-body">
            <div className="form-group">
              <label>{t('serviceName')} (EN)</label>
              <input
                type="text"
                value={newService.name}
                onChange={(e) => setNewService({...newService, name: e.target.value})}
                className="form-input"
                placeholder={t('serviceName')}
              />
            </div>
            
            <div className="form-group">
              <label>{t('serviceName')} (AR)</label>
              <input
                type="text"
                value={newService.nameAr}
                onChange={(e) => setNewService({...newService, nameAr: e.target.value})}
                className="form-input"
                placeholder={t('serviceName')}
              />
            </div>
            
            <div className="form-group">
              <label>{t('price')}</label>
              <input
                type="number"
                value={newService.price}
                onChange={(e) => setNewService({...newService, price: e.target.value})}
                className="form-input"
                placeholder={t('price')}
              />
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              onClick={() => document.getElementById('add-service-modal').classList.remove('active')}
              className="btn btn-secondary"
            >
              {t('cancel')}
            </button>
            <button 
              onClick={handleAddService}
              className="btn btn-primary"
            >
              {t('addService')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceManagement;