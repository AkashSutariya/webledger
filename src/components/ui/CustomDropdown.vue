<template>
  <div class="relative">
    <button
      class="rounded-3xl drop-shadow-lg bg-slate-200 py-2 px-1 flex justify-between items-center w-52"
      :disabled="disabled"
      @click="openDropdown"
      v-click-outside="closeDropdown"
    >
      <div class="flex items-center gap-2">
        <slot name="icon"></slot>
        <p>
          {{ modelValue || placeholder }}
        </p>
      </div>
      <ChevronDownIcon class="h-4 w-4" />
    </button>
    <ul
      v-show="state.showDropdown"
      class="absolute py-2 mt-1 bg-slate-200 z-20 rounded-lg shadow w-52"
    >
      <li
        v-for="option in options"
        class="cursor-pointer hover:bg-slate-300 px-4 py-2"
        @click="handleChange(option[optionValue] || option)"
      >
        {{ option[optionLabel] || option }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// Core Vue
import { reactive } from 'vue'

// Types
import type { PropType } from 'vue'

// HeroIcons
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

// State of Component
const state = reactive({
  showDropdown: false
})

// Props
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  options: {
    type: Array as PropType<string[] | Array<any>>,
    default: []
  },
  optionLabel: {
    type: String,
    default: ''
  },
  optionValue: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  }
})

// Emits
const emits = defineEmits(['update:modelValue'])

// Methods
function handleChange(value: string) {
  emits('update:modelValue', value)
}

function openDropdown() {
  state.showDropdown = true
}

function closeDropdown() {
  state.showDropdown = false
}
</script>
