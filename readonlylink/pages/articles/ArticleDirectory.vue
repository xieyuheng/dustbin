<template>
  <div class="px-6 py-4 font-sans">
    <div class="py-4">
      <div class="flex items-baseline text-4xl font-bold">
        <span>{{ state.link.name }}</span>
      </div>

      <div class="flex items-baseline text-xl">
        @<span>{{ state.link.host }}</span>
      </div>
    </div>

    <div class="flex items-baseline py-4 text-3xl font-bold text-gray-500">
      /<span>{{ state.link.path }}</span>
    </div>

    <div
      v-if="state.link.path"
      title="Goto parent directory"
      class="py-1 text-2xl font-bold"
    >
      <Link
        preserve-state
        :href="`/articles/${resolveFormat('..')}`"
        class="hover:text-gray-500"
      >
        ..
      </Link>
    </div>

    <div
      v-for="(path, index) in state.paths"
      :key="index"
      class="py-1 text-2xl"
    >
      <Link
        preserve-state
        :href="`/articles/${resolveFormat(path)}`"
        class="hover:text-gray-500"
      >
        {{ path }}
      </Link>
    </div>
  </div>
</template>

<script setup>
import { watch } from "vue"
import { DirectoryState as State } from "./directory-state"

import IconFolder from "../../components/icons/IconFolder.vue"

const props = defineProps({ state: State })

function resolveFormat(path) {
  const base = props.state.link.path

  const link = props.state.link.root().resolve(base + "/" + path)

  if (link.path) {
    return link.format()
  } else {
    // NOTE In `ArticleRoot`, we are using request url ending with '/'
    //   to determine 'Directory' or not.
    // Thus, if the `path` is empty, we add a '/'
    //   because we are at the top level directory.
    return link.format() + "/"
  }
}

watch(
  () => props.state.link.path,
  () => {
    window.scrollTo(0, 0)
  }
)
</script>
