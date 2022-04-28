<template>
  <div>
    <Dropdown align="right">
      <template #trigger>
        <button>
          <IconMenu class="w-5" />
        </button>
      </template>

      <ul
        class="flex flex-col rounded-sm border border-gray-200 bg-gray-50 p-1"
      >
        <li class="p-1 text-right font-bold text-gray-500 hover:text-gray-300">
          <button
            class="w-full min-w-max"
            @click="$emit('copy')"
            title="Copy code to clipboard"
          >
            <Multilingual>
              <template #zh> 复制 </template>
              <template #default> COPY </template>
            </Multilingual>
          </button>
        </li>

        <li class="p-1 text-right font-bold text-gray-500 hover:text-gray-300">
          <button
            class="w-full min-w-max"
            @click="$emit('download')"
            title="Download code"
          >
            <Multilingual>
              <template #zh> 下载 </template>
              <template #default> DOWNLOAD </template>
            </Multilingual>
          </button>
        </li>
      </ul>
    </Dropdown>
  </div>
</template>

<script setup>
import { ref } from "vue"

import IconMenu from "../../../components/icons/IconMenu.vue"
import Dropdown from "../../../components/atoms/Dropdown.vue"
import Multilingual from "../../../components/atoms/Multilingual.vue"
</script>
