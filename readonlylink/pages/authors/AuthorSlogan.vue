<template>
  <div>
    <div v-show="config.langIs('zh')">
      <div class="font-logo text-2xl font-semibold text-gray-500">
        <span class="text-gray-900">友谊</span>与<span class="text-gray-900"
          >创作</span
        >的<span class="text-gray-900">赞歌</span>
      </div>
    </div>
    <div v-show="!config.langIs('zh')">
      <div class="font-logo text-2xl font-semibold text-gray-500">
        An <span class="text-gray-900">ode</span>
        <br class="md:hidden" />
        of <span class="text-gray-900">friendship</span> and
        <span class="text-gray-900">authorship</span>.
      </div>
    </div>
  </div>
</template>

<script setup>
import { useConfig } from "../../composables/config"
const config = useConfig()
</script>
