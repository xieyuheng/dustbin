<template>
  <div
    class="flex w-full flex-wrap justify-between py-1 font-sans text-gray-400"
  >
    <div class="flex flex-wrap">
      <Link class="pr-3 hover:text-gray-900" href="/authors">
        <Multilingual>
          <template #zh> 作者 </template>
          <template #default> AUTHORS </template>
        </Multilingual>
      </Link>

      <Link class="pr-3 hover:text-gray-900" href="/docs">
        <Multilingual>
          <template #zh> 文档 </template>
          <template #default> DOCS </template>
        </Multilingual>
      </Link>

      <Link class="pr-3 hover:text-gray-900" href="/history">
        <Multilingual>
          <template #zh> 历史 </template>
          <template #default> HISTORY </template>
        </Multilingual>
      </Link>

      <Link class="pr-3 hover:text-gray-900" href="/about">
        <Multilingual>
          <template #zh> 关于 </template>
          <template #default> ABOUT </template>
        </Multilingual>
      </Link>
    </div>
  </div>
</template>

<script setup>
import Multilingual from "../../../components/atoms/Multilingual.vue"
</script>
