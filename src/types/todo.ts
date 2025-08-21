export type Priority = 'low' | 'medium' | 'high'
export type FilterType = 'all' | 'active' | 'completed' | 'starred'

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: string
  priority: Priority
  dueDate?: string
  starred: boolean
  archived?: boolean
}
