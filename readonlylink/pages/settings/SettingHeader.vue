<template>
  <div class="flex items-center justify-between pb-3">
    <div class="font-sans text-4xl font-semibold">
      <Link :href="`/authors/${user.username}`">{{ user.name }}</Link>
    </div>
    <div class="flex shrink-0 flex-col items-end">
      <Link
        class="text-xl text-gray-500 hover:text-gray-900"
        :href="`/projects/${user.username}`"
        >@{{ user.username }}</Link
      >
      <Multilingual class="text-lg text-gray-500">
        <template #zh> 始于 {{ since(user.created_at) }} </template>
        <template #default> Since {{ since(user.created_at) }} </template>
      </Multilingual>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { createProps } from "../../ut/create-props"
import { UserWithEmailSchema } from "../../datatypes/user"
import { formatDate } from "../../ut/format-date"

import Multilingual from "../../components/atoms/Multilingual.vue"

const props = defineProps(
  createProps({
    user: UserWithEmailSchema,
  })
)

function since(t) {
  return formatDate(new Date(t))
}
</script>
