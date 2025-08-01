import React, { useEffect, useState } from 'react';
import api from '../axios';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users').then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mt-4">User List</h2>
      <ul className="list-disc pl-6">
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;

