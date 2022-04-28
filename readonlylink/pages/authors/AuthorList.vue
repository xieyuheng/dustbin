<template>
  <div>
    <Head>
      <title v-if="config.langIs('zh')">作者 | 只读</title>
      <title v-else>Authors | Readonly</title>
    </Head>

    <AuthorSlogan class="my-4" />

    <div class="flex items-baseline space-x-4">
      <Multilingual class="font-logo text-2xl font-semibold text-gray-800">
        <template #zh> 作者 </template>
        <template #default> Authors </template>
      </Multilingual>
    </div>

    <div class="pb-6">
      <div v-for="user in state.users" :key="user.username" class="flex">
        <LinkEntry>
          <template #metadata>
            <div class="flex flex-col items-end font-sans">
              <Multilingual>
                <template #zh> 始于 </template>
                <template #default> Since </template>
              </Multilingual>
              <div>
                {{ since(user.created_at) }}
              </div>
            </div>
          </template>

          <template #default>
            <div class="my-6 flex flex-col">
              <Link
                :href="`/authors/${user.username}`"
                class="my-1 overflow-x-auto font-sans text-3xl font-bold hover:text-gray-400"
              >
                {{ user.name }}
              </Link>
              <Link
                :href="`/projects/${user.username}`"
                class="my-1 overflow-x-auto font-sans text-gray-500 hover:text-gray-900"
              >
                @{{ user.username }}
              </Link>
            </div>
          </template>
        </LinkEntry>
      </div>
    </div>
  </div>
</template>

<script>
import PageLayout from "../../components/layouts/page-layout/PageLayout.vue"

export default {
  layout: PageLayout,
}
</script>

<script setup>
import { ref } from "vue"
import ty from "@xieyuheng/ty"
import { useConfig } from "../../composables/config"
import { createProps } from "../../ut/create-props"
import { UserSchema } from "../../datatypes/user"
import { formatDate } from "../../ut/format-date"
import { AuthorListState as State } from "./author-list-state"

import Multilingual from "../../components/atoms/Multilingual.vue"
import LinkEntry from "../../components/molecules/link-entry/LinkEntry.vue"
import IconMinus from "../../components/icons/IconMinus.vue"
import IconExternalLink from "../../components/icons/IconExternalLink.vue"
import AuthorSlogan from "./AuthorSlogan.vue"

const config = useConfig()

const props = defineProps(
  createProps({
    users: ty.array(UserSchema),
  })
)

const state = ref(new State(props.users))

function since(t) {
  return formatDate(new Date(t))
}
</script>
