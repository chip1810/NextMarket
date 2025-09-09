// src/components/RoleManager.tsx
import React, { useEffect, useState } from 'react';

interface Permission {
  id: number;
  code: string;
  description: string;
}

interface Role {
  id: number;
  name: string;
  permissions: Permission[];
  permissionCount?: number;
}

export const RoleManager: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [selectedPermission, setSelectedPermission] = useState<number | null>(null);
  const [newRoleName, setNewRoleName] = useState<string>("");

  const fetchRoles = async () => {
    try {
      const res = await fetch('http://localhost:3000/admin/roles');
      const data = await res.json();
      const rolesWithCount: Role[] = (data.data || data).map((r: any) => ({
        ...r,
        permissionCount: r.rolePermissions ? r.rolePermissions.length : 0,
        permissions: r.rolePermissions ? r.rolePermissions.map((rp: any) => rp.permission) : [],
      }));
      setRoles(rolesWithCount);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPermissions = async () => {
    try {
      const res = await fetch('http://localhost:3000/admin/permissions');
      const data = await res.json();
      setPermissions(data.data || data);
    } catch (err) {
      console.error(err);
    }
  };

  const createRole = async () => {
    if (!newRoleName.trim()) return;
    try {
      await fetch('http://localhost:3000/admin/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newRoleName })
      });
      setNewRoleName("");
      fetchRoles();
    } catch (err) {
      console.error(err);
    }
  };

  const assignPermission = async () => {
    if (!selectedRole || !selectedPermission) return;
    try {
      await fetch(`http://localhost:3000/admin/roles/${selectedRole}/permissions/${selectedPermission}`, { method: 'POST' });
      fetchRoles();
    } catch (err) {
      console.error(err);
    }
  };

  const removePermission = async (roleId: number, permId: number) => {
    try {
      await fetch(`http://localhost:3000/admin/roles/${roleId}/permissions/${permId}`, { method: 'DELETE' });
      fetchRoles();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  return (
    <div>
      <h4>Roles & Permissions</h4>

      {/* Create role */}
      <div className="mb-3 d-flex gap-2 align-items-center">
        <input
          type="text"
          className="form-control"
          placeholder="New role name"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={createRole}>
          Create Role
        </button>
      </div>

      {/* Assign permission */}
      <div className="mb-3 d-flex gap-2 align-items-center">
        <select
          className="form-select"
          value={selectedRole || ''}
          onChange={e => setSelectedRole(Number(e.target.value))}
        >
          <option value="">Select role</option>
          {roles.map(r => (
            <option key={r.id} value={r.id}>
              {r.name} ({r.permissionCount || 0} perm)
            </option>
          ))}
        </select>

        <select
          className="form-select"
          value={selectedPermission || ''}
          onChange={e => setSelectedPermission(Number(e.target.value))}
        >
          <option value="">Select permission</option>
          {permissions.map(p => (
            <option key={p.id} value={p.id}>
              {p.code}
            </option>
          ))}
        </select>

        <button className="btn btn-success" onClick={assignPermission}>
          Assign Permission
        </button>
      </div>

      {/* Roles list */}
      <ul className="list-group">
        {roles.map(role => (
          <li key={role.id} className="list-group-item">
            <strong>{role.name}</strong> ({role.permissionCount || 0} perm)
            <ul className="mt-1">
              {role.permissions.map(p => (
                <li
                  key={p.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  {p.code}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removePermission(role.id, p.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
