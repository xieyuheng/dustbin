<template>
  <div class="flex h-full flex-col overflow-y-auto">
    <ProjectPwd :state="state" />
    <ProjectRanger :state="state" />
  </div>
</template>

<script>
import PageLayout from "../../components/layouts/page-layout/PageLayout.vue"

export default {
  layout: (h, page) => h(PageLayout, { mode: "tiling" }, () => page),
}
</script>

<script setup>
import { ref } from "vue"
import { createProps } from "../../ut/create-props"
import { ProjectSchema } from "../../datatypes/project"
import { UserSchema } from "../../datatypes/user"
import { ProjectState as State } from "./project-state"

import ProjectPwd from "./ProjectPwd.vue"
import ProjectRanger from "./ProjectRanger.vue"

const props = defineProps(
  createProps({
    user: UserSchema,
    project: ProjectSchema,
  })
)

const state = ref(new State(props))
</script>
