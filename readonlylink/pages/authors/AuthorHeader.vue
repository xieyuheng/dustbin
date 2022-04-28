<template>
  <div class="flex flex-wrap items-baseline justify-between">
    <Link
      :href="`/authors/${state.user.username}`"
      class="overflow-x-auto overflow-y-hidden font-sans text-4xl font-bold"
    >
      {{ state.user.name }}
    </Link>
    <Link
      class="max-w-max overflow-x-auto overflow-y-hidden font-sans hover:underline"
      :href="`/projects/${state.user.username}`"
      >@{{ state.user.username }}</Link
    >
  </div>
</template>

<script setup>
import { ref } from "vue"
import { AuthorState as State } from "./author-state"

defineProps({ state: State })
</script>
