<template>
  <div class="flex flex-col">
    <div
      class="flex items-baseline justify-between font-sans text-base text-gray-500"
      :title="file"
    >
      {{ translateRenderKind(kind, userConfig) }}
    </div>

    <div>
      <BookConfigInfo
        v-if="kind === 'Book'"
        :config="config"
        :user="user"
        :project="project"
      />
      <ManualConfigInfo
        v-else-if="kind === 'Manual'"
        :config="config"
        :user="user"
        :project="project"
      />
      <AuthorConfigInfo
        v-else-if="kind === 'Author'"
        :config="config"
        :user="user"
        :project="project"
      />
      <div v-else class="text-red-600">Unknown config kind: {{ kind }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import ty from "@xieyuheng/ty"
import { createProps } from "../../../ut/create-props"
import { useConfig } from "../../../composables/config"
const userConfig = useConfig()
import { translateRenderKind } from "../../../models/render-kind"

import BookConfigInfo from "./BookConfigInfo.vue"
import ManualConfigInfo from "./ManualConfigInfo.vue"
import AuthorConfigInfo from "./AuthorConfigInfo.vue"

defineProps(
  createProps({
    kind: ty.string(),
    file: ty.string(),
    config: ty.any(),
    user: ty.any(),
    project: ty.any(),
  })
)
</script>
