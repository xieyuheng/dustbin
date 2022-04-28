<template>
  <Head>
    <title v-if="state?.title">{{ state.title }}</title>
  </Head>

  <div class="mx-auto max-w-3xl">
    <PageError v-if="error" :error="error" />

    <div v-else-if="!state" class="px-4 py-6 font-sans text-xl text-gray-500">
      <Multilingual class="font-bold">
        <template #zh> 文章加载中⋯⋯ </template>
        <template #default> Loading article ... </template>
      </Multilingual>

      <LinkInfo class="py-4" :link="link" />
    </div>

    <!-- NOTE The following order matters -->
    <ArticlePage v-else-if="state instanceof ArticleState" :state="state" />
    <ArticleDirectory
      v-else-if="state instanceof DirectoryState"
      :state="state"
    />
  </div>
</template>

<script setup>
import { computed, watch, ref, onErrorCaptured } from "vue"
import { Inertia } from "@inertiajs/inertia"
import { Link } from "../../models/link"
import { ArticleState } from "./article-state"
import { DirectoryState } from "./directory-state"
import { StateFactory } from "./state-factory"

import LinkInfo from "../../components/molecules/link-info/LinkInfo.vue"
import PageError from "../../components/layouts/page-layout/PageError.vue"
import ArticlePage from "./ArticlePage.vue"
import ArticleDirectory from "./ArticleDirectory.vue"
import Multilingual from "../../components/atoms/Multilingual.vue"

const props = defineProps({
  url: String,
  link: String,
  payload: Object,
})

const state = ref(null)
const error = ref(null)

const link = computed(() => Link.parse(props.link))

onErrorCaptured((e, component, info) => {
  error.value = e
  return false
})

watch(
  link,
  async () => {
    try {
      await updateState(link.value, props.payload)
    } catch (e) {
      error.value = e
    }
  },
  { immediate: true }
)

async function updateState(link, payload) {
  if (
    state.value?.link.root().format() === link.root().format() &&
    props.url.endsWith("/")
  ) {
    state.value.link = link
  } else {
    const stateFactory = new StateFactory()

    state.value = payload
      ? stateFactory.create(link, payload)
      : await stateFactory.build(link)

    // NOTE only save non directory link
    if (state.value instanceof ArticleState) {
      state.value.saveHistory()
    }
  }
}
</script>
