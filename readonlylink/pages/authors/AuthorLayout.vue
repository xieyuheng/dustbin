<template>
  <div
    class="mx-auto flex h-screen max-w-3xl flex-col py-6 px-6 font-serif text-xl md:py-12 md:px-6"
  >
    <AuthorHeader :state="state" />
    <AuthorTabs :state="state" />

    <slot />
  </div>
</template>

<script setup>
import { AuthorState as State } from "./author-state"

import AuthorHeader from "./AuthorHeader.vue"
import AuthorTabs from "./AuthorTabs.vue"

defineProps({ state: State })
</script>
