<template>
  <PageLayout v-if="error">
    <h1 class="font-sans text-2xl font-bold text-red-500">
      {{ error.name }}
    </h1>

    <pre class="overflow-x-auto whitespace-pre-wrap py-4 text-red-500">{{
      error.message
    }}</pre>
  </PageLayout>
</template>

<script setup>
import { computed } from "vue"

import PageLayout from "./PageLayout.vue"

const props = defineProps({ error: Object })

const error = computed(() => {
  if (props.error instanceof Error) {
    return props.error
  } else {
    const error = new Error(JSON.stringify(props.error))
    error.name = "UnknownError"
    return error
  }
})
</script>
