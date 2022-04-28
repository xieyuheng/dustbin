<template>
  <div class="flex justify-between font-sans text-lg text-gray-500">
    <div>
      <div v-if="state.project.configs.length > 0" class="flex items-center">
        <IconPlay class="mr-1 h-4 w-4" />
        <a
          v-for="(config, index) in state.project.configs"
          :key="index"
          target="_blank"
          :href="
            formatRenderPath(config.kind, {
              username: state.user.username,
              project: state.project.name,
            })
          "
          :title="config.file"
          class="flex items-baseline hover:text-gray-900"
        >
          <div>{{ translateRenderKind(config.kind, userConfig) }}</div>
        </a>
      </div>
    </div>

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
            :class="creatingFile && 'text-orange-400 hover:text-orange-500'"
            @click="createFile()"
          >
            <Multilingual>
              <template #zh> 新建文件 </template>
              <template #default> Create file </template>
            </Multilingual>
          </button>
          <button
            class="hover:text-gray-900"
            :class="
              creatingDirectory && 'text-orange-400 hover:text-orange-500'
            "
            @click="createDirectory()"
          >
            <Multilingual>
              <template #zh> 新建文件夹 </template>
              <template #default> Create directory </template>
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

        <ul
          class="flex min-w-max flex-col items-start rounded-sm border border-gray-300 bg-gray-50 p-2 shadow-lg"
        >
          <li>
            <button
              class="hover:text-gray-900"
              :class="deletingFile && 'text-orange-400 hover:text-orange-500'"
              @click="deleteFile()"
            >
              <Multilingual>
                <template #zh> 删除文件 </template>
                <template #default> Delete file </template>
              </Multilingual>
            </button>
          </li>
          <li>
            <button
              class="hover:text-gray-900"
              :class="
                deletingDirectory && 'text-orange-400 hover:text-orange-500'
              "
              @click="deleteDirectory()"
            >
              <Multilingual>
                <template #zh> 删除文件夹 </template>
                <template #default> Delete directory </template>
              </Multilingual>
            </button>
          </li>
        </ul>
      </Dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"
import { useConfig } from "../../composables/config"
import { translateRenderKind, formatRenderPath } from "../../models/render-kind"
import { ProjectState as State } from "./project-state"

import Multilingual from "../../components/atoms/Multilingual.vue"
import Dropdown from "../../components/atoms/Dropdown.vue"
import IconPlay from "../../components/icons/IconPlay.vue"
import IconPlusCircle from "../../components/icons/IconPlusCircle.vue"
import IconTrash from "../../components/icons/IconTrash.vue"

const userConfig = useConfig()

const props = defineProps({ state: State })

const creatingFile = ref(false)

async function createFile() {
  const cwd = props.state.ranger.currentDirectory.path

  const message = userConfig.langIs("zh")
    ? [`当前文件夹：/${cwd}`, "新文件："].join("\n")
    : [`Current directory: /${cwd}`, "New file:"].join("\n")

  const file = window.prompt(message)

  if (!file) {
    return
  }

  if (file.includes("/")) {
    window.alert("File name should not includes '/'.")
    return
  }

  const path = cwd ? cwd + "/" + file : file

  await props.state.ranger.createFile(path, {
    onStart: () => (creatingFile.value = true),
    onFinish: () => (creatingFile.value = false),
    onError: (error) => {
      window.alert(
        [`${error.name} (during creating file):`, error.message].join("\n")
      )
    },
  })
}

const creatingDirectory = ref(false)

async function createDirectory() {
  const cwd = props.state.ranger.currentDirectory.path

  const message = userConfig.langIs("zh")
    ? [`当前文件夹：/${cwd}`, "新文件夹："].join("\n")
    : [`Current directory: /${cwd}`, "New directory:"].join("\n")

  const directory = window.prompt(message)

  if (!directory) {
    return
  }

  const path = cwd ? cwd + "/" + directory : directory

  await props.state.ranger.createDirectory(path, {
    onStart: () => (creatingDirectory.value = true),
    onFinish: () => (creatingDirectory.value = false),
    onError: (error) => {
      window.alert(
        [`${error.name} (during creating directory):`, error.message].join("\n")
      )
    },
  })
}

const deletingFile = ref(false)

async function deleteFile() {
  const cwd = props.state.ranger.currentDirectory.path

  const message = userConfig.langIs("zh")
    ? [`当前文件夹：/${cwd}`, "删除文件："].join("\n")
    : [`Current directory: /${cwd}`, "Delete file:"].join("\n")

  const file = window.prompt(message)

  if (!file) {
    return
  }

  if (file.includes("/")) {
    window.alert("File name should not includes '/'.")
    return
  }

  const path = cwd ? cwd + "/" + file : file

  await props.state.ranger.deleteFile(path, {
    onStart: () => (deletingFile.value = true),
    onFinish: () => (deletingFile.value = false),
    onError: (error) => {
      window.alert(
        [`${error.name} (during deleting file):`, error.message].join("\n")
      )
    },
  })
}

const deletingDirectory = ref(false)

async function deleteDirectory() {
  const cwd = props.state.ranger.currentDirectory.path

  const message = userConfig.langIs("zh")
    ? [`当前文件夹：/${cwd}`, "删除文件夹："].join("\n")
    : [`Current directory: /${cwd}`, "Delete directory:"].join("\n")

  const directory = window.prompt(message)

  if (!directory) {
    return
  }

  const path = cwd ? cwd + "/" + directory : directory

  await props.state.ranger.deleteDirectory(path, {
    onStart: () => (deletingDirectory.value = true),
    onFinish: () => (deletingDirectory.value = false),
    onError: (error) => {
      window.alert(
        [`${error.name} (during deleting directory):`, error.message].join("\n")
      )
    },
  })
}
</script>
