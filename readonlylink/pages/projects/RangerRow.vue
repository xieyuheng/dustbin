<template>
  <div
    ref="rowElement"
    class="flex flex-wrap justify-between px-1 py-1 hover:text-white md:py-0"
    :class="[
      isFocused() && 'bg-gray-500 text-white',
      isMainColumn && clickCount > 0
        ? 'hover:bg-gray-900'
        : 'hover:bg-gray-700',
    ]"
    @mouseover="focus()"
    @click="handleClick()"
  >
    <div class="pr-1">{{ entry.directSubName(directory) }}</div>
    <div v-if="isMainColumn" :title="entry.info.title">
      {{ entry.info.content }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { Inertia } from "@inertiajs/inertia"
import { Directory } from "./ranger"
import { ProjectState as State } from "./project-state"

const props = defineProps({
  state: State,
  isMainColumn: Boolean,
  directory: Directory,
  entry: Object,
  cd: Function,
})

function isFocused() {
  return props.state.ranger.focusedEntry(props.directory)?.is(props.entry)
}

function focus() {
  props.state.ranger.focus(props.directory, props.entry)
}

const rowElement = ref(null)
const clickCount = ref(0)

watch(
  () => isFocused(),
  () => {
    clickCount.value = 0

    if (isFocused()) {
      rowElement.value?.scrollIntoView({
        block: "nearest",
        inline: "start",
      })
    }
  },
  {
    immediate: true,
  }
)

function handleClick() {
  if (props.isMainColumn) {
    // NOTE double click main column to `cd`
    if (clickCount.value > 0) {
      props.cd(props.entry)
      updateURL()
    } else {
      clickCount.value++
      updateURL({ replace: true })
    }
  } else {
    props.cd(props.entry)
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
</script>
