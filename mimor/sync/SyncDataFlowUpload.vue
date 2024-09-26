<script setup lang="ts">
import { ArrowPathIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'
import Lang from '../../components/lang/Lang.vue'
import { useGlobalLang } from '../../components/lang/useGlobalLang'
import { Connection } from './Connection'
import { State } from './State'
import { stateConnectionUpload } from './stateConnectionUpload'

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
        ? `将本地文件夹中的文件上传到 app`
        : `Upload files from local directory to app`
    "
    :disabled="connection.isUploading"
    @click.prevent.stop="stateConnectionUpload(state, connection)"
  >
    <ArrowUpTrayIcon v-if="!connection.isUploading" class="h-5 w-5" />

    <ArrowPathIcon v-if="connection.isUploading" class="h-5 w-5 animate-spin" />

    <Lang>
      <template #zh>上传</template>
      <template #en>Upload</template>
    </Lang>
  </button>
</template>
