import React from 'react'
import { FilterType } from '../types/todo'
import { ListTodo, CheckCircle, Circle, Star } from 'lucide-react'

interface FilterBarProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

const FilterBar: React.FC<FilterBarProps> = ({ currentFilter, onFilterChange }) => {
  const filters: { type: FilterType; label: string; icon: React.ReactNode }[] = [
    { type: 'all', label: 'All Tasks', icon: <ListTodo className="w-4 h-4" /> },
    { type: 'active', label: 'Active', icon: <Circle className="w-4 h-4" /> },
    { type: 'completed', label: 'Completed', icon: <CheckCircle className="w-4 h-4" /> },
    { type: 'starred', label: 'Starred', icon: <Star className="w-4 h-4" /> }
  ]

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {filters.map(({ type, label, icon }) => (
        <button
          key={type}
          onClick={() => onFilterChange(type)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
            currentFilter === type
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}

export default FilterBar
