<template>
  <form
    class="flex flex-col space-y-2"
    @submit.prevent="
      form.post('/register', {
        headers: {
          'Accept-Language': config.lang,
        },
      })
    "
  >
    <div class="flex flex-col">
      <div class="font-logo text-3xl font-semibold">
        <Multilingual>
          <template #zh> 注册 </template>
          <template #default> Register </template>
        </Multilingual>
      </div>
    </div>

    <div class="flex flex-col">
      <label for="username" class="py-2 font-sans">
        <Multilingual>
          <template #zh> 用户名 </template>
          <template #default> Username </template>
        </Multilingual>
      </label>

      <input
        id="username"
        name="username"
        class="w-full rounded-sm border border-gray-600 p-3 text-lg font-bold"
        type="text"
        maxlength="32"
        spellcheck="false"
        required
        v-model.trim="form.username"
      />

      <div
        v-if="form.username"
        class="flex flex-wrap pt-2 font-sans text-base font-bold text-gray-600"
      >
        <Multilingual>
          <template #zh> 作者链接： </template>
          <template #default>
            <div class="pr-2">Auhtor link:</div>
          </template>
        </Multilingual>
        <div>readonly.link/authors/{{ form.username }}</div>
      </div>

      <div v-if="form.errors.username" class="py-1 text-base text-orange-500">
        {{ form.errors.username }}
      </div>
    </div>

    <div class="flex flex-col">
      <label for="name" class="py-2 font-sans">
        <Multilingual>
          <template #zh> 名字 </template>
          <template #default> Name </template>
        </Multilingual>
      </label>

      <input
        id="name"
        name="name"
        class="w-full rounded-sm border border-gray-600 p-3 text-lg font-bold"
        type="text"
        maxlength="32"
        spellcheck="false"
        required
        v-model.trim="form.name"
      />

      <div v-if="form.errors.name" class="py-1 text-base text-orange-500">
        {{ form.errors.name }}
      </div>
    </div>

    <div class="flex flex-col">
      <label for="email" class="py-2 font-sans">
        <Multilingual>
          <template #zh> 电子邮箱 </template>
          <template #default> Email </template>
        </Multilingual>
      </label>

      <input
        id="email"
        name="email"
        autocomplete="email"
        class="w-full rounded-sm border border-gray-600 p-3 text-lg font-bold"
        type="email"
        maxlength="100"
        spellcheck="false"
        required
        v-model.trim="form.email"
      />

      <Multilingual class="py-1 text-base text-gray-500">
        <template #zh> 您的邮箱地址不会被公开 </template>
        <template #default> Your email address will be kept private. </template>
      </Multilingual>

      <div v-if="form.errors.email" class="py-1 text-base text-orange-500">
        {{ form.errors.email }}
      </div>
    </div>

    <div class="flex flex-col justify-center py-4">
      <hr class="border-t border-gray-900" />
    </div>

    <div class="flex flex-col">
      <button
        class="rounded-sm border border-gray-600 bg-white py-3 font-sans font-bold hover:bg-gray-100"
        type="submit"
        :disabled="form.processing"
      >
        <Multilingual>
          <template #zh> 注册 </template>
          <template #default> Register </template>
        </Multilingual>
      </button>
    </div>

    <div class="flex justify-end">
      <div class="text-xl">
        <Multilingual>
          <template #zh>
            已注册？<Link href="/login" class="underline">登录</Link>
          </template>
          <template #default>
            Already Registered?
            <Link href="/login" class="underline">Login</Link>.
          </template>
        </Multilingual>
      </div>
    </div>
  </form>
</template>

<script>
import PageLayout from "../../components/layouts/page-layout/PageLayout.vue"
import RegisterLayout from "./RegisterLayout.vue"

export default {
  layout: [PageLayout, RegisterLayout],
}
</script>

<script setup>
import { useForm } from "@inertiajs/inertia-vue3"
import { useConfig } from "../../composables/config"

import Multilingual from "../../components/atoms/Multilingual.vue"

const config = useConfig()

const form = useForm({
  name: null,
  username: null,
  email: null,
})
</script>
