import React, { useState } from 'react';
import { sanitizeInput } from '../utils/helpers';
import useLanguage from '../hooks/useLanguage';

const ServiceManagement = ({ services, updateService, addService }) => {
  const { t } = useLanguage();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', nameAr: '', price: '' });
  const [newService, setNewService] = useState({ name: '', nameAr: '', price: '' });

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
    <div className="glass card">
      <h2 className="card-header">{t('manageServices')}</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">{t('addService')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            value={newService.name}
            onChange={(e) => setNewService({...newService, name: e.target.value})}
            className="form-input"
            placeholder="Service Name (EN)"
          />
          <input
            type="text"
            value={newService.nameAr}
            onChange={(e) => setNewService({...newService, nameAr: e.target.value})}
            className="form-input"
            placeholder="Service Name (AR)"
          />
          <input
            type="number"
            value={newService.price}
            onChange={(e) => setNewService({...newService, price: e.target.value})}
            className="form-input"
            placeholder="Price"
          />
          <button 
            onClick={handleAddService}
            className="btn btn-primary"
          >
            {t('addService')}
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">{t('serviceName')} (EN)</th>
              <th className="px-4 py-2 text-left">{t('serviceName')} (AR)</th>
              <th className="px-4 py-2 text-left">{t('price')}</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td className="px-4 py-2">{service.id}</td>
                <td className="px-4 py-2">
                  {editingId === service.id ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="form-input"
                    />
                  ) : (
                    service.name
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === service.id ? (
                    <input
                      type="text"
                      value={editForm.nameAr}
                      onChange={(e) => setEditForm({...editForm, nameAr: e.target.value})}
                      className="form-input"
                    />
                  ) : (
                    service.nameAr
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === service.id ? (
                    <input
                      type="number"
                      value={editForm.price}
                      onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                      className="form-input"
                    />
                  ) : (
                    service.price
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === service.id ? (
                    <div className="flex space-x-2">
                      <button 
                        onClick={handleEditSubmit}
                        className="btn btn-primary"
                      >
                        {t('save')}
                      </button>
                      <button 
                        onClick={() => setEditingId(null)}
                        className="btn btn-secondary"
                      >
                        {t('cancel')}
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => startEditing(service)}
                      className="btn btn-secondary"
                    >
                      {t('edit')}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceManagement;