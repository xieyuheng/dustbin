<template>
  <div class="absolute top-0 right-0 z-50">
    <CicadaBlockToolbox
      v-if="state.active"
      @run="state.run()"
      @copy="copy(state.code)"
      @reset="state.reset()"
    />
  </div>
</template>

<script setup>
import { CicadaBlockState as State } from "./cicada-block-state"

import CicadaBlockToolbox from "./CicadaBlockToolbox.vue"

defineProps({ state: State })

async function copy(code) {
  await navigator.clipboard.writeText(code)
}
</script>
