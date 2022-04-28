<template>
  <Multilingual>
    <template #zh>
      <div class="font-logo text-2xl font-semibold text-gray-500">
        <span class="text-gray-900">学习</span>与<span class="text-gray-900"
          >成长</span
        >的<span class="text-gray-900">轨迹</span>
      </div>
    </template>
    <template #default>
      <div class="font-logo text-2xl font-semibold text-gray-500">
        The <span class="text-gray-900">trace</span>
        <br class="md:hidden" />
        of <span class="text-gray-900">study</span> and
        <span class="text-gray-900">growth</span>.
      </div>
    </template>
  </Multilingual>
</template>

<script setup>
import Multilingual from "../../components/atoms/Multilingual.vue"
</script>
