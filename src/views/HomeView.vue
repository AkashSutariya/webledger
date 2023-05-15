<template>
  <div class="bg-slate-300 h-full">
    <!--START: TASK HEADER -->
    <div class="p-4 flex justify-between bg-white">
      <p class="text-xl font-bold">Tasks</p>
      <div class="flex gap-2">
        <Button label="Create" @click="openTaskModal">
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
  <!-- START: MODAL FOR SPECIFIC TASK -->
  <Modal v-show="state.showTaskModal">
    <template v-slot:content>
      <div class="flex justify-between items-center">
        <p>Create New Task</p>
        <div class="flex gap-4">
          <div>
            <CustomDropdown
              :options="tasksStore.assignees"
              v-model="state.newTask.assignee"
              :disabled="state.taskModalMode === 'view'"
              placeholder="Select Assignee"
            >
              <template v-slot:icon>
                <UserCircleIcon class="h-7 w-7" />
              </template>
            </CustomDropdown>
            <span class="text-red-500" v-if="taskv$?.assignee.$error">{{
              taskv$?.assignee.$errors[0].$message
            }}</span>
          </div>

          <Button type="icon" size="small" @click="closeTaskModal">
            <template v-slot:icon>
              <XMarkIcon class="h-6 w-6" />
            </template>
          </Button>
        </div>
      </div>
      <hr class="my-2" />
      <div class="grid grid-cols-3 gap-4">
        <div>
          <InputText
            v-model="state.newTask.name"
            label="Task Name"
            name="taskname"
            :required="true"
            :disabled="state.taskModalMode === 'view'"
          />
          <span class="text-red-500" v-if="taskv$?.name.$error">{{
            taskv$?.name.$errors[0].$message
          }}</span>
        </div>
        <div>
          <InputSelect
            v-model="state.newTask.parent"
            label="Parent"
            :required="true"
            :options="tasksStore.parents"
            placeholder="Please Select Parent"
            :disabled="state.taskModalMode === 'view'"
          />
          <span class="text-red-500" v-if="taskv$?.parent.$error">{{
            taskv$?.parent.$errors[0].$message
          }}</span>
        </div>
        <div>
          <InputSelect
            v-model="state.newTask.linkedTo"
            label="Linked To"
            :required="true"
            :options="tasksStore.linkedTos"
            placeholder="Please Select Linked To"
            :disabled="state.taskModalMode === 'view'"
          />
          <span class="text-red-500" v-if="taskv$?.linkedTo.$error">{{
            taskv$?.linkedTo.$errors[0].$message
          }}</span>
        </div>
        <div>
          <InputSelect
            v-model="state.newTask.stage"
            label="Status"
            :required="true"
            :options="stagesStore.getStages"
            option-label="label"
            placeholder="Please Select Status"
            :disabled="state.taskModalMode === 'view'"
          />
          <span class="text-red-500" v-if="taskv$?.stage.$error">{{
            taskv$?.stage.$errors[0].$message
          }}</span>
        </div>
        <div>
          <InputSelect
            v-model="state.newTask.priority"
            label="Priority"
            :required="true"
            :options="tasksStore.priorities"
            placeholder="Please Select Priority"
            :disabled="state.taskModalMode === 'view'"
          />
          <span class="text-red-500" v-if="taskv$?.priority.$error">{{
            taskv$?.priority.$errors[0].$message
          }}</span>
        </div>
        <InputDate
          label="Date Start"
          v-model="state.newTask.startDate"
          :disabled="state.taskModalMode === 'view'"
        />
        <InputDate
          label="Due Date"
          v-model="state.newTask.dueDate"
          :disabled="state.taskModalMode === 'view'"
        />
        <div>
          <InputTextarea
            v-model="state.newTask.description"
            class="col-span-2"
            label="Description"
            :required="true"
            :disabled="state.taskModalMode === 'view'"
          />
          <span class="text-red-500" v-if="taskv$?.description.$error">{{
            taskv$?.description.$errors[0].$message
          }}</span>
        </div>
      </div>
      <hr class="my-2" />
      <div class="flex gap-4 justify-end">
        <Button type="secondary" label="Cancel" @click="closeTaskModal" />
        <Button type="secondary" label="Discard" :disabled="state.taskModalMode === 'view'" />
        <Button label="Save" @click="saveTask" :disabled="state.taskModalMode === 'view'" />
      </div>
    </template>
  </Modal>
  <!-- END: MODAL FOR SPECIFIC TASK -->
</template>
<script setup lang="ts">
// Core Vue
import { reactive } from 'vue'

// Components
import Button from '@/components/ui/Button.vue'
import Modal from '@/components/ui/Modal.vue'
import InputText from '@/components/ui/InputText.vue'
import InputSelect from '@/components/ui/InputSelect.vue'
import InputDate from '@/components/ui/InputDate.vue'
import InputTextarea from '@/components/ui/InputTextarea.vue'
import CustomDropdown from '@/components/ui/CustomDropdown.vue'

// Types
import type { stage, task, taskInput } from '@/types/index'

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
import { useTasksStore } from '@/stores/tasks'

const tasksStore = useTasksStore()
const stagesStore = useStagesStore()

// Validation
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const rules = {
  name: { required },
  assignee: { required },
  parent: { required },
  linkedTo: { required },
  priority: { required },
  stage: { required },
  description: { required }
}

let taskv$: any = null

// State of Component
const state = reactive({
  showStagesModal: false,
  taskView: 'list',
  showTaskModal: false,
  taskModalMode: 'input',
  newTask: cloneNewTask(),
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

function openTaskModal(task: null | task = null) {
  if (task) {
    state.newTask = { ...task }
  } else {
    state.taskModalMode = 'input'
    state.newTask = cloneNewTask()
  }
  taskv$ = useVuelidate(rules, state.newTask)
  state.showTaskModal = true
}

function closeTaskModal() {
  state.showTaskModal = false
}

function cloneNewTask(): taskInput {
  return {
    name: '',
    assignee: '',
    parent: '',
    linkedTo: '',
    priority: '',
    stage: null as unknown as stage,
    startDate: '',
    dueDate: '',
    description: ''
  }
}


async function saveTask() {
  const isValid = await taskv$.value.$validate()

  if (isValid) {
    const taskId = (state.newTask as task).id
    if (taskId) {
      tasksStore.updateTaskById(taskId, state.newTask as task)
    } else {
      tasksStore.addTask(state.newTask as task)
    }
    closeTaskModal()
  }
}

function viewTask(task: task) {
  state.taskModalMode = 'view'
  openTaskModal(task)
}

function editTask(task: task) {
  state.taskModalMode = 'input'
  openTaskModal(task)
}
</script>
