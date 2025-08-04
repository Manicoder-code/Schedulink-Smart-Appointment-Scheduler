import React, { useState, useEffect } from 'react';
import { Users, RefreshCw, Mail, Phone } from 'lucide-react';
import api from '../axios';

const UsersList = ({ refreshTrigger }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  const handleRefresh = () => {
    fetchUsers();
  };

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-2 text-gray-600">Loading users...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={handleRefresh} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Users className="w-6 h-6 text-primary-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Users List</h2>
          <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
            {users.length}
          </span>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">No users found</p>
          <p className="text-gray-400 text-sm">Create your first user using the form above</p>
        </div>
      ) : (
        <div className="overflow-hidden">
          {/* Mobile view */}
          <div className="block md:hidden space-y-4">
            {users.map((user) => (
              <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <span className="text-xs text-gray-500">ID: {user.id}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <a href={`mailto:${user.email}`} className="hover:text-primary-600">
                      {user.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <a href={`tel:${user.phone}`} className="hover:text-primary-600">
                      {user.phone}
                    </a>
                  </div>
                  {user.created_at && (
                    <div className="text-xs text-gray-400">
                      Created: {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <div className="hidden md:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left table-header">ID</th>
                  <th className="px-6 py-3 text-left table-header">Name</th>
                  <th className="px-6 py-3 text-left table-header">Email</th>
                  <th className="px-6 py-3 text-left table-header">Phone</th>
                  <th className="px-6 py-3 text-left table-header">Created</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="table-cell font-medium">#{user.id}</td>
                    <td className="table-cell">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-primary-600 font-semibold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <a 
                        href={`mailto:${user.email}`} 
                        className="text-primary-600 hover:text-primary-700 hover:underline"
                      >
                        {user.email}
                      </a>
                    </td>
                    <td className="table-cell">
                      <a 
                        href={`tel:${user.phone}`} 
                        className="text-primary-600 hover:text-primary-700 hover:underline"
                      >
                        {user.phone}
                      </a>
                    </td>
                    <td className="table-cell text-gray-500">
                      {user.created_at 
                        ? new Date(user.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        : 'N/A'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;

