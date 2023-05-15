<template>
  <div class="flex flex-col">
    <label :for="name" class="ml-2.5">
      <span class="px-2.5 bg-white z-10 relative">
        {{ label }}
        <span v-show="required" class="text-red-500">*</span>
      </span>
    </label>
    <slot name="input" />
  </div>
</template>
<script setup lang="ts">
// Props
defineProps({
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})
</script>
