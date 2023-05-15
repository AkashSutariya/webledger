<template>
  <div class="bg-slate-300 h-full">
    <!--START: TASK HEADER -->
    <div class="p-4 flex justify-between bg-white">
      <p class="text-xl font-bold">Tasks</p>
      <div class="flex gap-2">
        <Button label="Create">
          <template v-slot:icon>
            <PlusIcon class="h-4 w-4" />
          </template>
        </Button>
        <Button type="secondary">
          <template v-slot:icon>
            <ListBulletIcon class="h-5 w-5" />
          </template>
        </Button>
      </div>
    </div>
    <!--END: TASK HEADER -->
    <!--START: TASK VIEW -->
    <div class="m-4 p-3 rounded bg-white">
      <!--START: TASK VIEW HEADER -->
      <div class="flex justify-between items-center">
        <p>56 Records Available</p>
        <div class="flex gap-2">
          <input
            type="text"
            placeholder="search here anything"
            class="p-2 border rounded"
          />
          <Button type="secondary" @click="openStagesModal">
            <template v-slot:icon>
              <AdjustmentsHorizontalIcon class="h-5 w-5" />
            </template>
          </Button>
        </div>
      </div>
      <!--END: TASK VIEW HEADER -->
    </div>
    <!--END: TASK VIEW -->
  </div>
  <!-- START: MODAL FOR STAGE MANAGEMENT -->
  <Modal v-show="state.showStagesModal">
    <template v-slot:content>
      <div class="flex justify-between">
        <p>Stages</p>
        <Button type="icon" size="small" @click="closeStagesModal">
          <template v-slot:icon>
            <XMarkIcon class="h-6 w-6" />
          </template>
        </Button>
      </div>
      <hr class="my-2" />
      <table class="table-auto">
        <tbody>
          <tr v-for="stage in stagesStore.getStages" :key="stage.id">
            <td>
              <input
                class="p-2 my-2 border rounded"
                v-model.trim="stage.label"
                type="text"
                placeholder="Enter Stage Label"
              />
            </td>
            <td>
              <Button type="icon" size="small" @click="stagesStore.deleteStageById(stage.id)">
                <template v-slot:icon>
                  <XMarkIcon class="h-6 w-6 text-red-500" />
                </template>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      <Button label="Create Stage" @click="stagesStore.addStage">
        <template v-slot:icon>
          <PlusIcon class="h-4 w-4" />
        </template>
      </Button>
    </template>
  </Modal>
  <!-- END: MODAL FOR STAGE MANAGEMENT -->
</template>
<script setup lang="ts">
// Core Vue
import { reactive } from 'vue'

// Components
import Button from '@/components/ui/Button.vue'
import Modal from '@/components/ui/Modal.vue'

// Heroicons
import {
  PlusIcon,
  ListBulletIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from '@heroicons/vue/20/solid'

// Pinia Stores
import { useStagesStore } from '@/stores/stages'

const stagesStore = useStagesStore()

// State of Component
const state = reactive({
  showStagesModal: false,
})

// Methods
function openStagesModal() {
  state.showStagesModal = true
}

function closeStagesModal() {
  state.showStagesModal = false
}
</script>
