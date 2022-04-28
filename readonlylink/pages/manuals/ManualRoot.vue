<template>
  <Head>
    <title v-if="state">{{ state.project.config.title }}</title>
  </Head>

  <div>
    <PageError v-if="error" :error="error" />

    <div v-else-if="!state" class="px-4 py-6 font-sans text-xl text-gray-500">
      <Multilingual class="font-bold">
        <template #zh> 手册加载中⋯⋯ </template>
        <template #default> Loading manual ... </template>
      </Multilingual>

      <LinkInfo class="py-4" :link="link" />
    </div>

    <ManualLayout :state="state" v-else>
      <ManualPage
        v-if="state.project.link.path"
        :state="state"
        :key="state.project.link.path"
      />

      <div v-else class="px-4 py-6 font-sans text-xl text-gray-500">
        <Multilingual class="font-bold">
          <template #zh> 正在转跳到第一页⋯⋯ </template>
          <template #default> Jumping to the first page... </template>
        </Multilingual>
      </div>
    </ManualLayout>
  </div>
</template>

<script setup>
import { ref, computed, watch, onErrorCaptured } from "vue"
import { Inertia } from "@inertiajs/inertia"
import { Link } from "../../models/link"
import { useConfig } from "../../composables/config"
import { ManualState as State } from "./manual-state"
import { StateFactory } from "./state-factory"

import LinkInfo from "../../components/molecules/link-info/LinkInfo.vue"
import PageError from "../../components/layouts/page-layout/PageError.vue"
import ManualLayout from "./ManualLayout.vue"
import ManualPage from "./ManualPage.vue"
import Multilingual from "../../components/atoms/Multilingual.vue"

const config = useConfig()

const props = defineProps({
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

const stateFactory = new StateFactory()

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

  await maybeJumpToFirstPage(state.value.project.link)
  state.value.saveHistory()
}

async function maybeJumpToFirstPage(link) {
  if (!link.path) {
    Inertia.get(
      `/manuals/${link.resolve(state.value.firstPath).format()}`,
      {},
      {
        replace: true,
        preserveState: true,
      }
    )
  }
}

watch(
  link,
  async () => {
    try {
      await updateState(link.value)
    } catch (e) {
      console.log("ManualRoot fail to updateState")
      console.error(e)
      error.value = e
    }
  },
  { immediate: true }
)
</script>
