<template>
  <div>
    <Dropdown align="right">
      <template #trigger>
        <button>
          <IconMenu class="w-5 text-gray-500" />
        </button>
      </template>

      <ul
        class="flex min-w-max flex-col rounded-sm border border-gray-200 bg-gray-50 p-1 text-base"
      >
        <li class="p-1 text-right font-bold text-gray-500 hover:text-gray-300">
          <button @click="$emit('run')" title="Run cicada code">
            <Multilingual>
              <template #zh> 运行 </template>
              <template #default> RUN </template>
            </Multilingual>
          </button>
        </li>
        <li class="p-1 text-right font-bold text-gray-500 hover:text-gray-300">
          <button @click="$emit('copy')" title="Copy code to clipboard">
            <Multilingual>
              <template #zh> 复制 </template>
              <template #default> COPY </template>
            </Multilingual>
          </button>
        </li>
        <li class="p-1 text-right font-bold text-gray-500 hover:text-gray-300">
          <button @click="$emit('reset')" title="Reset to original code">
            <Multilingual>
              <template #zh> 重置 </template>
              <template #default> RESET </template>
            </Multilingual>
          </button>
        </li>
      </ul>
    </Dropdown>
  </div>
</template>

<script setup>
import IconMenu from "../../components/icons/IconMenu.vue"
import Dropdown from "../../components/atoms/Dropdown.vue"
import Multilingual from "../../components/atoms/Multilingual.vue"
</script>
