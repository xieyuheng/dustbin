<template>
  <PageLayout mode="tiling">
    <SettingLayout :user="user">
      <div class="flex w-full flex-col">
        <div class="flex items-baseline justify-between">
          <Multilingual class="pr-2 font-sans text-2xl font-bold">
            <template #zh> 令牌 </template>
            <template #default> Access Tokens </template>
          </Multilingual>

          <div class="font-sans text-sm text-gray-600">
            <Multilingual>
              <template #zh> {{ accessTokens.length }} 个令牌 </template>
              <template #default>
                {{ accessTokens.length }}
                {{ accessTokens.length === 1 ? "token" : "tokens" }}
              </template>
            </Multilingual>
          </div>
        </div>

        <Multilingual class="py-1 text-base text-gray-500">
          <template #zh> 请不要让别人看到您的令牌 </template>
          <template #default> Please keep the tokens to yourself. </template>
        </Multilingual>

        <hr class="my-2 w-full border-t border-gray-400" />

        <div class="flex w-full flex-col space-y-4 py-3">
          <AccessTokenCard
            v-for="accessToken in accessTokens"
            :key="accessToken.token"
            :accessToken="accessToken"
            :accessTokens="accessTokens"
          />
        </div>
      </div>
    </SettingLayout>
  </PageLayout>
</template>

<script setup>
import { useForm } from "@inertiajs/inertia-vue3"
import { createProps } from "../../ut/create-props"
import ty from "@xieyuheng/ty"
import { UserWithEmailSchema } from "../../datatypes/user"
import { AccessTokenSchema } from "../../datatypes/access-token"
import { formatDateTime } from "../../ut/format-date"

import PageLayout from "../../components/layouts/page-layout/PageLayout.vue"
import SettingLayout from "./SettingLayout.vue"
import AccessTokenCard from "./AccessTokenCard.vue"
import Multilingual from "../../components/atoms/Multilingual.vue"

const props = defineProps(
  createProps({
    user: UserWithEmailSchema,
    accessTokens: ty.array(AccessTokenSchema),
  })
)

props.accessTokens.sort((x, y) => (x.created_at > y.created_at ? -1 : 1))
</script>
