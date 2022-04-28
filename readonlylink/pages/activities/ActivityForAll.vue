<template>
  <Head>
    <title v-if="config.langIs('zh')">动态 | 只读</title>
    <title v-else>动态 | Readonly</title>
  </Head>

  <ActivitySlogan class="my-4" />

  <main class="pb-6">
    <ActivityEntry
      v-for="(activity, index) in activities"
      :key="index"
      :activity="activity"
    />
  </main>
</template>

<script>
import PageLayout from "../../components/layouts/page-layout/PageLayout.vue"

export default {
  layout: PageLayout,
}
</script>

<script setup>
import { useConfig } from "../../composables/config"
import { activities } from "./mock-activities"

import Multilingual from "../../components/atoms/Multilingual.vue"
import ActivityEntry from "./ActivityEntry.vue"
import ActivitySlogan from "./ActivitySlogan.vue"

const config = useConfig()
</script>
