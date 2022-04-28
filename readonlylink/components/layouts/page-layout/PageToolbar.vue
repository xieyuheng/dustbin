<template>
  <div class="flex">
    <div class="mr-2 flex text-gray-400 hover:text-gray-900">
      <select
        v-model="config.lang"
        class="bg-white text-right font-sans"
        :title="
          config.langIs('zh') ? '请选择您的语言' : 'Please chose your language.'
        "
      >
        <option value="en" selected>English</option>
        <option value="zh">中文</option>
      </select>

      <IconTranslate class="w-5 p-px" />
    </div>

    <UserMenu v-if="$page.props.auth.user" :user="$page.props.auth.user" />

    <div v-else class="flex flex-wrap font-sans text-gray-400">
      <Link class="mr-2 hover:text-gray-900" href="/login">
        <Multilingual>
          <template #zh> 登录 </template>
          <template #default> LOGIN </template>
        </Multilingual>
      </Link>

      <Link class="hover:text-gray-900" href="/register">
        <Multilingual>
          <template #zh> 注册 </template>
          <template #default> REGISTER </template>
        </Multilingual>
      </Link>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { useConfig } from "../../../composables/config"

import Multilingual from "../../../components/atoms/Multilingual.vue"
import IconTranslate from "../../../components/icons/IconTranslate.vue"
import UserMenu from "./UserMenu.vue"

const config = useConfig()
</script>
