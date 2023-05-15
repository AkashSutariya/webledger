<template>
  <InputWrapper :label="label" :name="name" :required="required">
    <template v-slot:input>
      <input
        type="date"
        class="-mt-2.5 py-2.5 px-5 border rounded"
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        @input="handleInput"
      />
    </template>
  </InputWrapper>
</template>

<script setup lang="ts">
// Components
import InputWrapper from '@/components/ui/InputWrapper.vue'

// Props
defineProps({
  modelValue: {
    type: String,
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
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

// Emits
const emits = defineEmits(['update:modelValue'])

// Methods
function handleInput(event: Event) {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
