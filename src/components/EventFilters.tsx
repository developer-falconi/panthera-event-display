
import React from 'react';

interface EventFiltersProps {
  activeFilter: 'ACTIVE' | 'INACTIVE';
  onFilterChange: (filter: 'ACTIVE' | 'INACTIVE') => void;
}

export const EventFilters: React.FC<EventFiltersProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="mb-8">
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => onFilterChange('ACTIVE')}
          className={`px-6 py-2 rounded-md transition-all duration-200 font-medium ${
            activeFilter === 'ACTIVE'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Active Events
        </button>
        <button
          onClick={() => onFilterChange('INACTIVE')}
          className={`px-6 py-2 rounded-md transition-all duration-200 font-medium ${
            activeFilter === 'INACTIVE'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Inactive Events
        </button>
      </div>
    </div>
  );
};
