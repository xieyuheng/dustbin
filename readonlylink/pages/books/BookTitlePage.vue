<template>
  <div
    class="flex h-screen flex-col items-center justify-between py-12 font-serif text-2xl"
  >
    <div
      class="flex flex-col items-center py-4 font-sans text-3xl font-bold md:text-4xl"
    >
      <h1 class="text-center">
        <span class="px-2">{{ state.project.config.title }}</span>
      </h1>

      <h2
        class="px-2 py-2 text-center font-sans text-xl font-normal md:text-2xl"
      >
        <span>{{ state.project.config.subtitle }}</span>
      </h2>

      <Link
        preserve-state
        :href="`/books/${state.project.link.root().format()}`"
        :data="{ 'front-matter': 'contents' }"
        class="flex space-x-1.5 py-4 text-gray-400 hover:text-gray-900"
      >
        <IconBookOpen class="w-5 pb-0.5" />

        <Multilingual class="text-xl">
          <template #zh> 阅读 </template>
          <template #default> READ </template>
        </Multilingual>
      </Link>
    </div>

    <section class="py-4">
      <div v-if="attributes.authors.length > 0">
        <div
          class="py-1 text-center font-sans font-bold"
          v-for="({ name }, index) in attributes.authors"
          :key="index"
        >
          {{ name }}
        </div>
      </div>

      <div v-if="attributes.translators.length > 0">
        <div
          class="flex items-center text-center font-sans text-xl font-bold"
          title="Translators"
        >
          <IconTranslate class="w-5 pr-1" />
          {{ attributes.translators.map(({ name }) => name).join(", ") }}
        </div>
      </div>
    </section>

    <section class="flex flex-col items-center px-2">
      <a
        :href="formatHostURL(state.project.link)"
        class="flex flex-col items-center py-1 font-sans text-lg hover:text-gray-500 md:flex-row"
        target="_blank"
      >
        <div class="text-center">
          <span v-if="state.project.link.host" class="hidden md:inline"
            >{{ state.project.link.host }}/</span
          ><span>{{ state.project.link.name }}</span>
        </div>
        <div>
          <span v-if="state.project.link.host" class="inline md:hidden">{{
            state.project.link.host
          }}</span>
        </div>
      </a>

      <div v-if="state.project.config.year" class="text font-sans text-base">
        {{ state.project.config.year }}
      </div>
      <div
        v-else-if="state.project.config.date"
        class="text font-sans text-base"
      >
        {{ state.project.config.date }}
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { BookState as State } from "./book-state"
import { LinkFactory } from "../../models/link"
import { normalizeAttributes } from "../../components/md/pages/default/normalize-attributes"

import SpanJoin from "../../components/atoms/SpanJoin.vue"
import IconBookOpen from "../../components/icons/IconBookOpen.vue"
import IconTranslate from "../../components/icons/IconTranslate.vue"
import Multilingual from "../../components/atoms/Multilingual.vue"

const formatHostURL = new LinkFactory().formatHostURL

const props = defineProps({ state: State })

const attributes = computed(() =>
  normalizeAttributes(props.state.project.config)
)
</script>
