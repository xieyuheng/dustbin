<template>
  <div class="flex items-center justify-between">
    <div>
      <div v-if="file.path.endsWith('.md')" class="flex items-center">
        <IconPlay class="mr-1 h-4 w-4 text-gray-500" />
        <a
          target="_blank"
          :href="
            formatRenderPath('Article', {
              username: state.user.username,
              project: state.project.name,
              path: file.path,
            })
          "
          title="View as an article."
          class="flex items-baseline font-sans text-lg text-gray-500 hover:text-gray-900"
        >
          <div>{{ translateRenderKind("Article", userConfig) }}</div>
        </a>
      </div>
    </div>

    <div class="flex space-x-2">
      <button
        v-if="$page.props.auth.user?.username === state.user.username"
        @click="save()"
        class="relative self-end font-sans text-lg text-gray-500 hover:text-gray-900"
        :class="saving && 'text-orange-400 hover:text-orange-500'"
      >
        SAVE
      </button>

      <button
        @click="$emit('exit')"
        class="self-end font-sans text-lg text-gray-500 hover:text-gray-900"
      >
        EXIT
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue"
import { useConfig } from "../../composables/config"
import { translateRenderKind, formatRenderPath } from "../../models/render-kind"
import { File, Directory } from "./ranger"
import { ProjectState as State } from "./project-state"
import throttle from "lodash/throttle"
import debounce from "lodash/debounce"
import axios from "axios"
import * as ut from "../../ut"

import IconPlay from "../../components/icons/IconPlay.vue"
import IconX from "../../components/icons/IconX.vue"

const userConfig = useConfig()

const props = defineProps({
  state: State,
  text: String,
  file: File,
  directory: Directory,
})

const saving = ref(false)

const save = debounce(
  async () => {
    await props.state.ranger.saveFile(props.file.path, props.text, {
      onStart: () => (saving.value = true),
      onFinish: () => (saving.value = false),
      onError: (error) => {
        window.alert(
          [`${error.name} (during saving file):`, error.message].join("\n")
        )
      },
    })
  },
  1000,
  {
    leading: true,
  }
)
</script>
