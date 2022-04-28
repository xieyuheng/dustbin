<template>
  <div class="mx-4 flex flex-col">
    <LambdaBlockHeader class="border-b border-gray-900 pt-2" :state="state" />
    <LambdaBlockEditor class="my-2" :state="state" />
    <LambdaBlockOutput class="border-t border-gray-900 py-2" :state="state" />
  </div>
</template>

<script setup>
import { ref } from "vue"
import { LambdaBlockState as State } from "./lambda-block-state"

import LambdaBlockHeader from "./LambdaBlockHeader.vue"
import LambdaBlockEditor from "./LambdaBlockEditor.vue"
import LambdaBlockOutput from "./LambdaBlockOutput.vue"

const props = defineProps({ index: Number, info: String, text: String })
const state = ref(new State(props.index, props.info, props.text))
</script>
