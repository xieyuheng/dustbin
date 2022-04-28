<template>
  <div
    class="flex flex-col overflow-x-auto rounded-sm border border-gray-900 p-3"
  >
    <div v-if="state">
      <div class="flex w-full items-center justify-between">
        <div class="font-sans text-base text-gray-500">
          {{ translateRenderKind(state.kind, config) }}
        </div>
      </div>

      <MdDefaultSmallTitle :href="pathname" :attributes="state.attributes" />
      <MdDefaultAttributes class="text-base" :attributes="state.attributes" />
    </div>
    <div v-else>
      <Multilingual>
        <template #zh>
          <div class="font-sans text-base text-gray-500">加载中⋯⋯</div>
        </template>
        <template #default>
          <div class="font-sans text-base text-gray-500">Loading ...</div>
        </template>
      </Multilingual>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onServerPrefetch, onMounted } from "vue"
import { Link, LinkFactory } from "../../models/link"
import { MdPageState } from "../../components/md/md-page-state"
import { translateRenderKind } from "../../models/render-kind"
import { useConfig } from "../../composables/config"

import MdNode from "../../components/md/MdNode.vue"
import MdDefaultAttributes from "../../components/md/pages/default/MdDefaultAttributes.vue"
import MdDefaultSmallTitle from "../../components/md/pages/default/MdDefaultSmallTitle.vue"
import Multilingual from "../../components/atoms/Multilingual.vue"

const props = defineProps({ pageState: MdPageState, pathname: String })

const config = useConfig()
const state = ref(null)

const factory = new LinkFactory()

onServerPrefetch(async () => {
  state.value = await factory.createFromPathname(props.pathname)
})

onMounted(async () => {
  if (!state.value) {
    state.value = await factory.createFromPathname(props.pathname)
  }
})
</script>
