<template>
  <div ref="pageElement">
    <ManualPageMd
      v-if="state.project.link.path.endsWith('.md')"
      :state="state"
    />
    <ManualPageListing v-else :state="state" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { ManualState as State } from "./manual-state"

import ManualPageMd from "./ManualPageMd.vue"
import ManualPageListing from "./ManualPageListing.vue"

const props = defineProps({ state: State })

const pageElement = ref(null)

onMounted(() => {
  pageElement.value?.scrollIntoView()
})
</script>
