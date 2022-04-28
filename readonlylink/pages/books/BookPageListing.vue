<template>
  <div class="p-6">
    <BookPageListingNavbar class="mb-6" :state="state" />

    <Listing
      v-if="state.paginator"
      :link="state.project.link"
      :prefix="state.project.config.src"
      :text="state.paginator.text"
    />
    <div v-else>Expect state to have paginator</div>
  </div>
</template>

<script setup>
import { BookState as State } from "./book-state"

import Listing from "../../components/molecules/listing/Listing.vue"
import BookPageListingNavbar from "./BookPageListingNavbar.vue"

defineProps({ state: State })
</script>
