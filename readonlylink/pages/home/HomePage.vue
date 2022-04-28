<template>
  <HomeSlogan class="my-4" />

  <div>
    <div class="flex items-baseline space-x-4">
      <Multilingual class="font-logo text-2xl font-semibold text-gray-800">
        <template #zh> 评介 </template>
        <template #default> Reviews </template>
      </Multilingual>
    </div>

    <div>TODO</div>
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

import HomeSlogan from "./HomeSlogan.vue"

const config = useConfig()
</script>
