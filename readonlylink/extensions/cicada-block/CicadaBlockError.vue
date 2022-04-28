<template>
  <div
    v-if="state.error"
    class="my-2 border-t border-gray-400 py-2 text-rose-500"
  >
    <h1 class="pb-3 font-sans text-2xl font-bold">
      {{ state.error.name }}
    </h1>

    <pre class="overflow-x-auto text-base">{{ state.error.message }}</pre>
  </div>
</template>

<script setup>
import { CicadaBlockState as State } from "./cicada-block-state"

defineProps({ state: State })
</script>
