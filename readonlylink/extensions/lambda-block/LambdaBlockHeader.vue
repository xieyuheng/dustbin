<template>
  <div class="flex justify-between">
    <div class="font-sans font-bold text-amber-500">{{ state.info }}</div>
    <div>
      <LambdaBlockToolbox v-if="state.info === 'lambda'" :state="state" />
    </div>
  </div>
</template>

<script setup>
import { LambdaBlockState as State } from "./lambda-block-state"

import LambdaBlockToolbox from "./LambdaBlockToolbox.vue"

defineProps({ state: State })
</script>
