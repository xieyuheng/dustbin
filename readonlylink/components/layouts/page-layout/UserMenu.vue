<template>
  <Dropdown class="font-sans text-gray-400" align="right">
    <template #trigger>
      <button class="flex hover:text-gray-900">
        <IconMenu class="h-6 w-6" />
      </button>
    </template>

    <ul
      class="flex flex-col items-center rounded-sm border border-gray-300 bg-gray-50 p-2 shadow-lg"
      style="max-width: 10rem"
    >
      <li
        class="w-full overflow-x-auto overflow-y-hidden overflow-y-hidden whitespace-pre p-1 text-lg font-bold hover:text-gray-900"
      >
        <Link
          class="block text-center"
          :title="config.langIs('zh') ? '作者' : 'AUTHORSHIP'"
          :href="`/authors/${user.username}`"
          >{{ user.name }}</Link
        >
      </li>

      <li
        class="w-full overflow-x-auto overflow-y-hidden whitespace-pre p-1 text-base hover:text-gray-900"
      >
        <Link
          class="block text-center"
          :title="config.langIs('zh') ? '项目' : 'PROJECTS'"
          :href="`/projects/${user.username}`"
          >@{{ user.username }}</Link
        >
      </li>

      <hr class="my-2 w-full border-t-2 border-dotted border-gray-400" />

      <li class="w-full p-1 hover:text-gray-900">
        <Link href="/settings" class="block text-center">
          <Multilingual>
            <template #zh> 设置 </template>
            <template #default> SETTINGS </template>
          </Multilingual>
        </Link>
      </li>

      <hr class="my-2 w-full border-t-2 border-dotted border-gray-400" />

      <li class="w-full p-1 hover:text-gray-900">
        <Link href="/logout" method="post" class="block text-center">
          <Multilingual>
            <template #zh> 退出 </template>
            <template #default> LOGOUT </template>
          </Multilingual>
        </Link>
      </li>
    </ul>
  </Dropdown>
</template>

<script setup>
import { ref } from "vue"
import { useConfig } from "../../../composables/config"
import { createProps } from "../../../ut/create-props"
import { UserSchema } from "../../../datatypes/user"

import Dropdown from "../../../components/atoms/Dropdown.vue"
import IconMenu from "../../../components/icons/IconMenu.vue"
import Multilingual from "../../../components/atoms/Multilingual.vue"

const config = useConfig()

defineProps(createProps({ user: UserSchema }))
</script>
