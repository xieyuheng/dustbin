<script setup lang="ts">
import Lang from '../../components/lang/Lang.vue'
import { Connection } from './Connection'
import { State } from './State'

defineProps<{
  state: State
  connection: Connection
}>()
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="flex items-baseline justify-between">
      <Lang class="text-xl font-bold">
        <template #zh> 本地文件列表 </template>
        <template #en> Local File List </template>
      </Lang>

      <Lang class="">
        <template #zh
          >总计：<span class="font-bold">{{
            connection.fileEntries.length
          }}</span></template
        >
        <template #en
          >Count:
          <span class="font-bold">{{
            connection.fileEntries.length
          }}</span></template
        >
      </Lang>
    </div>

    <ol
      class="flex list-decimal flex-col overflow-y-auto overflow-x-hidden text-lg"
    >
      <li
        v-for="fileEntry of connection.fileEntries"
        :key="fileEntry.path"
        :class="{
          'ml-5': connection.fileEntries.length < 10,
          'ml-7':
            connection.fileEntries.length >= 10 &&
            connection.fileEntries.length < 100,
          'ml-9':
            connection.fileEntries.length >= 100 &&
            connection.fileEntries.length < 1000,
          'ml-11': connection.fileEntries.length >= 1000,
        }"
      >
        <div class="whitespace-pre">{{ fileEntry.path }}</div>
      </li>
    </ol>
  </div>
</template>
