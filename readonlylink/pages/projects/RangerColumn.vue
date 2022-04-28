<template>
  <div class="h-full overflow-x-auto overflow-y-auto">
    <RangerRow
      v-for="(entry, index) in directories"
      :key="index"
      class="font-bold"
      :isMainColumn="isMainColumn"
      :state="state"
      :entry="entry"
      :directory="directory"
      :cd="cd"
    />

    <RangerRow
      v-for="(entry, index) in files"
      :key="index"
      :isMainColumn="isMainColumn"
      :state="state"
      :entry="entry"
      :directory="directory"
      :cd="cd"
    />
  </div>
</template>

<script setup>
import { File, Directory } from "./ranger"
import { ProjectState as State } from "./project-state"

import RangerRow from "./RangerRow.vue"

defineProps({
  isMainColumn: Boolean,
  state: State,
  files: Array,
  directories: Array,
  directory: Directory,
  cd: Function,
})
</script>
