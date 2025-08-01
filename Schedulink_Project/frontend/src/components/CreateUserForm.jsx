import React, { useState } from 'react';
import api from '../axios';

function CreateUserForm() {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await api.post('/users', { name });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-x-2">
      <input
        type="text"
        placeholder="User Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add User
      </button>
    </form>
  );
}

export default CreateUserForm;

