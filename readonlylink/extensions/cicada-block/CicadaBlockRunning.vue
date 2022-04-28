<template>
  <Multilingual
    v-if="state.running"
    class="my-2 border-t border-gray-400 py-2 text-base text-gray-500"
  >
    <template #zh> 运行中⋯⋯ </template>
    <template #default> Running... </template>
  </Multilingual>
</template>

<script setup>
import { CicadaBlockState as State } from "./cicada-block-state"

import Multilingual from "../../components/atoms/Multilingual.vue"

defineProps({ state: State })
</script>
