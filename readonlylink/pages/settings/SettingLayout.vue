<template>
  <div class="relative flex flex-col">
    <SettingFlashMessage class="absolute top-0 right-0" />

    <SettingHeader :user="user" />

    <div class="flex">
      <SettingNavbar class="w-24 shrink-0 overflow-x-auto md:w-64" />

      <slot />
    </div>
  </div>
</template>

<script setup>
import { useConfig } from "../../composables/config"
const config = useConfig()
import { createProps } from "../../ut/create-props"
import { UserWithEmailSchema } from "../../datatypes/user"

import IconX from "../../components/icons/IconX.vue"
import SettingNavbar from "./SettingNavbar.vue"
import SettingHeader from "./SettingHeader.vue"
import SettingFlashMessage from "./SettingFlashMessage.vue"

const props = defineProps(
  createProps({
    user: UserWithEmailSchema,
  })
)
</script>
