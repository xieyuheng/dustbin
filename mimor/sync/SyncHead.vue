<script setup lang="ts">
import { ArrowsUpDownIcon, ReceiptRefundIcon } from '@heroicons/vue/24/outline'
import Lang from '../../components/lang/Lang.vue'
import { useGlobalLang } from '../../components/lang/useGlobalLang'
import { State } from './State'
import { stateConnect } from './stateConnect'
import { stateConnectDirectoryHandle } from './stateConnectDirectoryHandle'

defineProps<{ state: State }>()

const lang = useGlobalLang()
</script>

<template>
  <div class="flex max-w-[47rem] flex-wrap text-base">
    <div class="flex flex-wrap text-base">
      <button
        v-if="state.isFileSystemAccessSupported && !state.connection"
        class="flex min-w-max items-center space-x-1 pr-3 disabled:text-stone-500"
        @click="stateConnect(state)"
      >
        <ArrowsUpDownIcon class="h-5 w-5" />

        <Lang>
          <template #zh>连接本地文件夹</template>
          <template #en>Connect local directory</template>
        </Lang>
      </button>

      <button
        v-if="state.latestDirectoryHandle && !state.connection"
        class="flex min-w-max items-center space-x-1 pr-3 disabled:text-stone-500"
        @click="stateConnectDirectoryHandle(state, state.latestDirectoryHandle)"
      >
        <ReceiptRefundIcon class="h-5 w-5" />

        <Lang>
          <template #zh
            >重新连接：<span class="font-bold">{{
              state.latestDirectoryHandle.name
            }}</span></template
          >
          <template #en
            >Reconnect to:
            <span class="font-bold">{{
              state.latestDirectoryHandle.name
            }}</span></template
          >
        </Lang>
      </button>
    </div>
  </div>
</template>
