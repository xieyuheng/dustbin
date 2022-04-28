<template>
  <div class="w-full">
    <div class="flex w-full py-3">
      <span
        class="w-full overflow-x-auto whitespace-nowrap font-mono font-bold"
        >{{ link.path }}</span
      >

      <ListingPlaintextToolbox @copy="copyCode()" @download="downloadCode()" />
    </div>

    <div ref="editorElement" class="rounded-sm border border-gray-300"></div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { EditorView } from "@codemirror/view"
import { Link } from "../../../models/link"
import { downloadFile } from "../../../ut/download-file"
import { createEditorView } from "./create-plaintext-editor-view"
import { useConfig } from "../../../composables/config"
const config = useConfig()

import ListingPlaintextToolbox from "./ListingPlaintextToolbox.vue"

const props = defineProps({ link: Link, prefix: String, text: String })

const editorElement = ref(null)
const editorView = ref(null)

watch(
  editorElement,
  () => {
    if (editorElement.value) {
      editorView.value = createEditorView(props.text, editorElement.value)
    }
  },
  { immediate: true }
)

async function copyCode() {
  await navigator.clipboard.writeText(props.text)
}

function downloadCode() {
  downloadFile(props.link.path, props.text)
}
</script>
