<template>
  <div class="flex w-full flex-col rounded-sm border border-gray-300 p-3">
    <div class="text-lg font-bold">{{ accessToken.name }}</div>

    <div class="flex items-baseline space-x-2 self-end text-base">
      <div class="text-sm text-gray-500">
        <Multilingual v-if="accessToken.last_used_at">
          <template #zh>
            上次使用：{{ formatDateTime(accessToken.last_used_at) }}
          </template>
          <template #default>
            Last uset at: {{ formatDateTime(accessToken.last_used_at) }}
          </template>
        </Multilingual>

        <Multilingual v-else>
          <template #zh> 尚未使用过 </template>
          <template #default> Never used yet </template>
        </Multilingual>
      </div>

      <button
        class="font-sans text-gray-400 hover:text-gray-900"
        :class="{ 'text-orange-400 hover:text-orange-600': deleting }"
        @click="deleteAccessToken()"
      >
        <Multilingual>
          <template #zh> 删除 </template>
          <template #default> DELETE </template>
        </Multilingual>
      </button>
    </div>

    <textarea
      spellcheck="false"
      readonly
      rows="1"
      class="w-sm my-2 resize-none whitespace-pre rounded-sm border border-gray-300 bg-gray-50 p-2 font-mono text-sm"
      >{{ accessToken.token }}</textarea
    >

    <Multilingual class="text-base text-gray-500">
      <template #zh>
        创建于：{{ formatDateTime(accessToken.created_at) }}
      </template>
      <template #default>
        Created at: {{ formatDateTime(accessToken.created_at) }}
      </template>
    </Multilingual>
  </div>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"
import ty from "@xieyuheng/ty"
import { useConfig } from "../../composables/config"
import { createProps } from "../../ut/create-props"
import { AccessTokenSchema } from "../../datatypes/access-token"
import { formatDateTime } from "../../ut/format-date"

import Multilingual from "../../components/atoms/Multilingual.vue"

const config = useConfig()

const props = defineProps(
  createProps({
    accessTokens: ty.array(AccessTokenSchema),
    accessToken: AccessTokenSchema,
  })
)

const deleting = ref(false)

async function deleteAccessToken() {
  const message = config.langIs("zh")
    ? [
        `确定要删除这个令牌吗？`,
        ``,
        `${props.accessToken.token}`,
        ``,
        `名字: ${props.accessToken.name}`,
        `创建于: ${formatDateTime(props.accessToken.created_at)}`,
      ].join("\n")
    : [
        `Are you sure to delete this token?`,
        ``,
        `${props.accessToken.token}`,
        ``,
        `name: ${props.accessToken.name}`,
        `created at: ${formatDateTime(props.accessToken.created_at)}`,
      ].join("\n")
  const sure = window.confirm(message)

  if (!sure) return

  deleting.value = true

  await axios.delete(`/settings/access-tokens/${props.accessToken.token}`)

  const index = props.accessTokens.indexOf(props.accessToken)
  if (index !== -1) {
    props.accessTokens.splice(index, 1)
  }
}
</script>
