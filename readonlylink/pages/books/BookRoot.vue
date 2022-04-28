<template>
  <Head>
    <title v-if="state">{{ state.project.config.title }}</title>
  </Head>

  <div class="mx-auto max-w-3xl">
    <PageError v-if="error" :error="error" />

    <div v-else-if="!state" class="px-4 py-6 font-sans text-xl text-gray-500">
      <Multilingual class="font-bold">
        <template #zh> 书籍加载中⋯⋯ </template>
        <template #default> Loading book ... </template>
      </Multilingual>

      <LinkInfo class="py-4" :link="link" />
    </div>

    <BookContents v-else-if="frontMatter === 'contents'" :state="state" />
    <BookPage v-else-if="state.project.link.path" :state="state" />
    <BookTitlePage v-else :state="state" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onErrorCaptured } from "vue"
import { Link } from "../../models/link"
import { BookState as State } from "./book-state"
import { StateFactory } from "./state-factory"
import { useConfig } from "../../composables/config"

import Multilingual from "../../components/atoms/Multilingual.vue"
import LinkInfo from "../../components/molecules/link-info/LinkInfo.vue"
import PageError from "../../components/layouts/page-layout/PageError.vue"
import BookTitlePage from "./BookTitlePage.vue"
import BookContents from "./BookContents.vue"
import BookPage from "./BookPage.vue"

const config = useConfig()

const props = defineProps({
  link: String,
  frontMatter: String,
  backMatter: String,
  payload: Object,
})

const state = ref(null)
const error = ref(null)

const link = computed(() => Link.parse(props.link))

onErrorCaptured((e, component, info) => {
  error.value = e
  return false
})

const stateFactory = new StateFactory()

watch(
  link,
  async () => {
    try {
      await updateState(link.value)
    } catch (e) {
      error.value = e
    }
  },
  { immediate: true }
)

async function updateState(link) {
  if (props.payload) {
    state.value = stateFactory.create(link, props.payload)
  } else if (
    state.value &&
    state.value.project.link.root().format() === link.root().format()
  ) {
    stateFactory.updateLink(state.value, link)
  } else {
    state.value = await stateFactory.build(link)
  }

  state.value.saveHistory()
}
</script>
