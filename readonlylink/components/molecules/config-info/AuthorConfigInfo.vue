<template>
  <div class="flex flex-col">
    <Link
      class="max-w-max overflow-x-auto font-bold text-gray-900 hover:text-gray-400"
      :href="href"
    >
      <div class="text-xl">{{ user.name }}</div>
    </Link>

    <MdDefaultAttributes class="text-lg" :attributes="config" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import ty from "@xieyuheng/ty"
import { createProps } from "../../../ut/create-props"

import MdDefaultAttributes from "../../../components/md/pages/default/MdDefaultAttributes.vue"

const props = defineProps(
  createProps({
    config: ty.any(),
    user: ty.any(),
    project: ty.any(),
  })
)

const href = ref(`/authors/${props.user.username}`)
</script>
