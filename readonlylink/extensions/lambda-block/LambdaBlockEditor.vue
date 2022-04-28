<template>
  <textarea
    spellcheck="false"
    :rows="rows"
    class="h-full w-full resize-none overflow-y-auto whitespace-pre font-mono text-base"
    v-model="state.text"
  ></textarea>
</template>

<script setup>
import { computed } from "vue"
import { LambdaBlockState as State } from "./lambda-block-state"

const props = defineProps({ state: State })

const rows = computed(() => props.state.text.split("\n").length)
</script>
