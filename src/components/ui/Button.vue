<template>
  <button
    class="whitespace-nowrap flex items-center gap-1"
    :class="[
      type === 'primary' ? 'bg-blue-400 text-white' : '',
      type === 'secondary' ? 'bg-gray-100' : '',
      type === 'icon' ? 'bg-transparent' : '',
      size === 'default' ? 'py-2 px-3 border rounded' : ''
    ]"
  >
    <slot name="icon"></slot>
    <p v-if="label">
      {{ label }}
    </p>
  </button>
</template>

<script setup lang="ts">
// Types
import type { PropType } from 'vue'

// Props
defineProps({
  label: {
    type: [String, Number],
    default: ''
  },
  size: {
    type: String as PropType<'default' | 'small'>,
    default: 'default'
  },
  type: {
    type: String as PropType<'primary' | 'secondary' | 'icon'>,
    default: 'primary'
  }
})
</script>
