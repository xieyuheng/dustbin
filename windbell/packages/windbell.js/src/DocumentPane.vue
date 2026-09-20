<script setup lang="ts">
import MarkdownIt from "markdown-it"
import { computed, nextTick, ref } from "vue"
import type { ViewMode } from "./types"

const props = defineProps<{
  path: string
  modelValue: string
  mode: ViewMode
}>()

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void
  (event: "update:mode", value: ViewMode): void
}>()

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
})

const textarea = ref<HTMLTextAreaElement>()
const gutter = ref<HTMLDivElement>()

const lines = computed(() => props.modelValue.split("\n"))
const rendered = computed(() => markdown.render(props.modelValue))

const modes: Array<{ value: ViewMode; label: string }> = [
  { value: "edit", label: "写" },
  { value: "split", label: "双" },
  { value: "preview", label: "读" },
]

function updateValue(event: Event): void {
  const target = event.target as HTMLTextAreaElement
  emit("update:modelValue", target.value)
}

function syncScroll(): void {
  if (gutter.value && textarea.value) {
    gutter.value.scrollTop = textarea.value.scrollTop
  }
}

async function selectMode(mode: ViewMode): Promise<void> {
  emit("update:mode", mode)
  await nextTick()
  syncScroll()
}
</script>

<template>
  <section class="flex min-h-0 flex-1 flex-col bg-paper/40">
    <div class="flex h-11 items-center gap-3 border-b border-line/60 px-4">
      <div class="flex items-center gap-2">
        <span class="h-1.5 w-1.5 rounded-full bg-brass/80"></span>
        <span class="text-[13px] text-ink">{{ path }}</span>
        <span class="text-[11px] text-ink-muted">• 未保存</span>
      </div>

      <div class="ml-auto flex items-center rounded-full border border-line/70 p-0.5">
        <button
          v-for="item in modes"
          :key="item.value"
          type="button"
          class="rounded-full px-3 py-1 text-[11px] transition-colors"
          :class="
            mode === item.value
              ? 'bg-ink text-paper'
              : 'text-ink-muted hover:text-ink'
          "
          @click="selectMode(item.value)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>

    <div class="flex min-h-0 flex-1" :class="mode === 'split' ? 'flex-row' : ''">
      <div
        v-if="mode !== 'preview'"
        class="flex min-w-0 flex-1 flex-col overflow-hidden"
        :class="mode === 'split' ? 'border-r border-line/60' : ''"
      >
        <div class="flex min-h-0 flex-1">
          <div
            ref="gutter"
            class="scroll-thin w-12 shrink-0 overflow-hidden border-r border-line/40 bg-paper-deep/20 py-5 text-right font-mono text-[12px] leading-[1.95] text-ink-muted/60"
          >
            <div v-for="(_, index) in lines" :key="index" class="pr-3">
              {{ index + 1 }}
            </div>
          </div>
          <textarea
            ref="textarea"
            class="editor-textarea scroll-thin min-h-0 flex-1 px-5 py-5 font-mono text-[13.5px] leading-[1.95] text-ink-soft"
            spellcheck="false"
            :value="modelValue"
            @input="updateValue"
            @scroll="syncScroll"
          ></textarea>
        </div>
      </div>

      <div
        v-if="mode !== 'edit'"
        class="scroll-thin min-w-0 flex-1 overflow-y-auto px-8 py-7 lg:px-10"
      >
        <article class="markdown-body mx-auto max-w-[720px]" v-html="rendered"></article>
      </div>
    </div>
  </section>
</template>
