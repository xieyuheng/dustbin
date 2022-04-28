<template>
  <Highlight
    class="mx-4 overflow-x-auto text-base"
    lang="javascript"
    :text="state.initCode"
  />
</template>

<script setup>
import { CicadaBlockState as State } from "./cicada-block-state"

import Highlight from "../../components/atoms/Highlight.vue"

defineProps({ state: State })
</script>
