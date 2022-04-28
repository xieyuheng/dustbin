<template>
  <div class="text-xm overflow-x-auto py-1">
    <div class="flex flex-col items-center text-center">
      <h2 class="py-2 text-xl font-bold">
        <Multilingual>
          <template #zh> 等待邮件登录确认 </template>
          <template #default> Awaiting Login Email Confirmation </template>
        </Multilingual>
      </h2>
      <div class="py-1 text-lg">
        <Multilingual>
          <template #zh>
            已向 <b>{{ email }}</b> 发送了邮件
          </template>
          <template #default>
            We just sent an email to <b>{{ email }}</b>
          </template>
        </Multilingual>
      </div>
      <div class="py-1 text-lg">
        <Multilingual>
          <template #zh> 确认前，请比对 <b>识别码</b>： </template>
          <template #default>
            Before verifying, please compare the <b>confirmation code</b>:
          </template>
        </Multilingual>
      </div>
      <div class="py-2 text-lg">
        <p class="border-4 border-gray-200 bg-gray-100 py-1 px-2 font-black">
          {{ confirmation_code }}
        </p>
      </div>

      <button
        class="my-2 font-sans font-bold text-gray-400 hover:text-gray-900"
        @click="revoke()"
      >
        <Multilingual>
          <template #zh> 撤销 </template>
          <template #default> REVOKE </template>
        </Multilingual>
      </button>
    </div>
  </div>
</template>

<script>
import PageLayout from "../../components/layouts/page-layout/PageLayout.vue"
import LoginLayout from "./LoginLayout.vue"

export default {
  layout: [PageLayout, LoginLayout],
}
</script>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import ty from "@xieyuheng/ty"
import { Inertia } from "@inertiajs/inertia"
import { createProps } from "../../ut/create-props"

import Multilingual from "../../components/atoms/Multilingual.vue"

const props = defineProps(
  createProps({
    email: ty.string(),
    confirmation_code: ty.string(),
    links: ty.object({
      verify: ty.string(),
      revoke: ty.string(),
    }),
  })
)

const polling = ref(null)

onMounted(() => {
  polling.value = window.setInterval(async () => {
    const { data } = await axios.get(props.links.verify)
    if (data) {
      const { username } = data
      clearPolling()
      Inertia.get(
        `/projects/${username}`,
        {},
        {
          replace: true,
          preserveState: true,
        }
      )
    }
  }, 3000)
})

function clearPolling() {
  if (polling.value !== null) {
    clearInterval(polling.value)
  }
}

async function revoke() {
  clearPolling()
  await axios.get(props.links.revoke)
  Inertia.get(
    `/login`,
    {},
    {
      replace: true,
      preserveState: true,
    }
  )
}
</script>
