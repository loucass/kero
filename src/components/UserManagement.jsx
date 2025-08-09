import React, { useState } from 'react';
import useLanguage from '../hooks/useLanguage';

const UserManagement = ({ users }) => {
  const { t } = useLanguage();
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => {
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.referralId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="service-management">
      <div className="section-header">
        <h2>{t('users')}</h2>
        <p>{t('dashboardManageUsers')}</p>
      </div>
      
      <div className="user-controls">
        <div className="search-container">
          <div className="search-icon">🔍</div>
          <input
            type="text"
            placeholder={t('dashboardSearchUsers')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">{t('dashboardAllRoles')}</option>
            <option value="normal">{t('dashboardNormalUsers')}</option>
            <option value="marketing">{t('dashboardMarketingUsers')}</option>
            <option value="admin">{t('dashboardAdminUsers')}</option>
          </select>
        </div>
      </div>
      
      <div className="users-table-container">
        {filteredUsers.length > 0 ? (
          <div className="table-responsive">
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{t('username')}</th>
                  <th>{t('referralId')}</th>
                  <th>{t('dashboardRole')}</th>
                  <th>{t('dashboardStatus')}</th>
                  <th>{t('dashboardActions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.referralId}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${user.role === 'normal' ? 'active' : 'active'}`}>
                        {t('dashboardActive')}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-action btn-edit">
                          {t('edit')}
                        </button>
                        <button className="btn-action btn-delete">
                          {t('dashboardDelete')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-users">
            <div className="no-users-icon">👥</div>
            <p>{t('dashboardNoUsersFound')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;