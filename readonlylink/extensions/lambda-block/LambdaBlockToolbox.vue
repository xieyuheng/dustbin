<template>
  <div class="flex justify-end text-base">
    <button class="text-gray-900 hover:text-gray-400" @click="state.run()">
      <Multilingual>
        <template #zh> 运行 </template>
        <template #default> RUN </template>
      </Multilingual>
    </button>
  </div>
</template>

<script setup>
import { LambdaBlockState as State } from "./lambda-block-state"

import Multilingual from "../../components/atoms/Multilingual.vue"

defineProps({ state: State })
</script>
