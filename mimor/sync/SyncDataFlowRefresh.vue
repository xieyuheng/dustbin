<script setup lang="ts">
import { ArrowPathIcon, CloudArrowDownIcon } from '@heroicons/vue/24/outline'
import Lang from '../../components/lang/Lang.vue'
import { useGlobalLang } from '../../components/lang/useGlobalLang'
import { Connection } from './Connection'
import { State } from './State'
import { stateRefresh } from './stateRefresh'

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
      lang.isZh() ? `将云端的文件刷新到 app` : `Refresh files from cloud to app`
    "
    :disabled="state.isRefreshing"
    @click.prevent.stop="stateRefresh(state)"
  >
    <CloudArrowDownIcon v-if="!state.isRefreshing" class="h-5 w-5" />

    <ArrowPathIcon v-if="state.isRefreshing" class="h-5 w-5 animate-spin" />

    <Lang>
      <template #zh>刷新</template>
      <template #en>Refresh</template>
    </Lang>
  </button>
</template>
