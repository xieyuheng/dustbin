<script setup lang="ts">
import { ArrowUpOnSquareStackIcon } from '@heroicons/vue/24/outline'
import Lang from '../../components/lang/Lang.vue'
import { useGlobalLang } from '../../components/lang/useGlobalLang'
import { Connection } from './Connection'
import { State } from './State'
import { stateConnectionToggleAutoUpdate } from './stateConnectionToggleAutoUpdate'

defineProps<{
  state: State
  connection: Connection
}>()

const lang = useGlobalLang()
</script>

<template>
  <button
    class="inline-flex items-center space-x-1 border border-black px-1.5 py-1 disabled:border-stone-500 disabled:text-stone-500 dark:disabled:border-stone-400 dark:disabled:text-stone-400"
    :title="lang.isZh() ? `每五秒自动上传一次` : `Upload every 5 seconds`"
    :class="{
      'border border-orange-500 text-orange-500 dark:border-orange-300 dark:text-orange-300':
        connection.isAutoUploadEnabled,
      'border border-dashed border-black dark:border-white':
        !connection.isAutoUploadEnabled,
    }"
    @click.prevent.stop="stateConnectionToggleAutoUpdate(state, connection)"
  >
    <ArrowUpOnSquareStackIcon class="h-5 w-5" />

    <Lang>
      <template #zh>自动上传</template>
      <template #en>Auto Upload</template>
    </Lang>
  </button>
</template>
