<script setup lang="ts">
import { ArrowPathIcon, CloudArrowUpIcon } from '@heroicons/vue/24/outline'
import Lang from '../../components/lang/Lang.vue'
import { useGlobalLang } from '../../components/lang/useGlobalLang'
import { Connection } from './Connection'
import { State } from './State'
import { stateSaveAllNewTexts } from './stateSaveAllNewTexts'

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
      lang.isZh() ? `将 app 中的文件保存到云端` : `Save files from app to cloud`
    "
    :disabled="
      state.isSavingNewTexts ||
      !state.entries.some((entry) => entry.isModifiedByUploading)
    "
    @click.prevent.stop="stateSaveAllNewTexts(state)"
  >
    <CloudArrowUpIcon v-if="!state.isSavingNewTexts" class="h-5 w-5" />

    <ArrowPathIcon v-if="state.isSavingNewTexts" class="h-5 w-5 animate-spin" />

    <Lang>
      <template #zh>保存</template>
      <template #en>Save</template>
    </Lang>
  </button>
</template>
