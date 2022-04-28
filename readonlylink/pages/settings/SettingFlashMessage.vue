<template>
  <div
    class="flex w-full items-center justify-between rounded-sm border border-gray-600 bg-white p-3 font-sans opacity-95"
    v-if="$page.props.flash.message"
  >
    <div>{{ $page.props.flash.message }}</div>

    <button
      class="font-sans text-sm text-gray-400"
      @click="$page.props.flash.message = ''"
    >
      <IconX class="h-5 w-5" />
    </button>
  </div>
</template>

<script setup>
import { useConfig } from "../../composables/config"
const config = useConfig()

import IconX from "../../components/icons/IconX.vue"
import SettingFlashMessage from "./SettingFlashMessage.vue"
</script>
