<template>
  <div>
    <pre
      v-if="node.info === 'plaintext'"
      class="mx-4 overflow-x-auto text-base"
    ><code>{{ node.text }}</code></pre>

    <Highlight
      v-else
      class="mx-4 overflow-x-auto text-base"
      :text="node.text"
    />
  </div>
</template>

<script setup>
import { computed } from "vue"
import { Nodes } from "@xieyuheng/postmark"
import { MdPageState as State } from "../../md-page-state"

import Highlight from "../../../atoms/Highlight.vue"

defineProps({ state: State, node: Object })
</script>
