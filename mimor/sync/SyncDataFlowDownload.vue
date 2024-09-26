<script setup lang="ts">
import { ArrowDownTrayIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import Lang from '../../components/lang/Lang.vue'
import { useGlobalLang } from '../../components/lang/useGlobalLang'
import { Connection } from './Connection'
import { State } from './State'
import { stateConnectionDownload } from './stateConnectionDownload'

defineProps<{
  state: State
  connection: Connection
}>()

const lang = useGlobalLang()
</script>

<template>
  <button
    class="inline-flex items-center space-x-1 border border-black px-1.5 py-1 disabled:border-stone-500 disabled:text-stone-500 dark:border-white dark:disabled:border-stone-400 dark:disabled:text-stone-400"
    :title="
      lang.isZh()
        ? `将 app 中的文件下载到本地文件夹`
        : `Download files from app to local directory`
    "
    :disabled="connection.isDownloading"
    @click.prevent.stop="stateConnectionDownload(state, connection)"
  >
    <ArrowDownTrayIcon v-if="!connection.isDownloading" class="h-5 w-5" />

    <ArrowPathIcon
      v-if="connection.isDownloading"
      class="h-5 w-5 animate-spin"
    />

    <Lang>
      <template #zh>下载</template>
      <template #en>Download</template>
    </Lang>
  </button>
</template>
