<template>
  <div class="flex justify-between font-sans text-lg text-gray-500">
    <div>&nbsp;</div>

    <div class="flex space-x-2">
      <Dropdown
        v-if="$page.props.auth.user?.username === state.user.username"
        align="right"
      >
        <template #trigger>
          <button class="flex items-center hover:text-gray-900">
            <IconPlusCircle class="mr-1 h-4 w-4" />
            <Multilingual>
              <template #zh> 新建 </template>
              <template #default> CREATE </template>
            </Multilingual>
          </button>
        </template>

        <div
          class="flex min-w-max flex-col items-start rounded-sm border border-gray-300 bg-gray-50 p-2 shadow-lg"
        >
          <button
            class="hover:text-gray-900"
            :class="creatingProject && 'text-orange-400 hover:text-orange-500'"
            @click="createProject()"
          >
            <Multilingual>
              <template #zh> 新建项目 </template>
              <template #default> Create project </template>
            </Multilingual>
          </button>

          <button
            class="hover:text-gray-900"
            :class="
              creatingBookProject && 'text-orange-400 hover:text-orange-500'
            "
            @click="createBookProject()"
          >
            <Multilingual>
              <template #zh> 新建书籍项目 </template>
              <template #default> Create book project </template>
            </Multilingual>
          </button>

          <button
            class="hover:text-gray-900"
            :class="
              creatingManualProject && 'text-orange-400 hover:text-orange-500'
            "
            @click="createManualProject()"
          >
            <Multilingual>
              <template #zh> 新建手册项目 </template>
              <template #default> Create manual project </template>
            </Multilingual>
          </button>
        </div>
      </Dropdown>

      <Dropdown
        v-if="$page.props.auth.user?.username === state.user.username"
        align="right"
      >
        <template #trigger>
          <button class="flex items-center hover:text-gray-900">
            <IconTrash class="mr-1 h-4 w-4" />
            <Multilingual>
              <template #zh> 删除 </template>
              <template #default> DELETE </template>
            </Multilingual>
          </button>
        </template>

        <div
          class="flex min-w-max flex-col items-start rounded-sm border border-gray-300 bg-gray-50 p-2 shadow-lg"
        >
          <button
            class="hover:text-gray-900"
            :class="deletingProject && 'text-orange-400 hover:text-orange-500'"
            @click="deleteProject()"
          >
            <Multilingual>
              <template #zh> 删除项目 </template>
              <template #default> Delete project </template>
            </Multilingual>
          </button>
        </div>
      </Dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import ty from "@xieyuheng/ty"
import { useConfig } from "../../composables/config"
import { ProjectListState as State } from "./project-list-state"

import IconPlusCircle from "../../components/icons/IconPlusCircle.vue"
import IconTrash from "../../components/icons/IconTrash.vue"
import Dropdown from "../../components/atoms/Dropdown.vue"
import Multilingual from "../../components/atoms/Multilingual.vue"

const userConfig = useConfig()

const props = defineProps({ state: State })

const creatingProject = ref(false)

async function createProject() {
  const message = userConfig.langIs("zh") ? "新建项目：" : "Create project:"
  const name = window.prompt(message)
  if (!name) return

  await props.state.createProject(name, {
    onStart: () => (creatingProject.value = true),
    onFinish: () => (creatingProject.value = false),
    onError: (error) => {
      window.alert(
        [`${error.name} (during creating project):`, error.message].join("\n")
      )
    },
  })
}

const creatingBookProject = ref(false)

async function createBookProject() {
  const message = userConfig.langIs("zh")
    ? "新建书籍项目："
    : "Create book project:"
  const name = window.prompt(message)
  if (!name) return

  await props.state.createProject(name, {
    template: "book",
    onStart: () => (creatingBookProject.value = true),
    onFinish: () => (creatingBookProject.value = false),
    onError: (error) => {
      window.alert(
        [`${error.name} (during creating book project):`, error.message].join(
          "\n"
        )
      )
    },
  })
}

const creatingManualProject = ref(false)

async function createManualProject() {
  const message = userConfig.langIs("zh")
    ? "新建手册项目："
    : "Create manual project:"
  const name = window.prompt(message)
  if (!name) return

  await props.state.createProject(name, {
    template: "manual",
    onStart: () => (creatingManualProject.value = true),
    onFinish: () => (creatingManualProject.value = false),
    onError: (error) => {
      window.alert(
        [`${error.name} (during creating manual project):`, error.message].join(
          "\n"
        )
      )
    },
  })
}

const deletingProject = ref(false)

async function deleteProject() {
  const message = userConfig.langIs("zh") ? "删除项目：" : "Delete project:"
  const name = window.prompt(message)
  if (!name) return

  await props.state.deleteProject(name, {
    onStart: () => (deletingProject.value = true),
    onFinish: () => (deletingProject.value = false),
    onError: (error) => {
      window.alert(
        [`${error.name} (during deleting project):`, error.message].join("\n")
      )
    },
  })
}
</script>
