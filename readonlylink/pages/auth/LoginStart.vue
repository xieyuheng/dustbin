<template>
  <form
    class="flex flex-col space-y-2 pb-12"
    @submit.prevent="
      form.post('/login', {
        headers: {
          'Accept-Language': config.lang,
        },
      })
    "
  >
    <div class="flex flex-col pb-2">
      <div class="flex items-baseline justify-between">
        <div class="font-logo text-3xl font-semibold">
          <Multilingual>
            <template #zh> 登录 </template>
            <template #default> Login </template>
          </Multilingual>
        </div>

        <div class="text-xl">
          <Multilingual>
            <template #zh>
              尚未<Link href="/register" class="underline">注册</Link>？
            </template>
            <template #default>
              Not yet
              <Link href="/register" class="underline">Registered</Link>?
            </template>
          </Multilingual>
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="flex">
        <input
          id="email"
          name="email"
          autocomplete="email"
          class="w-full rounded-sm border border-gray-600 px-3 py-4 text-lg font-bold placeholder-gray-800 placeholder-opacity-60"
          type="email"
          maxlength="100"
          :placeholder="config.langIs('zh') ? '电子邮箱' : 'Email'"
          spellcheck="false"
          required
          v-model.trim="form.email"
        />

        <button
          class="pl-2"
          :class="[form.processing ? `text-gray-300` : `text-gray-700`]"
          type="submit"
          :disabled="form.processing"
        >
          <IconArrowCircleRight v-if="!form.processing" class="h-8 w-8" />
          <IconDotsCircleHorizontal v-if="form.processing" class="h-8 w-8" />
        </button>
      </div>

      <div v-if="form.errors.email" class="text-xm py-1 text-orange-500">
        {{ form.errors.email }}
      </div>
    </div>
  </form>
</template>

<script>
import PageLayout from "../../components/layouts/page-layout/PageLayout.vue"
import LoginLayout from "./LoginLayout.vue"

export default {
  layout: [PageLayout, LoginLayout],
}
</script>

<script setup>
import { useForm } from "@inertiajs/inertia-vue3"
import { useConfig } from "../../composables/config"

import IconArrowCircleRight from "../../components/icons/IconArrowCircleRight.vue"
import IconDotsCircleHorizontal from "../../components/icons/IconDotsCircleHorizontal.vue"
import Multilingual from "../../components/atoms/Multilingual.vue"

const config = useConfig()

const form = useForm({
  email: null,
})
</script>
