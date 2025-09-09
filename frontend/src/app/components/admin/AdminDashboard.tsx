import React, { useState } from 'react';
import { RoleManager } from './RoleManager';
import { PermissionManager } from './PermissionManager';
import { UserRoleManager } from './UserRoleManager';

export const AdminDashboard: React.FC = () => {
  const [tab, setTab] = useState<'roles' | 'permissions' | 'userRoles'>('roles');

  return (
    <div className="container mt-4">
      <h2>Super Admin Dashboard</h2>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className={`nav-link ${tab === 'roles' ? 'active' : ''}`} onClick={() => setTab('roles')}>Roles</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === 'permissions' ? 'active' : ''}`} onClick={() => setTab('permissions')}>Permissions</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === 'userRoles' ? 'active' : ''}`} onClick={() => setTab('userRoles')}>User-Roles</button>
        </li>
      </ul>

      <div className="mt-3">
        {tab === 'roles' && <RoleManager />}
        {tab === 'permissions' && <PermissionManager />}
        {tab === 'userRoles' && <UserRoleManager />}
      </div>
    </div>
  );
};
