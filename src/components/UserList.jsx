import React from 'react';
import useLanguage from '../hooks/useLanguage';

const UserList = ({ users, roleFilter }) => {
  const { t } = useLanguage();

  const filteredUsers = roleFilter 
    ? users.filter(user => user.role === roleFilter)
    : users;

  return (
    <div className="glass card">
      <h2 className="card-header">{t('users')}</h2>
      
      {filteredUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">{t('username')}</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">{t('referralId')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2">{user.referralId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>{t('noUsers')}</p>
      )}
    </div>
  );
};

export default UserList;