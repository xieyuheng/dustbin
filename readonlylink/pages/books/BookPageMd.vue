<template>
  <div class="flex h-screen flex-col px-6">
    <BookPageNavbar class="py-6" :state="state" />

    <MdPage
      v-if="state.paginator"
      :key="state.project.link.path"
      :document="state.paginator.document"
      :customComponents="extensions.components"
    />
    <div v-else>Expect state to have paginator</div>

    <BookPageNavbar class="py-6" :state="state" />
  </div>
</template>

<script setup>
import { BookState as State } from "./book-state"
import { useExtensionStore } from "../../composables/extension-store"

import MdPage from "../../components/md/MdPage.vue"
import BookPageNavbar from "./BookPageNavbar.vue"

defineProps({ state: State })

const extensions = useExtensionStore()
</script>
