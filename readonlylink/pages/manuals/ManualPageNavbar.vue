<template>
  <div
    class="flex flex-col overflow-y-auto border-r border-gray-200 bg-stone-50 px-6 pt-6 pb-10 font-sans shadow-md shadow-stone-200"
    style="width: 320px"
  >
    <div v-for="(entries, name) in state.sections" :key="name">
      <div v-if="name !== 'default'" class="py-3 text-xl font-bold">
        {{ name }}
      </div>
      <div v-for="{ link, attributes } in entries" :key="link.format()">
        <div class="py-0.5">
          <Link
            :preserve-state="!isMobile"
            :href="`/manuals/${link.format()}`"
            :title="link.format()"
            class="text-xl hover:text-gray-500"
            :class="
              link.format() === state.project.link.format() &&
              'underline decoration-stone-500 decoration-wavy underline-offset-4'
            "
          >
            {{ attributes.title }}
          </Link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { ManualState as State } from "./manual-state"

defineProps({ state: State, isMobile: Boolean })
</script>
