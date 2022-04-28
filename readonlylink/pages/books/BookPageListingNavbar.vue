<template>
  <div class="text-center">
    <Link
      preserve-state
      :href="`/books/${state.project.link.root().format()}`"
      class="text-gray-400 hover:text-gray-700"
      title="Back to Title Page"
    >
      <Multilingual>
        <template #zh> 标题页 </template>
        <template #default> TITLE </template>
      </Multilingual>
    </Link>
    /
    <Link
      preserve-state
      :href="`/books/${state.project.link.root().format()}`"
      :data="{ 'front-matter': 'contents' }"
      class="text-gray-400 hover:text-gray-700"
      title="Back to Contents"
    >
      <Multilingual>
        <template #zh> 目录页 </template>
        <template #default> CONTENTS </template>
      </Multilingual>
    </Link>
  </div>
</template>

<script setup>
import { BookState as State } from "./book-state"

import Multilingual from "../../components/atoms/Multilingual.vue"

defineProps({ state: State })
</script>
