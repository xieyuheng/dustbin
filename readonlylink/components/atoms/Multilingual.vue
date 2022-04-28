<template>
  <div>
    <div v-show="config.langIs('zh')">
      <slot name="zh"></slot>
    </div>

    <div v-show="config.langElse()">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script setup>
import { useConfig } from "../../composables/config"

const config = useConfig()
</script>
