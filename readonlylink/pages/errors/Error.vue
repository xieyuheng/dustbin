<template>
  <Head>
    <title v-if="config.langIs('zh')">{{ status }} | 只读</title>
    <title v-else>{{ status }} | Readonly</title>
  </Head>

  <section class="space-y-2 py-4">
    <h2 class="py-1 font-sans text-2xl font-bold">{{ status }}</h2>
    <p>{{ description(config.lang) }}</p>
  </section>
</template>

<script>
import PageLayout from "../../components/layouts/page-layout/PageLayout.vue"

export default {
  layout: PageLayout,
}
</script>

<script setup>
import { useConfig } from "../../composables/config"
const config = useConfig()

const props = defineProps({
  status: Number,
})

function description(lang) {
  if (lang.zh) {
    return {
      503: "找不到服务器",
      500: "服务器错误",
      404: "没有这个页面",
      403: "禁止的访问",
    }[props.status]
  }

  return {
    503: "Service Unavailable",
    500: "Server Error",
    404: "Page Not Found",
    403: "Forbidden",
  }[props.status]
}
</script>
