<template>
  <div class="text-base" ref="editorElement"></div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { CicadaBlockState as State } from "./cicada-block-state"

const props = defineProps({ state: State })
const state = props.state

const editorElement = ref(null)

onMounted(() => {
  if (editorElement.value) {
    state.init(editorElement.value)
  }
})
</script>
