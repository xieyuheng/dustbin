<template>
  <div>
    <Listing :link="state.link" :text="state.text" />
  </div>
</template>

<script setup>
import { ArticleState as State } from "./article-state"

import Listing from "../../components/molecules/listing/Listing.vue"

defineProps({ state: State })
</script>
