<template>
  <div>
    <h2 class="flex font-bold"><IconLink class="mr-1 w-5" /> Link</h2>

    <ul class="pl-6">
      <li class="list-disc">
        host:
        <span class="text-black">{{ link.host }}</span>
      </li>
      <li class="list-disc">
        name: <span class="text-black">{{ link.name }}</span>
      </li>
      <li v-if="link.version" class="list-disc">
        version:
        <span class="text-black">{{ link.version }}</span>
      </li>
      <li v-if="link.path" class="list-disc">
        path:
        <span class="text-black">{{ link.path }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { Link } from "../../../models/link"

import IconLink from "../../../components/icons/IconLink.vue"

defineProps({ link: Link })
</script>
