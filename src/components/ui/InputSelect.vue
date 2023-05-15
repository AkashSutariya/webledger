<template>
  <InputWrapper :label="label" :name="name" :required="required">
    <template v-slot:input>
      <select
        class="-mt-2.5 py-2.5 px-5 border rounded bg-white"
        :name="name"
        v-model="state.value"
        :disabled="disabled"
      >
        <option disabled value="">{{ placeholder }}</option>
        <option v-for="option in options" :value="option">
          {{ option[optionLabel] || option }}
        </option>
      </select>
    </template>
  </InputWrapper>
</template>

<script setup lang="ts">
// Core Vue
import { reactive, watch } from 'vue'

// Types
import type { PropType } from 'vue'

// Components
import InputWrapper from '@/components/ui/InputWrapper.vue'

// Props
const props = defineProps({
  modelValue: {
    type: [String, Object, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  options: {
    type: Array as PropType<string[] | Array<any>>,
    default: []
  },
  required: {
    type: Boolean,
    default: false
  },
  optionLabel: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

// Emits
const emits = defineEmits(['update:modelValue'])

interface State {
  value: string | object | number
}

// State of Component
const state: State = reactive({
  value: props.modelValue
})

// Watchers
// Watcher for emit selected value
watch(
  () => state.value,
  (value) => {
    emits('update:modelValue', value)
  }
)

// Watcher for initialize selected value
watch(
  () => props.modelValue,
  (value) => {
    state.value = value
  }
)
</script>
