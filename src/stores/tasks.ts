import { defineStore } from 'pinia'

// Stores
import { useStagesStore } from '@/stores/stages'

// Types
import type { task } from '@/types/index'

export const useTasksStore = defineStore('tasks', {
  state: () => {
    return {
      assignees: ['Shayak', 'Chatresh', 'Ashiya', 'Ekta'],
      parents: ['Case', 'Opportunity', 'Lead'],
      linkedTos: ['Jivin Mehra', 'Etasha Gameti', 'Diksha Bal', 'Tanisha Pandey', 'Saurabh Sen'],
      priorities: ['Low', 'Medium', 'High'],
      tasks: [] as task[],
      taskAutoId: 0
    }
  },
  getters: {
    getAllTasks(): task[] {
      return this.tasks.filter((task) => !task.isDeleted)
    },
    getPaginatedTasks: function () {
      return (pageSize: number, pageNumber: number) => {
        return this.getAllTasks.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
      }
    },
    getTaskById: function () {
      return (id: number) => this.tasks.find((task) => task.id === id)
    }
  },
  actions: {
    addTask(payload: task) {
      const timestamp = new Date().getTime()
      const {
        id = ++this.taskAutoId,
        name,
        assignee,
        parent,
        linkedTo,
        priority,
        stage,
        startDate,
        dueDate,
        description,
        isDeleted = false,
        createdAt = timestamp,
        updatedAt = timestamp,
      } = payload

      this.tasks.push({
        id,
        name,
        assignee,
        parent,
        linkedTo,
        priority,
        stage,
        startDate,
        dueDate,
        description,
        isDeleted,
        createdAt,
        updatedAt,
      })
    },
    updateTaskById(id: number, taskData: task) {
      let index = this.tasks.findIndex((task) => task.id === id)

      if (index !== -1) {
        this.tasks[index] = { ...taskData }
        this.tasks[index].updatedAt = new Date().getTime()
      }
    },
    deleteTaskById(id: number) {
      const task = this.getTaskById(id)

      if (task) {
        task.isDeleted = true
      }
    }
  }
})
