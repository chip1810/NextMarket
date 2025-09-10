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
}

export const RoleManager: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedPerms, setSelectedPerms] = useState<Set<number>>(new Set());
  const [newRoleName, setNewRoleName] = useState('');
  const token = localStorage.getItem("token");

  // Fetch roles
  const fetchRoles = async () => {
    try {
      const res = await fetch('http://localhost:3000/admin/roles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) return;
      const data = await res.json();
      const rolesWithPerms: Role[] = (data.data || data).map((r: any) => ({
        id: r.id,
        name: r.name,
        permissions: r.rolePermissions ? r.rolePermissions.map((rp: any) => rp.permission) : []
      }));
      setRoles(rolesWithPerms);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch permissions
  const fetchPermissions = async () => {
    try {
      const res = await fetch('http://localhost:3000/admin/permissions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) return;
      const data = await res.json();
      setPermissions(data.data || data);
    } catch (err) {
      console.error(err);
    }
  };

  // Chọn role
  const handleSelectRole = (roleId: number) => {
    const role = roles.find(r => r.id === roleId) || null;
    setSelectedRole(role);
    setSelectedPerms(new Set(role?.permissions.map(p => p.id) || []));
    setNewRoleName('');
  };

  // Toggle checkbox permission
  const handleTogglePerm = (permId: number) => {
    const newSet = new Set(selectedPerms);
    if (newSet.has(permId)) newSet.delete(permId);
    else newSet.add(permId);
    setSelectedPerms(newSet);
  };

  // Save role (cập nhật hoặc tạo mới)
  const handleSave = async () => {
    try {
      let roleId = selectedRole?.id;

      // Nếu không có role đã chọn -> tạo mới
      if (!roleId) {
        if (!newRoleName.trim()) {
          alert("Please enter role name");
          return;
        }
        const res = await fetch('http://localhost:3000/admin/roles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ name: newRoleName })
        });
        const data = await res.json();
        roleId = data.id || data.data?.id;
      }

      // Lấy permission cũ (nếu có)
      const oldPermIds = selectedRole?.permissions.map(p => p.id) || [];

      // Xóa permission cũ không còn check
      for (const pid of oldPermIds) {
        if (!selectedPerms.has(pid)) {
          await fetch(`http://localhost:3000/admin/roles/${roleId}/permissions/${pid}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
          });
        }
      }

      // Thêm permission mới
      for (const pid of Array.from(selectedPerms)) {
        if (!oldPermIds.includes(pid)) {
          await fetch(`http://localhost:3000/admin/roles/${roleId}/permissions/${pid}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
          });
        }
      }

      fetchRoles();
      setSelectedRole(null);
      setSelectedPerms(new Set());
      setNewRoleName('');
      alert('Role saved successfully!');
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
      <h4>Role Manager</h4>

      {/* Chọn role hoặc tạo mới */}
      <div className="mb-3">
        <label>Role:</label>
        <select
          className="form-select mb-2"
          value={selectedRole?.id || ''}
          onChange={e => handleSelectRole(Number(e.target.value))}
        >
          <option value="">-- Create New Role --</option>
          {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
        {!selectedRole && (
          <input
            type="text"
            className="form-control"
            placeholder="New role name"
            value={newRoleName}
            onChange={e => setNewRoleName(e.target.value)}
          />
        )}
      </div>

      {/* Permissions checkboxes */}
      <div className="mb-3">
        <label>Permissions:</label>
        <div className="d-flex flex-wrap gap-2 mt-2">
          {permissions.map(p => (
            <label key={p.id} className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                checked={selectedPerms.has(p.id)}
                onChange={() => handleTogglePerm(p.id)}
              />
              <span className="form-check-label">{p.code}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleSave}>Save Role</button>
    </div>
  );
};
