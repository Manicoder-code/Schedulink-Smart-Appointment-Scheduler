import React from 'react';
import { Calendar, Users, Clock, ExternalLink, Moon, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header = () => {
  const { isDarkMode, toggleDarkMode, userRole } = useApp();
  
  const openApiDocs = () => {
    window.open('http://localhost:8000/docs', '_blank');
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Schedulink</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Smart Appointment Scheduler</p>
              </div>
            </div>
          </div>

          {/* Stats - Only show User Management for master */}
          <div className="hidden md:flex items-center space-x-6">
            {userRole === 'master' && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Users className="w-4 h-4 mr-1" />
                <span>User Management</span>
              </div>
            )}
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4 mr-1" />
              <span>Real-time Tracking</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* API Docs Link - Only for master */}
            {userRole === 'master' && (
              <button
                onClick={openApiDocs}
                className="flex items-center px-3 py-2 text-sm bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-lg transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">API Docs</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

