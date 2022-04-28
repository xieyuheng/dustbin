<template>
  <div class="flex max-w-4xl flex-col px-6 md:px-10 xl:mx-auto">
    <MdPage
      v-if="state.paginator"
      :key="state.project.link.path"
      :document="state.paginator.document"
      :customComponents="extensions.components"
    />
    <div v-else>Expect state to have document</div>

    <ManualPageEnding class="py-6" :state="state" />
  </div>
</template>

<script setup>
import { ManualState as State } from "./manual-state"
import { useExtensionStore } from "../../composables/extension-store"

import MdPage from "../../components/md/MdPage.vue"
import ManualPageEnding from "./ManualPageEnding.vue"

defineProps({ state: State })

const extensions = useExtensionStore()
</script>
