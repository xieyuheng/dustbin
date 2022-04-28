<template>
  <PageLayout mode="tiling">
    <SettingLayout :user="user">
      <div class="flex w-full flex-col">
        <div class="font-sans text-2xl font-bold">
          <Multilingual>
            <template #zh> 简介 </template>
            <template #default> Profile </template>
          </Multilingual>
        </div>

        <hr class="my-2 w-full border-t border-gray-400" />

        <form
          class="my-2 flex max-w-max flex-col"
          @submit.prevent="
            form.patch('/settings/profile', {
              headers: {
                'Accept-Language': config.lang,
              },
            })
          "
        >
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
            class="w-full rounded-sm border border-gray-600 p-3 text-lg font-bold disabled:bg-gray-100"
            type="email"
            maxlength="100"
            spellcheck="false"
            disabled
            required
            v-model="form.email"
          />

          <Multilingual class="py-1 text-base text-gray-500">
            <template #zh> 您的邮箱地址不会被公开 </template>
            <template #default>
              Your email address will be kept private.
            </template>
          </Multilingual>

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
                <template #zh> 更新简介 </template>
                <template #default> Update profile </template>
              </Multilingual>
            </button>
          </div>
        </form>
      </div>
    </SettingLayout>
  </PageLayout>
</template>

<script setup>
import { useForm } from "@inertiajs/inertia-vue3"
import { useConfig } from "../../composables/config"
import { createProps } from "../../ut/create-props"
import { UserWithEmailSchema } from "../../datatypes/user"

import PageLayout from "../../components/layouts/page-layout/PageLayout.vue"
import SettingLayout from "./SettingLayout.vue"
import Multilingual from "../../components/atoms/Multilingual.vue"

const config = useConfig()

const props = defineProps(
  createProps({
    user: UserWithEmailSchema,
  })
)

const form = useForm(props.user)
</script>
