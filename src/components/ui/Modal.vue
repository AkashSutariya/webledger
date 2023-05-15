<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
    <div class="relative top-20 mx-auto p-5 border w-fit shadow-lg rounded-md bg-white">
      <slot name="content" />
    </div>
  </div>
</template>
