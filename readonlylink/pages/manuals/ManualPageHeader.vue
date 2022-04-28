<template>
  <div
    class="flex items-center border-b border-gray-300 shadow shadow-stone-200"
  >
    <button
      class="mr-3 block md:hidden"
      @click.capture.stop="$emit('toggleNavbar')"
    >
      <IconMenu class="w-7" />
    </button>

    <div
      class="overflow-x-auto whitespace-nowrap py-1 font-logo text-2xl font-bold"
    >
      <Link
        preserve-state
        :href="`/manuals/${state.project.link.root().format()}`"
      >
        {{ state.project.config.title }}
      </Link>
    </div>
  </div>
</template>

<script setup>
import { ManualState as State } from "./manual-state"

import IconMenu from "../../components/icons/IconMenu.vue"

defineProps({ state: State })
</script>
