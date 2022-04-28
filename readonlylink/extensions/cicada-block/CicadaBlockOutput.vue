<template>
  <div
    v-if="state.outputs.length > 0"
    class="my-2 overflow-x-auto border-t border-gray-400 py-2"
  >
    <div v-for="(output, index) in state.outputs" :key="index">
      <pre
        v-if="output"
        class="text-base"
        v-html="safeHtml(renderOutput(output))"
      />
    </div>
  </div>
</template>

<script setup>
import * as StmtOutputs from "@cicada-lang/cicada/lib/lang/stmt/stmt-outputs"
import { safeHtml } from "../../ut/safe-html"
import { CicadaBlockState as State } from "./cicada-block-state"

defineProps({ state: State })

function renderOutput(output) {
  if (output instanceof StmtOutputs.NormalTerm) {
    return [
      `<span class="text-orange-600">${output.exp.format()}</span>`,
      `<span class="text-gray-500">: </span>`,
      `<span class="text-sky-600">${output.t.format()}</span>`,
    ].join("")
  } else {
    return `<span class="text-orange-600">${output.format()}</span>`
  }
}
</script>
