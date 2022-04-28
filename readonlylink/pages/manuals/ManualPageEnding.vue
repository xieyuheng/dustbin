<template>
  <div class="flex justify-center space-x-4">
    <div
      class="w-1/2 rounded-sm border border-gray-200 bg-stone-50 shadow shadow-stone-200"
      v-if="state.paginator?.prev"
    >
      <Link
        preserve-state
        :href="`/manuals/${state.paginator?.prev.link.format()}`"
        class="flex h-full p-3 text-gray-400 hover:text-gray-700"
        title="Previous Page"
      >
        <div class="flex w-1/5 justify-start py-3">
          <IconArrowLeft class="w-6" />
        </div>

        <div
          class="flex w-4/5 items-center justify-center overflow-x-auto text-xl font-bold"
        >
          <div>{{ state.paginator?.prev.attributes.title }}</div>
        </div>
      </Link>
    </div>

    <div
      class="w-1/2 rounded-sm border border-gray-200 bg-stone-50 shadow shadow-stone-200"
      v-if="state.paginator?.next"
    >
      <Link
        preserve-state
        :href="`/manuals/${state.paginator?.next.link.format()}`"
        class="flex h-full p-3 text-gray-400 hover:text-gray-700"
        title="Next Page"
      >
        <div
          class="flex w-4/5 items-center justify-center overflow-x-auto text-xl font-bold"
        >
          <div>{{ state.paginator?.next.attributes.title }}</div>
        </div>

        <div class="flex w-1/5 justify-end py-3">
          <IconArrowRight class="w-6" />
        </div>
      </Link>
    </div>
  </div>
</template>

<script setup>
import { ManualState as State } from "./manual-state"

import IconArrowLeft from "../../components/icons/IconArrowLeft.vue"
import IconArrowRight from "../../components/icons/IconArrowRight.vue"
import Multilingual from "../../components/atoms/Multilingual.vue"

defineProps({ state: State })
</script>
