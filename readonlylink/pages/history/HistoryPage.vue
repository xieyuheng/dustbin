<template>
  <div>
    <Head>
      <title v-if="config.langIs('zh')">历史 | 只读</title>
      <title v-else>History | Readonly</title>
    </Head>

    <HistorySlogan class="my-4" />

    <div class="flex items-baseline space-x-4">
      <div class="font-logo text-2xl font-semibold text-gray-800">
        <Multilingual>
          <template #zh> 历史 </template>
          <template #default> History </template>
        </Multilingual>
      </div>
    </div>

    <div class="flex justify-end text-lg">
      <button
        v-if="state && state.history.entries.length > 0"
        class="flex items-center font-sans text-gray-400 hover:text-gray-900"
        :title="
          config.langIs('zh')
            ? '删除全部历史记录'
            : 'Delete all history entries'
        "
        @click="deleteAll"
      >
        <Multilingual>
          <template #zh> 全部 </template>
          <template #default> ALL </template>
        </Multilingual>

        <IconTrash class="ml-1 w-5 p-0.5" />
      </button>
    </div>

    <Multilingual v-if="!state" class="py-2 font-sans font-bold text-gray-400">
      <template #zh> 历史记录加载中⋯⋯ </template>
      <template #default> Loading history ... </template>
    </Multilingual>

    <Multilingual
      v-else-if="state.history.entries.length === 0"
      class="py-2 font-sans font-bold text-gray-400"
    >
      <template #zh> 您还没有历史记录。 </template>
      <template #default> You have no reading history yet. </template>
    </Multilingual>

    <div v-else class="pb-6">
      <HistoryPageEntry
        v-for="(entry, index) of state.history.entries"
        :key="index"
        :state="state"
        :entry="entry"
      />
    </div>
  </div>
</template>

<script>
import PageLayout from "../../components/layouts/page-layout/PageLayout.vue"

export default {
  layout: PageLayout,
}
</script>

<script setup>
import { computed, watch, ref, onMounted, onErrorCaptured } from "vue"
import { HistoryState as State } from "./history-state"
import { useConfig } from "../../composables/config"

import Multilingual from "../../components/atoms/Multilingual.vue"
import IconTrash from "../../components/icons/IconTrash.vue"
import HistoryPageEntry from "./HistoryPageEntry.vue"
import HistorySlogan from "./HistorySlogan.vue"

const config = useConfig()

const error = ref(null)
const state = ref(null)

onErrorCaptured((e, component, info) => {
  error.value = e
  return false
})

onMounted(async () => {
  try {
    await updateState()
  } catch (e) {
    error.value = e
  }
})

async function updateState() {
  state.value = await State.build()
}

async function deleteAll() {
  if (state.value) {
    const message = config.langIs("zh")
      ? "您确定要删除全部历史记录吗？"
      : "Are your sure you want to delete all history entries?"
    if (window.confirm(message)) {
      await state.value.history.deleteAll()
    }
  }
}
</script>
