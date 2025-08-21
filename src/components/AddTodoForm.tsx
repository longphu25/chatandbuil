import React, { useState, useEffect } from 'react'
import { X, Calendar, Flag } from 'lucide-react'
import { Priority, Todo } from '../types/todo'

interface AddTodoFormProps {
  onAdd: (text: string, priority: Priority, dueDate?: string) => void
  onCancel: () => void
  editingTodo?: Todo | null
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd, onCancel, editingTodo }) => {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text)
      setPriority(editingTodo.priority)
      setDueDate(editingTodo.dueDate || '')
    }
  }, [editingTodo])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      if (editingTodo) {
        onAdd(editingTodo.id, text.trim(), priority, dueDate || undefined)
      } else {
        onAdd(text.trim(), priority, dueDate || undefined)
      }
      setText('')
      setPriority('medium')
      setDueDate('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {editingTodo ? 'Edit Task' : 'Add New Task'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Description
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 resize-none"
            rows={3}
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Flag className="w-4 h-4 inline mr-1" />
            Priority
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['low', 'medium', 'high'] as Priority[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`py-2 px-4 rounded-lg font-medium capitalize transition-all duration-200 ${
                  priority === p
                    ? p === 'low'
                      ? 'bg-green-100 text-green-700 border-2 border-green-300'
                      : p === 'medium'
                      ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
                      : 'bg-red-100 text-red-700 border-2 border-red-300'
                    : 'bg-gray-50 text-gray-600 border-2 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Due Date (Optional)
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div className="flex space-x-3 mt-6">
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {editingTodo ? 'Update Task' : 'Add Task'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default AddTodoForm
