// src/components/UserRoleManager.tsx
import React, { useEffect, useState } from 'react';

interface Role { id: number; name: string }
interface User { id: number; email: string }
interface UserRole { id: number; user: User; role: Role }

export const UserRoleManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3000/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        console.error("Fetch users failed:", res.status, res.statusText);
        return;
      }
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error(err);
      setUsers([]);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await fetch('http://localhost:3000/admin/roles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        console.error("Fetch roles failed:", res.status, res.statusText);
        return;
      }
      const data = await res.json();
      setRoles(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error(err);
      setRoles([]);
    }
  };

  const fetchUserRoles = async () => {
    try {
      const res = await fetch('http://localhost:3000/admin/user-roles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        console.error("Fetch user-roles failed:", res.status, res.statusText);
        return;
      }
      const data = await res.json();
      setUserRoles(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error(err);
      setUserRoles([]);
    }
  };

  const assignRole = async () => {
    if (!selectedUser || !selectedRole) return;
    try {
      const res = await fetch(`http://localhost:3000/admin/users/${selectedUser}/roles/${selectedRole}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        console.error("Assign role failed:", res.status, res.statusText);
        return;
      }
      fetchUserRoles();
    } catch (err) {
      console.error(err);
    }
  };

  const removeUserRole = async (userId: number, roleId: number) => {
    try {
      const res = await fetch(`http://localhost:3000/admin/users/${userId}/roles/${roleId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        console.error("Remove user-role failed:", res.status, res.statusText);
        return;
      }
      fetchUserRoles();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchUserRoles();
  }, []);

  return (
    <div>
      <h4>User Roles</h4>
      <div className="mb-2 d-flex gap-2">
        <select className="form-select" value={selectedUser || ''} onChange={e => setSelectedUser(Number(e.target.value))}>
          <option value="">Select user</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.email}</option>)}
        </select>

        <select className="form-select" value={selectedRole || ''} onChange={e => setSelectedRole(Number(e.target.value))}>
          <option value="">Select role</option>
          {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>

        <button className="btn btn-success" onClick={assignRole}>Assign Role</button>
      </div>

      <ul className="list-group">
        {userRoles.map(ur => (
          <li key={`${ur.user.id}-${ur.role.id}`} className="list-group-item d-flex justify-content-between">
            {ur.user.email} → {ur.role.name}
            <button className="btn btn-sm btn-danger" onClick={() => removeUserRole(ur.user.id, ur.role.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
