<template>
  <div
    class="mx-auto flex h-screen flex-col px-3 py-3 font-serif text-xl md:py-4 md:px-6"
    :class="{
      'max-w-3xl': mode !== 'tiling',
    }"
  >
    <Head>
      <title v-if="config.langIs('zh')">只读</title>
      <title v-else>Readonly</title>

      <meta
        name="description"
        meta-key="description"
        content="
Readonly.Link
is a document rendering tool,
and a community for authors.

An invitation from books and articles.
"
      />
    </Head>

    <PageHeader :noToolbar="noToolbar" />

    <slot />
  </div>
</template>

<script setup>
import { useConfig } from "../../../composables/config"
const config = useConfig()

import PageHeader from "./PageHeader.vue"

defineProps({ mode: String, noToolbar: Boolean })
</script>
