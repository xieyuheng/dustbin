<template>
  <div class="flex flex-col items-end font-sans">
    <div v-if="project.statistic.lastModified">
      {{ formatDate(project.statistic.lastModified) }}
    </div>
    <div v-if="project.statistic.lastModified">
      {{ formatTime(project.statistic.lastModified) }}
    </div>
    <div>{{ project.statistic.length }} files</div>
    <div>{{ filesize(project.statistic.size) }}</div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import filesize from "filesize"
import { useConfig } from "../../composables/config"
const config = useConfig()
import { formatDate, formatTime } from "../../ut/format-date"

defineProps({ project: Object })
</script>
