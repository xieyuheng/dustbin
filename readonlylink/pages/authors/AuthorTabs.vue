<template>
  <div class="flex flex-col py-1">
    <div class="flex flex-wrap justify-between pt-2 pb-2">
      <Link
        v-for="(path, name) in state.authorConfig.tabs"
        :key="name"
        :href="`/authors/${state.user.username}/${name.toLowerCase()}`"
        class="font-sans text-xl text-gray-400 hover:text-gray-900"
        >{{ name }}</Link
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { AuthorState as State } from "./author-state"

defineProps({ state: State })
</script>
