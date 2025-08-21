import React from 'react'
import { Check, X, Edit2, Trash2, Star, Archive, Calendar, AlertCircle } from 'lucide-react'
import { Todo } from '../types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onToggleStar: (id: string) => void
  onDelete: (id: string) => void
  onArchive: (id: string) => void
  onEdit: (todo: Todo) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onToggleStar, onDelete, onArchive, onEdit }) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    high: 'bg-red-100 text-red-700 border-red-200'
  }

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed

  return (
    <div className={`group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border ${todo.completed ? 'opacity-75 border-gray-100' : 'border-gray-200'}`}>
      <div className="flex items-start space-x-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 ${
            todo.completed
              ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-transparent'
              : 'border-gray-300 hover:border-indigo-500'
          }`}
        >
          {todo.completed && <Check className="w-3 h-3 text-white m-auto" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-gray-900 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
              </p>
              <div className="flex items-center space-x-3 mt-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border ${priorityColors[todo.priority]}`}>
                  {todo.priority}
                </span>
                {todo.dueDate && (
                  <span className={`inline-flex items-center space-x-1 text-xs ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(todo.dueDate).toLocaleDateString()}</span>
                    {isOverdue && <AlertCircle className="w-3 h-3" />}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => onToggleStar(todo.id)}
                className={`p-1.5 rounded-lg hover:bg-gray-100 transition-colors ${
                  todo.starred ? 'text-yellow-500' : 'text-gray-400'
                }`}
              >
                <Star className={`w-4 h-4 ${todo.starred ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => onEdit(todo)}
                className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onArchive(todo.id)}
                className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Archive className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoItem
