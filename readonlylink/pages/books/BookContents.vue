<template>
  <div
    class="flex min-h-screen flex-col justify-center px-6 py-12 font-serif text-2xl"
  >
    <div
      v-for="{ link, attributes } in state.project.contents"
      :key="link.path"
    >
      <div>
        <Link
          preserve-state
          :href="`/books/${link.format()}`"
          class="font-sans hover:text-gray-500"
        >
          {{ attributes.title }}
        </Link>

        <div
          class="text-right font-sans text-xs italic leading-3 tracking-tight text-gray-500 hover:text-black"
        >
          <Link preserve-state :href="`/books/${link.format()}`">
            {{ link.path }}
          </Link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { BookState as State } from "./book-state"

defineProps({ state: State })

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>
