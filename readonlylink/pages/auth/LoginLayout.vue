<template>
  <Head>
    <title v-if="config.langIs('zh')">登录 | 只读</title>
    <title v-else>Login | Readonly</title>
  </Head>

  <div
    class="mx-auto flex h-full w-full flex-col justify-center px-6 sm:max-w-md sm:px-0"
  >
    <div v-if="!mounted" class="text-center font-sans text-gray-600">
      <Multilingual>
        <template #zh> 加载中⋯⋯ </template>
        <template #default> Loading ... </template>
      </Multilingual>
    </div>

    <slot v-else />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useConfig } from "../../composables/config"

import Multilingual from "../../components/atoms/Multilingual.vue"

const config = useConfig()

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})
</script>
