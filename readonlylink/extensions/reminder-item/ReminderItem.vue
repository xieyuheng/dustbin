<template>
  <div
    class="mx-3 my-2 border-4 border-double border-gray-400 px-6 py-4 md:mx-8"
  >
    <div class="px-6 py-2 text-center text-2xl font-bold">
      <MdNode
        v-for="(node, index) of reminder.title.nodes"
        :key="index"
        :state="pageState"
        :node="node"
      />
    </div>

    <div class="space-y-1 divide-y divide-gray-600">
      <div
        v-for="(section, index) in reminder.sections"
        :key="index"
        class="py-2 font-bold"
      >
        <div v-for="(node, index) of section.nodes" :key="index">
          <MdNode :state="pageState" :node="node" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Reminder } from "../../models/reminder"
import { MdPageState } from "../../components/md/md-page-state"

import MdNode from "../../components/md/MdNode.vue"

defineProps({
  pageState: MdPageState,
  reminder: Reminder,
})
</script>
