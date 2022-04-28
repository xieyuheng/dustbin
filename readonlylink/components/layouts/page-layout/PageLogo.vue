<template>
  <div>
    <div class="relative hidden font-logo text-4xl font-semibold md:block">
      <span class="absolute -left-20 -top-0.5 tracking-tighter"> -r-- </span>
      <Multilingual>
        <template #zh> 只读链接 </template>
        <template #default> Readonly.Link </template>
      </Multilingual>
    </div>

    <div class="flex flex-col font-logo text-4xl font-semibold md:hidden">
      <Multilingual>
        <template #zh> 只读 </template>
        <template #default> -r-- </template>
      </Multilingual>
    </div>
  </div>
</template>

<script setup>
import Multilingual from "../../../components/atoms/Multilingual.vue"
</script>
