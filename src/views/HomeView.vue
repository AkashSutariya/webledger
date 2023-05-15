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
        <Button type="secondary"  @click="toggleTaskview">
          <template v-slot:icon>
            <ListBulletIcon v-if="state.taskView === 'grid'" class="h-5 w-5" />
            <Squares2X2Icon v-if="state.taskView === 'list'" class="h-5 w-5" />
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
      <!--START: TASK GRID VIEW -->
      <div class="mt-5 flex gap-2 min-h-[500px]" v-if="state.taskView === 'grid'">
        <div
          class="w-60 bg-slate-300 rounded-lg"
        >
          <div class="flex justify-between rounded-t-lg p-2 bg-green-800">
            <p class="text-white">
              Not Started
            </p>
            <Button
              class="rounded-full px-2"
              size="small"
              type="secondary"
              :label="1"
            >
              <template v-slot:icon>
                <DocumentIcon class="h-4 w-4" />
              </template>
            </Button>
          </div>
          <div
            class="p-2"
            draggable="true"
          >
            <div
              class="bg-white rounded-md p-2  border-t-2 border-green-800"
            >
              <div class="flex justify-between items-center">
                <p>
                  <StopCircleIcon class="h-4 w-4 text-yellow-400 inline" />
                  Test Linked To
                </p>
                <EllipsisVerticalIcon class="h-4 w-4" />
              </div>
              <hr class="my-2" />
              <div class="flex justify-between">
                <p>Parent</p>
                <p>Test parent</p>
              </div>
              <div class="flex justify-between">
                <p>
                  <UserCircleIcon class="h-4 w-4 text-blue-400 inline" />
                  Div Jind
                </p>
                <p><PhoneIcon class="h-4 w-4 text-blue-800 inline" /> 8149494</p>
              </div>
              <hr class="my-2" />
              <p>
                <CalendarDaysIcon class="h-4 w-4 text-green-500 inline" />
                12/05/2023
              </p>
              <p class="text-red-500">
                <CalendarDaysIcon class="h-4 w-4 inline" />
                12/05/2023
              </p>
              <hr class="my-2" />
              <p>
                <CalendarDaysIcon class="h-4 w-4 text-blue-800 inline" />
                Test Assignee
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--END: TASK GRID VIEW -->
      <!--START: TASK TABLE VIEW -->
      <div class="mt-5" v-if="state.taskView === 'list'">
        <table class="border-collapse table-auto w-full text-sm">
          <thead>
            <tr class="border-b text-slate-400 text-left">
              <th class="p-4 pl-8 pt-0 pb-3">TASK NAME</th>
              <th class="p-4 pl-8 pt-0 pb-3">LINKED TO</th>
              <th class="p-4 pl-8 pt-0 pb-3">STATUS</th>
              <th class="p-4 pl-8 pt-0 pb-3">DUE DATE</th>
              <th class="p-4 pl-8 pt-0 pb-3">ASSIGNED USER</th>
              <th class="p-4 pl-8 pt-0 pb-3">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-slate-100 text-slate-500">
              <td class="p-4 pl-8">Test Task</td>
              <td class="p-4 pl-8">Test Linked To</td>
              <td class="p-4 pl-8">Test Stage</td>
              <td class="p-4 pl-8">12/05/2023</td>
              <td class="p-4 pl-8">12/05/2023</td>
              <td class="p-4 pl-8">
                <div class="flex gap-3">
                  <Button type="icon" size="small">
                    <template v-slot:icon>
                      <EyeIcon class="h-6 w-6 text-yellow-500" />
                    </template>
                  </Button>
                  <Button type="icon" size="small">
                    <template v-slot:icon>
                      <PencilSquareIcon class="h-6 w-6 text-blue-500" />
                    </template>
                  </Button>
                  <Button type="icon" size="small">
                    <template v-slot:icon>
                      <XMarkIcon class="h-6 w-6 text-red-500" />
                    </template>
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--END: TASK TABLE VIEW -->
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
  PencilSquareIcon,
  EyeIcon,
  UserCircleIcon,
  PhoneIcon,
  EllipsisVerticalIcon,
  StopCircleIcon,
  DocumentIcon,
  CalendarDaysIcon,
  Squares2X2Icon,
} from '@heroicons/vue/20/solid'

// Pinia Stores
import { useStagesStore } from '@/stores/stages'

const stagesStore = useStagesStore()

// State of Component
const state = reactive({
  showStagesModal: false,
  taskView: 'list',
})

// Methods
function openStagesModal() {
  state.showStagesModal = true
}

function closeStagesModal() {
  state.showStagesModal = false
}

function toggleTaskview() {
  if (state.taskView === 'list') {
    state.taskView = 'grid'
  } else if (state.taskView === 'grid') {
    state.taskView = 'list'
  }
}
</script>
