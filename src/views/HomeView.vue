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
          <Button type="secondary">
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
</template>
<script setup lang="ts">
// Components
import Button from '@/components/ui/Button.vue'

// Heroicons
import {
  PlusIcon,
  ListBulletIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/vue/20/solid'
</script>
