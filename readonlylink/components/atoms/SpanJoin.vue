<template>
  <span v-for="(item, index) in items" :key="index">
    <slot name="item" v-bind="item"></slot>
    <span v-if="index !== items.length - 1">
      <slot name="delimiter"></slot>
    </span>
  </span>
</template>

<script setup>
defineProps({ items: Array })
</script>
