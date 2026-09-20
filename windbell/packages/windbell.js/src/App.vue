<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from "vue"
import Composer from "./Composer.vue"
import DocumentPane from "./DocumentPane.vue"
import FileTree from "./FileTree.vue"
import SignTimeline from "./SignTimeline.vue"
import TopBar from "./TopBar.vue"
import { fileEntries, initialSigns, mockDocuments } from "./mock"
import type { Sign, ViewMode } from "./types"

const contents = reactive<Record<string, string>>({ ...mockDocuments })
const activePath = ref("semiosis.md")
const mode = ref<ViewMode>("split")
const prompt = ref("")
const isThinking = ref(false)
const isDark = ref(false)
const signs = ref<Array<Sign>>([...initialSigns])

const content = computed({
  get: () => contents[activePath.value] ?? "",
  set: (value: string) => {
    contents[activePath.value] = value
  },
})

watch(
  isDark,
  (value) => {
    document.documentElement.classList.toggle("dark", value)
  },
  { immediate: true },
)

function id(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function pushSign(sign: Sign): void {
  signs.value.push(sign)
}

function selectFile(path: string): void {
  if (path in contents) {
    activePath.value = path
  }
}

async function sendPrompt(): Promise<void> {
  const text = prompt.value.trim()
  if (text === "" || isThinking.value) return

  pushSign({
    id: id("user"),
    kind: "user",
    title: "你",
    body: text,
    time: "刚刚",
  })

  prompt.value = ""
  isThinking.value = true
  await nextTick()

  window.setTimeout(() => {
    pushSign({
      id: id("assistant"),
      kind: "assistant",
      title: "风铃的回答",
      body: "我先把它当作一个符号来读。\n\n风铃并不复制风，它把风转译成声音；同样，这段文字也不是在描述一个对象，而是在生成下一个可解释的符号。",
      time: "刚刚",
    })
    isThinking.value = false
  }, 900)
}

function handleSuggestion(value: string): void {
  prompt.value = value
  void nextTick(() => {
    void sendPrompt()
  })
}

function approveSign(sign: Sign): void {
  sign.state = "approved"
  pushSign({
    id: id("assistant"),
    kind: "assistant",
    title: "已写入",
    body: "我把这个例子补在“文学式编程”一节后面。文件变更已经出现在书稿上。",
    time: "刚刚",
  })
  pushSign({
    id: id("file"),
    kind: "file",
    title: "semiosis.md",
    body: "文件已更新。",
    diff: "+ 代码块是人的思想的另一种风铃。",
    time: "刚刚",
  })
}

function rejectSign(sign: Sign): void {
  sign.state = "rejected"
  pushSign({
    id: id("assistant"),
    kind: "assistant",
    title: "已保持原样",
    body: "好的，不改动文档。需要时再叫我。",
    time: "刚刚",
  })
}
</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden bg-paper text-ink">
    <TopBar
      :active-path="activePath"
      :is-dark="isDark"
      :is-thinking="isThinking"
      @toggle-theme="isDark = !isDark"
    />

    <div class="flex min-h-0 flex-1">
      <FileTree :entries="fileEntries" :active-path="activePath" @select="selectFile" />

      <main class="flex min-w-0 flex-1 flex-col">
        <DocumentPane
          v-model="content"
          v-model:mode="mode"
          :path="activePath"
        />
      </main>

      <aside
        class="hidden w-[370px] shrink-0 flex-col border-l border-line/60 bg-paper/70 backdrop-blur-xl xl:flex"
      >
        <SignTimeline
          :signs="signs"
          :is-thinking="isThinking"
          @approve="approveSign"
          @reject="rejectSign"
        />
        <Composer
          v-model="prompt"
          :is-thinking="isThinking"
          @send="sendPrompt"
          @suggestion="handleSuggestion"
        />
      </aside>
    </div>
  </div>
</template>
