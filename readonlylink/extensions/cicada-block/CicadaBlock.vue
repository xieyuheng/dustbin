<template>
  <CicadaBlockViewer v-if="state.extraInfo" :state="state" />
  <div
    v-else
    class="relative mx-4 flex flex-col"
    @mouseover="state.active = true"
    @mouseleave="state.active = false"
  >
    <CicadaBlockHeader :state="state" />
    <CicadaBlockEditor :state="state" />
    <CicadaBlockRunning v-if="state.running" :state="state" />
    <CicadaBlockOutput v-if="state.outputs.length > 0" :state="state" />
    <CicadaBlockError v-if="state.error" :state="state" />
  </div>
</template>

<script setup>
import { ref } from "vue"
import { CicadaBlockState as State } from "./cicada-block-state"

import CicadaBlockViewer from "./CicadaBlockViewer.vue"
import CicadaBlockHeader from "./CicadaBlockHeader.vue"
import CicadaBlockEditor from "./CicadaBlockEditor.vue"
import CicadaBlockRunning from "./CicadaBlockRunning.vue"
import CicadaBlockOutput from "./CicadaBlockOutput.vue"
import CicadaBlockError from "./CicadaBlockError.vue"

const props = defineProps({ index: Number, info: String, text: String })
const state = ref(new State(props.index, props.info, props.text))
</script>
