export interface stage {
  id: number
  label: string
  color: string
  isDeleted: boolean
}

export interface taskInput {
  name: string
  assignee: string
  parent: string
  linkedTo: string
  priority: string
  stage: stage
  startDate: string
  dueDate: string
  description: string
}

export interface task extends taskInput {
  id: number
  createdAt: number
  updatedAt: number
  isDeleted: boolean
}
