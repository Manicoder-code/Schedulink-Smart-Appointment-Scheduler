import React, { useState } from 'react';
import { X, Calendar, Users, Clock, Shield } from 'lucide-react';

const WelcomeModal = ({ isOpen, onClose, onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState('');

  if (!isOpen) return null;

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to Schedulink
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Smart Appointment Scheduler for Modern Businesses
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              🎉 Cognizant Vibe Coding 2025
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Experience our cutting-edge appointment scheduling system with advanced features 
              including user management, real-time slot tracking, and comprehensive API documentation.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              What would you like to do?
            </h3>
            
            <div className="space-y-3">
              <button
                onClick={() => setSelectedRole('guest')}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  selectedRole === 'guest'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                } text-left`}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Browse as Guest</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      View available slots and make appointments
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedRole('master')}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  selectedRole === 'master'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                } text-left`}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Access as Master</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Full access to user management and API documentation
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              Skip for now
            </button>
            <button
              onClick={handleContinue}
              disabled={!selectedRole}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                selectedRole
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;

