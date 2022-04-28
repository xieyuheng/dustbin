<template>
  <div ref="frameElement" :id="frameId" class="flex flex-col md:flex-row">
    <div class="relative p-2 md:w-1/2 md:p-4">
      <DialogUtterance :pageState="pageState" :utterance="frame.left" />
      <a
        :href="'#' + frameId"
        class="absolute top-2 right-0 text-xs"
        @click.prevent="jumpToFrame()"
        >{{ frame.index }}</a
      >
    </div>

    <hr class="border-b-1 mx-2 border-dashed border-gray-500 md:hidden" />

    <div class="p-2 md:w-1/2 md:p-4">
      <DialogUtterance :pageState="pageState" :utterance="frame.right" />
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref, nextTick } from "vue"
import { Inertia } from "@inertiajs/inertia"
import { MdPageState } from "../../components/md/md-page-state"
import * as ut from "../../ut"

import MdNode from "../../components/md/MdNode.vue"
import DialogUtterance from "./DialogUtterance.vue"

const props = defineProps({ pageState: MdPageState, frame: Object })

const frameElement = ref(null)

const frameId = computed(() => `dialog-frame-${props.frame.index}`)

function jumpToFrame() {
  location.hash = "#" + frameId.value
}

watch(
  () => location.hash,
  () => scrollForHash(location.hash),
  { immediate: true }
)

async function scrollForHash(hash) {
  await nextTick()
  await nextTick()
  await nextTick()

  const id = hash.slice(1)
  if (id === frameId.value) {
    scrollIntoView()
  }
}

function scrollIntoView() {
  if (frameElement.value) {
    frameElement.value.scrollIntoView({
      behavior: "smooth",
    })
  }
}
</script>
