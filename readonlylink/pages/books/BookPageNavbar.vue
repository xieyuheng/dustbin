<template>
  <div class="flex justify-between">
    <div>
      <Link
        preserve-state
        v-if="state.paginator?.prev"
        :href="`/books/${state.paginator?.prev.link.format()}`"
        class="text-gray-400 hover:text-gray-700"
        title="Previous Page"
      >
        <Multilingual>
          <template #zh> 前一页 </template>
          <template #default> PREV </template>
        </Multilingual>
      </Link>
      <div v-else class="text-gray-200">
        <Multilingual>
          <template #zh> 前一页 </template>
          <template #default> PREV </template>
        </Multilingual>
      </div>
    </div>

    <div class="flex">
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
      <div class="px-0.5">/</div>
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

    <div>
      <Link
        preserve-state
        v-if="state.paginator?.next"
        :href="`/books/${state.paginator?.next.link.format()}`"
        class="text-gray-400 hover:text-gray-700"
        title="Next Page"
      >
        <Multilingual>
          <template #zh> 下一页 </template>
          <template #default> NEXT </template>
        </Multilingual>
      </Link>
      <div v-else class="text-gray-200">
        <Multilingual>
          <template #zh> 下一页 </template>
          <template #default> NEXT </template>
        </Multilingual>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BookState as State } from "./book-state"

import Multilingual from "../../components/atoms/Multilingual.vue"

defineProps({ state: State })
</script>
