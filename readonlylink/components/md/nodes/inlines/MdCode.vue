<template>
  <code class="break-words font-mono text-base">{{ node.text }}</code>
</template>

<script setup>
import { Nodes } from "@xieyuheng/postmark"
import { MdPageState as State } from "../../md-page-state"

defineProps({ state: State, node: Nodes.Code })
</script>
