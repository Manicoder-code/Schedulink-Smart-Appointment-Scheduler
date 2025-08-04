import React, { useState } from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import api from '../axios';

const SlotForm = ({ onSlotCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    start_time: '',
    end_time: '',
    user_id: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }
    
    if (!formData.start_time) {
      newErrors.start_time = 'Start time is required';
    }
    
    if (!formData.end_time) {
      newErrors.end_time = 'End time is required';
    } else if (formData.start_time && formData.end_time <= formData.start_time) {
      newErrors.end_time = 'End time must be after start time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Prepare data for API
      const slotData = {
        title: formData.title,
        description: formData.description || null,
        date: formData.date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        user_id: formData.user_id ? parseInt(formData.user_id) : null
      };

      const response = await api.post('/slots', slotData);
      console.log('Slot created:', response.data);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        date: '',
        start_time: '',
        end_time: '',
        user_id: ''
      });
      
      // Notify parent component
      if (onSlotCreated) {
        onSlotCreated(response.data);
      }
      
      // Show success message
      alert('Appointment slot created successfully!');
    } catch (error) {
      console.error('Error creating slot:', error);
      alert('Error creating slot. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="card">
      <div className="flex items-center mb-6">
        <Calendar className="w-6 h-6 text-primary-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Create Appointment Slot</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Appointment Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`input-field ${errors.title ? 'border-red-500' : ''}`}
            placeholder="e.g., Consultation, Meeting, Checkup"
            disabled={loading}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="input-field resize-none"
            placeholder="Add any additional details about this appointment slot"
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <div className="relative">
              <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                className={`input-field pl-10 ${errors.date ? 'border-red-500' : ''}`}
                disabled={loading}
              />
            </div>
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>

          <div>
            <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 mb-1">
              User ID (Optional)
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                id="user_id"
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Assign to user ID"
                disabled={loading}
                min="1"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="start_time" className="block text-sm font-medium text-gray-700 mb-1">
              Start Time *
            </label>
            <div className="relative">
              <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="time"
                id="start_time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                className={`input-field pl-10 ${errors.start_time ? 'border-red-500' : ''}`}
                disabled={loading}
              />
            </div>
            {errors.start_time && <p className="text-red-500 text-xs mt-1">{errors.start_time}</p>}
          </div>

          <div>
            <label htmlFor="end_time" className="block text-sm font-medium text-gray-700 mb-1">
              End Time *
            </label>
            <div className="relative">
              <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="time"
                id="end_time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                className={`input-field pl-10 ${errors.end_time ? 'border-red-500' : ''}`}
                disabled={loading}
              />
            </div>
            {errors.end_time && <p className="text-red-500 text-xs mt-1">{errors.end_time}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`btn-primary w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Creating Slot...' : 'Create Appointment Slot'}
        </button>
      </form>
    </div>
  );
};

export default SlotForm;

