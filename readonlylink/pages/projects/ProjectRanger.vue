<template>
  <div class="relative flex h-full w-full flex-col overflow-y-auto font-sans">
    <ProjectToolbar :state="state" />

    <ProjectTextEditor
      v-if="state.ranger.editing && state.ranger.currentEntry.isFile()"
      class="absolute z-30 h-full"
      :state="state"
      :text="state.ranger.currentText"
      :file="state.ranger.currentEntry"
      :directory="state.ranger.currentDirectory"
      @exit="exitEditor()"
    />

    <div class="flex h-full w-full overflow-y-auto font-sans">
      <RangerColumn
        class="w-1/12 md:mr-2 md:w-2/12"
        :state="state"
        :directory="state.ranger.parentDirectory"
        :directories="state.ranger.previousDirectories"
        :files="state.ranger.previousFiles"
        :cd="(entry) => state.ranger.cd(state.ranger.parentDirectoryOf(entry))"
      />

      <RangerColumn
        class="w-5/12 shadow-lg shadow-stone-400 md:mr-2 md:w-4/12 md:shadow-none"
        :isMainColumn="true"
        :state="state"
        :directory="state.ranger.currentDirectory"
        :directories="state.ranger.currentDirectories"
        :files="state.ranger.currentFiles"
        :cd="
          (entry) => {
            if (entry.isDirectory()) {
              state.ranger.editing = false
              state.ranger.cd(entry)
            }
            if (entry.isFile()) {
              state.ranger.editing = true
            }
          }
        "
      />

      <div
        v-if="state.ranger.currentEntry === undefined"
        class="w-6/12 overflow-x-auto overflow-y-auto pl-1 font-mono text-sm md:w-6/12"
      >
        <div class="text-gray-400">Nothing to preview.</div>
      </div>
      <RangerColumn
        v-else-if="state.ranger.currentEntry.isDirectory()"
        class="w-6/12 md:w-6/12"
        :state="state"
        :directory="state.ranger.currentEntry"
        :directories="
          state.ranger.directSubDirectories(state.ranger.currentEntry)
        "
        :files="state.ranger.directSubFiles(state.ranger.currentEntry)"
        :cd="(entry) => state.ranger.cd(state.ranger.parentDirectoryOf(entry))"
      />
      <div
        v-else
        class="w-6/12 overflow-x-auto overflow-y-auto pl-1 font-mono text-sm md:w-6/12"
      >
        <div v-if="state.ranger.currentText !== undefined">
          <div v-if="isBlankFile" class="text-gray-400">Blank file.</div>
          <pre v-else class="md:pl-0">{{ state.ranger.currentText }}</pre>
        </div>
        <div v-else>
          <div class="text-gray-400">Loading...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue"
import { ProjectState as State } from "./project-state"
import debounce from "lodash/debounce"
import { Inertia } from "@inertiajs/inertia"

import ProjectToolbar from "./ProjectToolbar.vue"
import ProjectTextEditor from "./ProjectTextEditor.vue"
import RangerColumn from "./RangerColumn.vue"

const props = defineProps({ state: State })

const isBlankFile = computed(() => {
  return props.state.ranger.currentText?.trim() === ""
})

onMounted(() => {
  const url = new URL(window.location.href)
  props.state.ranger.updateByURLSearchParams(url.searchParams)
})

function handlePopState(event) {
  if (event.state.url) {
    const url = new URL(window.location.origin + event.state.url)
    props.state.ranger.updateByURLSearchParams(url.searchParams)
  }
}

onMounted(() => {
  window.document.addEventListener("popstate", handlePopState, {
    capture: true,
  })
})

onBeforeUnmount(() => {
  window.document.removeEventListener("popstate", handlePopState, {
    capture: true,
  })
})

watch(
  () => props.state.ranger.currentEntry?.path,
  debounce(async () => {
    if (props.state.ranger.currentEntry?.isFile()) {
      await props.state.ranger.fetchFileIfNeeded(
        props.state.ranger.currentEntry.path
      )
    }
  }, 150),
  {
    immediate: true,
  }
)

function exitEditor() {
  props.state.ranger.editing = false
  updateURL()
}

function handleKeyboard(event) {
  if (event.altKey || event.ctrlKey || event.shiftKey || event.metaKey) {
    return
  }

  if (props.state.ranger.editing) {
    if (event.key === "Escape") {
      exitEditor()
    }

    // NOTE Disable keyboard navigation when editing file.
    return
  }

  if (event.key === "ArrowDown") {
    props.state.ranger.down()
    updateURL({ replace: true })
  }

  if (event.key === "ArrowUp") {
    props.state.ranger.up()
    updateURL({ replace: true })
  }

  if (event.key === "ArrowLeft") {
    props.state.ranger.left()
    updateURL()
  }

  if (event.key === "ArrowRight" || event.key === "Enter") {
    if (props.state.ranger.currentEntry?.isFile()) {
      props.state.ranger.editing = true
    } else {
      props.state.ranger.editing = false
    }

    props.state.ranger.right()
    updateURL()
  }
}

function updateURL(opts) {
  const replace = opts?.replace

  const url = new URL(window.location.origin + Inertia.page.url)

  props.state.ranger.updateURL(url)

  // NOTE https://github.com/inertiajs/inertia/issues/870
  Inertia.page.url = url.href.slice(url.origin.length)
  Inertia.setPage(Inertia.page, {
    replace,
    preserveScroll: true,
    preserveState: true,
  })
}

onMounted(() => {
  window.document.addEventListener("keydown", handleKeyboard, {
    capture: true,
  })
})

onBeforeUnmount(() => {
  window.document.removeEventListener("keydown", handleKeyboard, {
    capture: true,
  })
})
</script>
