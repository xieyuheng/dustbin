<template>
  <div v-if="state.error" class="overflow-x-auto font-mono text-base">
    <div class="font-bold text-red-500">{{ state.error.message }}</div>
    <pre v-if="state.error.report" v-html="safeHtml(state.error.report)"></pre>
  </div>
  <div
    v-else-if="state.outputs.length > 0"
    class="overflow-x-auto font-mono text-base"
  >
    <pre v-for="(output, index) in state.outputs" :key="index">{{
      output
    }}</pre>
  </div>
</template>

<script setup>
import { LambdaBlockState as State } from "./lambda-block-state"
import { safeHtml } from "../../ut/safe-html"

defineProps({ state: State })
</script>
