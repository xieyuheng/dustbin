<template>
  <LinkEntry>
    <template #metadata>
      <div class="w-22 flex flex-col items-end font-sans md:w-28">
        <Link
          class="w-full overflow-x-auto whitespace-pre font-bold"
          :href="`/authors/${activity.username}`"
        >
          <div class="text-right">{{ activity.name }}</div>
        </Link>
        <Link class="hover:underline" :href="`/projects/${activity.username}`">
          @{{ activity.username }}
        </Link>
        <div :title="formatDate(activity.created_at)">
          {{ formatAgo(activity.created_at, { lang: config.lang }) }}
        </div>
      </div>
    </template>

    <template #default>
      <MdPage
        class="my-8"
        :document="document()"
        :customComponents="extensions.components"
      />
    </template>
  </LinkEntry>
</template>

<script setup>
import { computed } from "vue"
import ty from "@xieyuheng/ty"
import { useConfig } from "../../composables/config"
import { createProps } from "../../ut/create-props"
import { formatDate, formatAgo } from "../../ut/format-date"
import { ActivitySchema } from "../../datatypes/activity"
import { useExtensionStore } from "../../composables/extension-store"

import MdPage from "../../components/md/MdPage.vue"
import Multilingual from "../../components/atoms/Multilingual.vue"
import IconExternalLink from "../../components/icons/IconExternalLink.vue"
import ActivityEntry from "./ActivityEntry.vue"
import LinkEntry from "../../components/molecules/link-entry/LinkEntry.vue"

const props = defineProps(
  createProps({
    activity: ActivitySchema,
  })
)

const config = useConfig()
const extensions = useExtensionStore()

function document() {
  return useExtensionStore().parser.parseDocument(props.activity.content)
}
</script>
