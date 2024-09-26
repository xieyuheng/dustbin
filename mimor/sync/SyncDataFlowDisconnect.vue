<script setup lang="ts">
import { ScissorsIcon } from '@heroicons/vue/24/outline'
import Lang from '../../components/lang/Lang.vue'
import { useGlobalLang } from '../../components/lang/useGlobalLang'
import { Connection } from './Connection'
import { State } from './State'
import { stateDisconnect } from './stateDisconnect'

defineProps<{
  state: State
  connection: Connection
}>()

const lang = useGlobalLang()

const { confirm } = window

const confirmMessage = lang.isZh()
  ? '确认要断开连接吗？'
  : 'Are you sure to disconnect?'
</script>

<template>
  <button
    class="inline-flex items-center space-x-1 border border-black px-1.5 py-1 disabled:border-stone-500 disabled:text-stone-500 dark:border-white dark:disabled:border-stone-400 dark:disabled:text-stone-400"
    :title="
      lang.isZh()
        ? `断开 app 与本地文件夹之间的连接`
        : `Disconnect app from local directory`
    "
    @click.prevent.stop="confirm(confirmMessage) && stateDisconnect(state)"
  >
    <ScissorsIcon class="h-5 w-5 rotate-180" />

    <Lang>
      <template #zh>断开连接</template>
      <template #en>Disconnect</template>
    </Lang>
  </button>
</template>
