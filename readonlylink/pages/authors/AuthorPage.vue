<template>
  <AuthorLayout :state="state">
    <MdPage
      class="pb-6"
      :document="state.document"
      :customComponents="extensions.components"
    />
  </AuthorLayout>
</template>

<script setup>
import { ref } from "vue"
import ty from "@xieyuheng/ty"
import { useConfig } from "../../composables/config"
import { createProps } from "../../ut/create-props"
import { UserSchema } from "../../datatypes/user"
import { ProjectSchema } from "../../datatypes/project"
import { AuthorState as State } from "./author-state"
import { useExtensionStore } from "../../composables/extension-store"

import MdPage from "../../components/md/MdPage.vue"
import AuthorLayout from "./AuthorLayout.vue"

const props = defineProps(
  createProps({
    user: UserSchema,
    project: ProjectSchema,
    tabName: ty.maybe(ty.string()),
    indexFile: ty.string(),
    tabFiles: ty.dict(ty.string()),
  })
)

const config = useConfig()
const extensions = useExtensionStore()

const state = ref(
  new State(
    props.user,
    props.project,
    props.tabName,
    props.indexFile,
    props.tabFiles
  )
)
</script>
