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
  const [roleName, setRoleName] = useState('');
  const token = localStorage.getItem("token");

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

  const handleSelectRole = (roleId: number) => {
    const role = roles.find(r => r.id === roleId) || null;
    setSelectedRole(role);
    setRoleName(role?.name || '');
    setSelectedPerms(new Set(role?.permissions.map(p => p.id) || []));
  };

  const handleTogglePerm = (permId: number) => {
    const newSet = new Set(selectedPerms);
    if (newSet.has(permId)) newSet.delete(permId);
    else newSet.add(permId);
    setSelectedPerms(newSet);
  };

  const handleToggleAll = () => {
    if (selectedPerms.size === permissions.length) {
      setSelectedPerms(new Set());
    } else {
      setSelectedPerms(new Set(permissions.map(p => p.id)));
    }
  };

  const handleSave = async () => {
    try {
      let roleId = selectedRole?.id;

      // Nếu không có role đã chọn -> tạo mới
      if (!roleId) {
        if (!roleName.trim()) {
          alert("Please enter role name");
          return;
        }
        const res = await fetch('http://localhost:3000/admin/roles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ name: roleName })
        });
        const data = await res.json();
        roleId = data.id || data.data?.id;
      } else {
        // Cập nhật tên role nếu thay đổi
       if (selectedRole && selectedRole.name !== roleName) {
  await fetch(`http://localhost:3000/admin/roles/${selectedRole.id}`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json', 
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify({ name: roleName })
  });
}

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
      setRoleName('');
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
          <option value="">-- Create / Select Role --</option>
          {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>

        <input
          type="text"
          className="form-control"
          placeholder="Role name"
          value={roleName}
          onChange={e => setRoleName(e.target.value)}
        />
      </div>

      {/* Permissions checkboxes */}
      <div className="mb-3">
        <label>Permissions:</label>
        <div className="d-flex flex-wrap gap-2 mt-2">
          <button className="btn btn-sm btn-secondary mb-2" onClick={handleToggleAll}>
            {selectedPerms.size === permissions.length ? 'Uncheck All' : 'Check All'}
          </button>
          {permissions.map(p => (
            <label key={p.id} className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                checked={selectedPerms.has(p.id)}
                onChange={() => handleTogglePerm(p.id)}
              />
              <span className="form-check-label">{p.description}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleSave}>Save Role</button>
    </div>
  );
};
