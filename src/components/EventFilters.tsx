
import React from 'react';

interface EventFiltersProps {
  activeFilter: 'ACTIVE' | 'INACTIVE' | 'ALL';
  onFilterChange: (filter: 'ACTIVE' | 'INACTIVE' | 'ALL') => void;
}

export const EventFilters: React.FC<EventFiltersProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Browse Events</h2>
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg w-fit">
        <button
          onClick={() => onFilterChange('ALL')}
          className={`px-6 py-2 rounded-md transition-all duration-200 font-medium ${
            activeFilter === 'ALL'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          All Events
        </button>
        <button
          onClick={() => onFilterChange('ACTIVE')}
          className={`px-6 py-2 rounded-md transition-all duration-200 font-medium ${
            activeFilter === 'ACTIVE'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Active Events
        </button>
        <button
          onClick={() => onFilterChange('INACTIVE')}
          className={`px-6 py-2 rounded-md transition-all duration-200 font-medium ${
            activeFilter === 'INACTIVE'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Inactive Events
        </button>
      </div>
    </div>
  );
};
