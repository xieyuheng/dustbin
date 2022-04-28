<template>
  <ArticlePageMd
    v-if="state.link.path.endsWith('.md')"
    class="m-6"
    :state="state"
  />
  <ArticlePageListing v-else class="m-6" :state="state" />
</template>

<script setup>
import { watch } from "vue"
import { ArticleState as State } from "./article-state"

import ArticlePageMd from "./ArticlePageMd.vue"
import ArticlePageListing from "./ArticlePageListing.vue"

const props = defineProps({ state: State })

watch(
  () => props.state.link.path,
  () => {
    window.scrollTo(0, 0)
  }
)
</script>
