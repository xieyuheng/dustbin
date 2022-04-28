<template>
  <div
    class="mx-auto max-w-full overflow-x-auto py-4"
    style="writing-mode: vertical-rl; height: 23rem"
  >
    <div class="px-4 text-center text-2xl font-bold">
      <MdNode
        v-for="(node, index) of poem.title.nodes"
        :key="index"
        :state="pageState"
        :node="node"
      />
    </div>

    <div v-for="(section, index) of poem.sections" :key="index" class="px-2">
      <div
        v-for="(node, index) of section.nodes"
        :key="index"
        class="px-2 leading-loose"
      >
        <MdNode :state="pageState" :node="node" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Poem } from "../../models/poem"
import { MdPageState } from "../../components/md/md-page-state"

import MdNode from "../../components/md/MdNode.vue"

defineProps({
  pageState: MdPageState,
  poem: Poem,
})
</script>
