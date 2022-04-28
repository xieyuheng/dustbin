<template>
  <div class="flex h-full w-full flex-col bg-white pb-2">
    <div>
      <div class="overflow-x-auto font-sans text-lg font-bold text-gray-500">
        {{ file.directSubName(directory) }}
      </div>
    </div>

    <ProjectTextEditorToolbar
      :state="state"
      :text="text"
      :file="file"
      :directory="directory"
      @exit="$emit('exit')"
    />

    <textarea
      v-if="text === undefined"
      spellcheck="false"
      class="h-full overflow-y-auto whitespace-pre p-2 font-mono text-base shadow-inner shadow-gray-200"
      placeholder="Loading ..."
      disabled
    ></textarea>
    <textarea
      v-else
      spellcheck="false"
      class="h-full overflow-y-auto whitespace-pre p-2 font-mono text-base shadow-inner shadow-gray-200"
      v-model="text"
    ></textarea>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue"
import { useConfig } from "../../composables/config"
const userConfig = useConfig()
import { File, Directory } from "./ranger"
import { ProjectState as State } from "./project-state"

import ProjectTextEditorToolbar from "./ProjectTextEditorToolbar.vue"

const props = defineProps({
  state: State,
  text: String,
  file: File,
  directory: Directory,
})

const text = ref(props.text)

watch(
  () => props.text,
  () => {
    text.value = props.text
  },
  {
    immediate: true,
  }
)
</script>
