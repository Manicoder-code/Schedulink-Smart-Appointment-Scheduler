import React, { useState, useEffect } from 'react';
import { Calendar, Clock, RefreshCw, User, CheckCircle, XCircle } from 'lucide-react';
import api from '../axios';

const SlotsList = ({ refreshTrigger }) => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSlots = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/slots');
      setSlots(response.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setError('Failed to load appointment slots. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [refreshTrigger]);

  const handleRefresh = () => {
    fetchSlots();
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    try {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return timeString;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short'
      });
    } catch (error) {
      return dateString;
    }
  };

  const getSlotStatus = (slot) => {
    const now = new Date();
    const slotDate = new Date(slot.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    slotDate.setHours(0, 0, 0, 0);

    if (slotDate < today) {
      return { status: 'past', label: 'Past', color: 'text-gray-500 bg-gray-100' };
    } else if (slotDate.getTime() === today.getTime()) {
      return { status: 'today', label: 'Today', color: 'text-blue-700 bg-blue-100' };
    } else {
      return { status: 'upcoming', label: 'Upcoming', color: 'text-green-700 bg-green-100' };
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-2 text-gray-600">Loading appointment slots...</span>
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
          <Calendar className="w-6 h-6 text-primary-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Appointment Slots</h2>
          <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
            {slots.length}
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

      {slots.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">No appointment slots found</p>
          <p className="text-gray-400 text-sm">Create your first appointment slot using the form above</p>
        </div>
      ) : (
        <div className="overflow-hidden">
          {/* Mobile view */}
          <div className="block lg:hidden space-y-4">
            {slots.map((slot) => {
              const slotStatus = getSlotStatus(slot);
              return (
                <div key={slot.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg">{slot.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${slotStatus.color}`}>
                      {slotStatus.label}
                    </span>
                  </div>
                  
                  {slot.description && (
                    <p className="text-gray-600 text-sm mb-3">{slot.description}</p>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDate(slot.date)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</span>
                    </div>
                    {slot.user_id && (
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="w-4 h-4 mr-2" />
                        <span>Assigned to User #{slot.user_id}</span>
                      </div>
                    )}
                    <div className="text-xs text-gray-400 mt-2">
                      Slot ID: {slot.id}
                      {slot.created_at && (
                        <span className="ml-2">
                          • Created: {new Date(slot.created_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop view */}
          <div className="hidden lg:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left table-header">ID</th>
                  <th className="px-6 py-3 text-left table-header">Title</th>
                  <th className="px-6 py-3 text-left table-header">Date</th>
                  <th className="px-6 py-3 text-left table-header">Time</th>
                  <th className="px-6 py-3 text-left table-header">User</th>
                  <th className="px-6 py-3 text-left table-header">Status</th>
                  <th className="px-6 py-3 text-left table-header">Created</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {slots.map((slot) => {
                  const slotStatus = getSlotStatus(slot);
                  return (
                    <tr key={slot.id} className="hover:bg-gray-50">
                      <td className="table-cell font-medium">#{slot.id}</td>
                      <td className="table-cell">
                        <div>
                          <div className="font-medium text-gray-900">{slot.title}</div>
                          {slot.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {slot.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <span>{formatDate(slot.date)}</span>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium">
                              {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell">
                        {slot.user_id ? (
                          <div className="flex items-center">
                            <User className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-primary-600">#{slot.user_id}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">Unassigned</span>
                        )}
                      </td>
                      <td className="table-cell">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${slotStatus.color}`}>
                          {slotStatus.label}
                        </span>
                      </td>
                      <td className="table-cell text-gray-500">
                        {slot.created_at 
                          ? new Date(slot.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })
                          : 'N/A'
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotsList;

