<template>
  <Multilingual>
    <template #zh>
      <div class="font-logo text-2xl font-semibold text-gray-500">
        一个<span class="text-gray-900">技术工人</span>的<span
          class="text-gray-900"
          >简单好奇心</span
        >
      </div>
    </template>
    <template #default>
      <div class="font-logo text-2xl font-semibold text-gray-500">
        The <span class="text-gray-900">simple curiosity</span>
        <br class="md:hidden" />
        of a <span class="text-gray-900">craftsman</span>.
      </div>
    </template>
  </Multilingual>
</template>

<script setup>
import Multilingual from "../../components/atoms/Multilingual.vue"
</script>
