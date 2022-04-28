<template>
  <Multilingual>
    <template #zh>
      <div class="font-logo text-2xl font-semibold text-gray-500">
        <span class="text-gray-900">书籍</span>与<span class="text-gray-900"
          >文章</span
        >的<span class="text-gray-900">邀请</span>
      </div>
    </template>
    <template #default>
      <div class="font-logo text-2xl font-semibold text-gray-500">
        An <span class="text-gray-900">invitation</span>
        <br class="md:hidden" />
        from <span class="text-gray-900">books</span> and
        <span class="text-gray-900">articles</span>.
      </div>
    </template>
  </Multilingual>
</template>

<script setup>
import Multilingual from "../../components/atoms/Multilingual.vue"
</script>
