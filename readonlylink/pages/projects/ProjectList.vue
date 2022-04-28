<template>
  <PageLayout>
    <div class="flex flex-col">
      <Link
        :href="`/authors/${state.user.username}`"
        class="max-w-max overflow-x-auto overflow-y-hidden font-sans text-3xl font-bold"
      >
        {{ state.user.name }}
      </Link>

      <Link
        preserve-state
        class="max-w-max font-sans hover:underline"
        :href="`/projects/${state.user.username}`"
      >
        @{{ state.user.username }}
      </Link>

      <ProjectListToolbar :state="state" />
    </div>

    <div class="pb-6">
      <ProjectListEntry
        v-for="project in state.projects"
        :key="project.name"
        :state="state"
        :project="project"
      />
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, computed } from "vue"
import ty from "@xieyuheng/ty"
import { useConfig } from "../../composables/config"
const config = useConfig()
import { createProps } from "../../ut/create-props"
import { ProjectSchema } from "../../datatypes/project"
import { UserSchema } from "../../datatypes/user"
import { ProjectListState as State } from "./project-list-state"

import PageLayout from "../../components/layouts/page-layout/PageLayout.vue"
import IconTrash from "../../components/icons/IconTrash.vue"
import ProjectListEntry from "./ProjectListEntry.vue"
import ProjectListToolbar from "./ProjectListToolbar.vue"

const props = defineProps(
  createProps({
    user: UserSchema,
    projects: ty.array(ProjectSchema),
  })
)

const state = ref(new State(props))
</script>
