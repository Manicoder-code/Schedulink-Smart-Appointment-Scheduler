import React, { useState } from 'react';
import { User, Mail, Phone } from 'lucide-react';
import api from '../axios';

const UserForm = ({ onUserCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
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
      const response = await api.post('/users', formData);
      console.log('User created:', response.data);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: ''
      });
      
      // Notify parent component
      if (onUserCreated) {
        onUserCreated(response.data);
      }
      
      // Show success message (you could implement a toast notification)
      alert('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center mb-6">
        <User className="w-6 h-6 text-primary-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Create New User</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter full name"
              disabled={loading}
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Enter email address"
              disabled={loading}
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="Enter phone number"
              disabled={loading}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`btn-primary w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Creating User...' : 'Create User'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;

