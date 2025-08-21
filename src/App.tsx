import React, { useState, useEffect } from 'react'
import { Plus, Check, X, Edit2, Trash2, Calendar, Clock, Filter, Search, CheckCircle2, Circle, Star, Archive, TrendingUp } from 'lucide-react'
import TodoItem from './components/TodoItem'
import AddTodoForm from './components/AddTodoForm'
import FilterBar from './components/FilterBar'
import Stats from './components/Stats'
import { Todo, FilterType, Priority } from './types/todo'

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string, priority: Priority, dueDate?: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      priority,
      dueDate,
      starred: false
    }
    setTodos([newTodo, ...todos])
    setShowAddForm(false)
  }

  const updateTodo = (id: string, text: string, priority: Priority, dueDate?: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text, priority, dueDate } : todo
    ))
    setEditingTodo(null)
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const toggleStar = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, starred: !todo.starred } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const archiveTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, archived: true } : todo
    ))
  }

  const filteredTodos = todos
    .filter(todo => !todo.archived)
    .filter(todo => {
      if (filter === 'active') return !todo.completed
      if (filter === 'completed') return todo.completed
      if (filter === 'starred') return todo.starred
      return true
    })
    .filter(todo =>
      todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (a.starred && !b.starred) return -1
      if (!a.starred && b.starred) return 1
      if (a.priority === 'high' && b.priority !== 'high') return -1
      if (a.priority !== 'high' && b.priority === 'high') return 1
      if (a.priority === 'medium' && b.priority === 'low') return -1
      if (a.priority === 'low' && b.priority === 'medium') return 1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  const stats = {
    total: todos.filter(t => !t.archived).length,
    completed: todos.filter(t => t.completed && !t.archived).length,
    active: todos.filter(t => !t.completed && !t.archived).length,
    starred: todos.filter(t => t.starred && !t.archived).length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                TaskFlow
              </h1>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Task</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <Stats stats={stats} />

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
            />
          </div>
          <FilterBar currentFilter={filter} onFilterChange={setFilter} />
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <CheckCircle2 className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-500">
                {searchQuery ? 'Try adjusting your search' : 'Create your first task to get started'}
              </p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onToggleStar={toggleStar}
                onDelete={deleteTodo}
                onArchive={archiveTodo}
                onEdit={setEditingTodo}
              />
            ))
          )}
        </div>
      </main>

      {/* Add/Edit Todo Modal */}
      {(showAddForm || editingTodo) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
            <AddTodoForm
              onAdd={editingTodo ? updateTodo : addTodo}
              onCancel={() => {
                setShowAddForm(false)
                setEditingTodo(null)
              }}
              editingTodo={editingTodo}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
