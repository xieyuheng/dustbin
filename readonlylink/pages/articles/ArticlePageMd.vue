<template>
  <MdPage
    :document="state.document"
    :customComponents="extensions.components"
  />
</template>

<script setup>
import { ArticleState as State } from "./article-state"
import { useExtensionStore } from "../../composables/extension-store"

import MdPage from "../../components/md/MdPage.vue"

defineProps({ state: State })

const extensions = useExtensionStore()
</script>
