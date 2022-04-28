<template>
  <div class="p-6">
    <Listing
      v-if="state.text"
      :link="state.project.link"
      :prefix="state.project.config.src"
      :text="state.text"
    />
    <div v-else>Expect state to have text</div>
  </div>
</template>

<script setup>
import { ManualState as State } from "./manual-state"

import Listing from "../../components/molecules/listing/Listing.vue"

defineProps({ state: State })
</script>
