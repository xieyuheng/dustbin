<template>
  <LinkEntry>
    <template #metadata>
      <ProjectListEntryStatistic class="w-24 py-6" :project="project" />
    </template>

    <template #default>
      <div class="py-6">
        <div class="py-0.5">
          <Link
            class="max-w-max overflow-x-auto font-sans font-bold text-gray-700 hover:underline"
            :href="`/projects/${state.user.username}/${project.name}`"
          >
            {{ project.name }}
          </Link>
        </div>

        <ConfigInfo
          class="rounded-sm border border-gray-900 p-3"
          v-for="({ kind, file, config }, index) in project.configs"
          :key="index"
          :kind="kind"
          :file="file"
          :config="config"
          :user="state.user"
          :project="project"
        />
      </div>
    </template>
  </LinkEntry>
</template>

<script setup>
import { ProjectListState as State } from "./project-list-state"

import LinkEntry from "../../components/molecules/link-entry/LinkEntry.vue"
import ConfigInfo from "../../components/molecules/config-info/ConfigInfo.vue"
import ProjectListEntryStatistic from "./ProjectListEntryStatistic.vue"

defineProps({ state: State, project: Object })
</script>
