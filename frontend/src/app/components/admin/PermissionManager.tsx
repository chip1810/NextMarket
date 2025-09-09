import React, { useEffect, useState } from 'react';

interface Permission {
  id: number;
  code: string;
  description: string;
}

export const PermissionManager: React.FC = () => {
  const [perms, setPerms] = useState<Permission[]>([]);
  const [code, setCode] = useState('');
  const [desc, setDesc] = useState('');

  const fetchPerms = async () => {
    const res = await fetch('http://localhost:3000/admin/permissions');
    const data = await res.json();
    setPerms(data);
  };

  const handleCreatePerm = async () => {
    if (!code || !desc) return;
    await fetch('http://localhost:3000/admin/permissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, description: desc }),
    });
    setCode('');
    setDesc('');
    fetchPerms();
  };

  useEffect(() => {
    fetchPerms();
  }, []);

  return (
    <div>
      <h4>Permissions</h4>
      <ul className="list-group mb-3">
        {perms.map(p => (
          <li key={p.id} className="list-group-item">{p.code} - {p.description}</li>
        ))}
      </ul>
      <div className="mb-2">
        <input type="text" className="form-control mb-1" placeholder="Code" value={code} onChange={e => setCode(e.target.value)} />
        <input type="text" className="form-control mb-1" placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
        <button className="btn btn-primary w-100" onClick={handleCreatePerm}>Add Permission</button>
      </div>
    </div>
  );
};
