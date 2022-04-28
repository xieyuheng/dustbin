<template>
  <div>
    <div
      v-for="(node, index) of utterance.content.nodes"
      :key="index"
      class="py-2"
    >
      <MdNode :state="pageState" :node="node" />
    </div>

    <hr
      v-if="utterance.notes.length > 0"
      class="w-1/2 border-t border-gray-400"
    />

    <ol v-if="utterance.notes.length > 0" class="text-sm">
      <li
        v-for="(note, index) of utterance.notes"
        :key="index"
        class="ml-3 list-decimal"
      >
        <div v-for="(node, index) of note.nodes" :key="index" class="py-2">
          <MdNode :state="pageState" :node="node" />
        </div>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { MdPageState } from "../../components/md/md-page-state"

import MdNode from "../../components/md/MdNode.vue"

defineProps({
  pageState: MdPageState,
  utterance: Object,
})
</script>
