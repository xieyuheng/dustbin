<template>
  <div class="flex flex-col font-sans">
    <Link
      href="/settings/profile"
      class="py-2 text-gray-400 hover:font-bold hover:text-gray-900"
      :class="{ 'font-bold text-gray-900': $page.url === '/settings/profile' }"
    >
      <Multilingual>
        <template #zh> 简介 </template>
        <template #default> Profile </template>
      </Multilingual>
    </Link>
    <Link
      href="/settings/access-tokens"
      class="py-2 text-gray-400 hover:font-bold hover:text-gray-900"
      :class="{
        'font-bold text-gray-900': $page.url === '/settings/access-tokens',
      }"
    >
      <Multilingual>
        <template #zh> 令牌 </template>
        <template #default> Access Tokens </template>
      </Multilingual>
    </Link>
  </div>
</template>

<script setup>
import Multilingual from "../../components/atoms/Multilingual.vue"
</script>
