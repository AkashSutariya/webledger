import { defineStore } from 'pinia'

// Types
import type { stage } from '@/types/index'

export const useStagesStore = defineStore('stages', {
  state: () => {
    return {
      stages: [
        {
          id: 1,
          label: 'Not Started',
          color: '#052e16',
          isDeleted: false
        },
        {
          id: 2,
          label: 'Started',
          color: '#052e16',
          isDeleted: false
        },
        {
          id: 3,
          label: 'Completed',
          color: '#16a34a',
          isDeleted: false
        },
        {
          id: 4,
          label: 'Cancelled',
          color: '#dc2626',
          isDeleted: false
        },
        {
          id: 5,
          label: 'Deferred',
          color: '#9ca38f',
          isDeleted: false
        }
      ] as stage[],
      stageAutoId: 5,
      stageColors: [
        '#052e16',
        '#9ca38f',
        '#dc2626',
        '#16a34a',
        '#fef08a',
        '#bef264',
        '#34d399',
        '#115e59',
        '#0891b2',
        '#3b82f6'
      ]
    }
  },
  getters: {
    getStages(): stage[] {
      return this.stages.filter((stage) => !stage.isDeleted)
    },
    getStageById: function () {
      return (id: number) => this.stages.find((stage) => stage.id === id)
    }
  },
  actions: {
    addStage() {
      this.stages.push({
        id: ++this.stageAutoId,
        label: 'Stage - ' + this.stageAutoId,
        color: this.stageColors[Math.floor(Math.random() * 10)],
        isDeleted: false
      })
    },
    deleteStageById(id: number) {
      const stage = this.getStageById(id)
      if (stage) {
        stage.isDeleted = true
      }
    }
  }
})
