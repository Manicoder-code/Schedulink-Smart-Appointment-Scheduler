import React, { useState, useEffect } from 'react';
import api from '../axios';

function CreateSlotForm() {
  const [userId, setUserId] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users').then((res) => setUsers(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !start || !end) return;
    await api.post('/slots', { user_id: parseInt(userId), start, end });
    setUserId('');
    setStart('');
    setEnd('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <select value={userId} onChange={(e) => setUserId(e.target.value)} className="border p-2 rounded w-full">
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <input
        type="datetime-local"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="datetime-local"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Create Slot
      </button>
    </form>
  );
}

export default CreateSlotForm;

