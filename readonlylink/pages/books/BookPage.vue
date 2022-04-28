<template>
  <Head>
    <title>{{ title }}</title>
  </Head>

  <BookPageMd v-if="state.project.link.path.endsWith('.md')" :state="state" />
  <BookPageListing v-else :state="state" />
</template>

<script setup>
import { watch, computed } from "vue"
import { BookState as State } from "./book-state"

import BookPageMd from "./BookPageMd.vue"
import BookPageListing from "./BookPageListing.vue"

const props = defineProps({ state: State })

const title = computed(() =>
  props.state.paginator
    ? props.state.paginator.title + " | " + props.state.project.config.title
    : props.state.project.config.title
)

watch(
  () => props.state.project.link.path,
  () => {
    window.scrollTo(0, 0)
  }
)
</script>
