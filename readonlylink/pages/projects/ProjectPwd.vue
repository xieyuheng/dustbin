<template>
  <div
    class="flex w-full items-baseline overflow-x-auto overflow-y-hidden font-sans"
  >
    <Link
      preserve-state
      class="whitespace-pre hover:underline"
      :href="`/projects/${state.user.username}`"
      >@{{ state.user.username }}</Link
    >

    <div class="flex items-baseline">
      <div class="px-0.5">/</div>
      <Link
        class="whitespace-pre font-bold hover:underline"
        :href="`/projects/${state.user.username}/${state.project.name}`"
        >{{ state.project.name }}</Link
      >
    </div>

    <div v-if="state.ranger.currentDirectory.path" class="flex items-baseline">
      <div class="pl-0.5">/</div>

      <div class="text-gray-500">
        <pre class="font-sans font-bold">{{
          state.ranger.currentDirectory.path
        }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ProjectState as State } from "./project-state"

defineProps({ state: State })
</script>
