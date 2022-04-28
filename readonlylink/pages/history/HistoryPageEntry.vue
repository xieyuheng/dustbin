<template>
  <LinkEntry>
    <template #metadata>
      <div class="flex flex-col items-end font-sans">
        <div>{{ ut.formatDate(entry.time) }}</div>
        <div>{{ ut.formatTime(entry.time) }}</div>
        <button
          class="text-gray-400 hover:text-gray-900"
          :title="
            config.langIs('zh') ? '删除这条历史记录' : 'Delete this entry'
          "
          @click="state.history.deleteEntry(entry)"
        >
          <IconTrash class="w-5 pl-1" />
        </button>
      </div>
    </template>

    <template #default>
      <div class="my-3 rounded-sm border border-gray-900 p-3">
        <div class="flex w-full items-center justify-between">
          <div class="font-sans text-base text-gray-500">
            {{ translateRenderKind(entry.kind, config) }}
          </div>
        </div>

        <MdDefaultSmallTitle
          :href="entry.path"
          :attributes="entry.attributes"
        />
        <MdDefaultAttributes class="text-base" :attributes="entry.attributes" />
      </div>
    </template>
  </LinkEntry>
</template>

<script setup>
import { HistoryEntry } from "../../models/history"
import { translateRenderKind } from "../../models/render-kind"
import { HistoryState as State } from "./history-state"
import { useConfig } from "../../composables/config"
const config = useConfig()
import * as ut from "../../ut"

import IconTrash from "../../components/icons/IconTrash.vue"
import LinkEntry from "../../components/molecules/link-entry/LinkEntry.vue"
import MdDefaultSmallTitle from "../../components/md/pages/default/MdDefaultSmallTitle.vue"
import MdDefaultAttributes from "../../components/md/pages/default/MdDefaultAttributes.vue"

defineProps({ state: State, entry: HistoryEntry })
</script>
