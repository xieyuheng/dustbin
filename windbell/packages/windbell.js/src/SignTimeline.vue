<script setup lang="ts">
import { nextTick, ref, watch } from "vue"
import type { Sign } from "./types"

const props = defineProps<{
  signs: Array<Sign>
  isThinking: boolean
}>()

const emit = defineEmits<{
  (event: "approve", sign: Sign): void
  (event: "reject", sign: Sign): void
}>()

const expanded = ref<Record<string, boolean>>({})
const scroller = ref<HTMLDivElement>()

watch(
  () => props.signs.length,
  async () => {
    await nextTick()
    if (scroller.value) {
      scroller.value.scrollTop = scroller.value.scrollHeight
    }
  },
)

function toggle(sign: Sign): void {
  expanded.value[sign.id] = !expanded.value[sign.id]
}

function isOpen(sign: Sign): boolean {
  return expanded.value[sign.id] ?? sign.kind === "assistant"
}

function nodeClass(kind: Sign["kind"]): string {
  switch (kind) {
    case "user":
      return "border-ink bg-ink"
    case "assistant":
      return "border-celadon bg-celadon"
    case "tool":
      return "border-brass bg-brass"
    case "file":
      return "border-celadon bg-glass"
    case "approval":
      return "border-brass bg-paper"
  }
}

function labelClass(kind: Sign["kind"]): string {
  switch (kind) {
    case "user":
      return "text-ink"
    case "assistant":
      return "text-celadon"
    case "tool":
      return "text-brass"
    case "file":
      return "text-celadon"
    case "approval":
      return "text-brass"
  }
}
</script>

<template>
  <div class="flex min-h-0 flex-1 flex-col">
    <div class="flex h-11 items-center justify-between border-b border-line/50 px-4">
      <div class="flex items-center gap-2">
        <span class="h-1 w-1 rounded-full bg-celadon"></span>
        <span class="text-[10px] uppercase tracking-[0.24em] text-ink-muted">Semiosis</span>
      </div>
      <span class="text-[10px] tracking-[0.16em] text-ink-muted">解释之链</span>
    </div>

    <div ref="scroller" class="scroll-thin relative flex-1 overflow-y-auto px-5 py-5">
      <div
        class="absolute bottom-6 left-[26px] top-7 w-px bg-gradient-to-b from-transparent via-line to-transparent"
      ></div>

      <TransitionGroup name="sign" tag="div" class="relative flex flex-col gap-5">
        <article v-for="sign in signs" :key="sign.id" class="relative flex gap-3">
          <div class="relative z-10 mt-1 flex w-4 shrink-0 justify-center">
            <span
              class="h-2.5 w-2.5 rounded-full border transition-transform duration-300"
              :class="[nodeClass(sign.kind), sign.kind === 'approval' && sign.state === 'pending' ? 'thinking-dot' : '']"
            ></span>
          </div>

          <div class="min-w-0 flex-1">
            <button
              type="button"
              class="flex w-full items-baseline gap-2 text-left"
              @click="toggle(sign)"
            >
              <span class="text-[11px] font-medium tracking-[0.08em]" :class="labelClass(sign.kind)">
                {{ sign.title }}
              </span>
              <span v-if="sign.tool" class="font-mono text-[10px] text-ink-muted">
                {{ sign.tool }}
              </span>
              <span class="ml-auto text-[10px] text-ink-muted/70">{{ sign.time }}</span>
            </button>

            <div
              v-if="sign.body && isOpen(sign)"
              class="mt-1.5 whitespace-pre-wrap text-[13px] leading-[1.85] text-ink-soft"
            >
              {{ sign.body }}
            </div>

            <div
              v-if="sign.diff && isOpen(sign)"
              class="mt-2 overflow-hidden rounded-md border border-line/70 bg-paper-deep/40"
            >
              <div class="border-b border-line/50 px-3 py-1.5 font-mono text-[10px] text-ink-muted">
                suggested diff
              </div>
              <pre class="overflow-x-auto px-3 py-2 font-mono text-[11.5px] leading-relaxed text-celadon">{{ sign.diff }}</pre>
            </div>

            <div
              v-if="sign.kind === 'approval' && sign.state === 'pending'"
              class="mt-2.5 flex items-center gap-2"
            >
              <button
                type="button"
                class="rounded-full bg-ink px-3.5 py-1.5 text-[11px] text-paper transition-opacity hover:opacity-80"
                @click.stop="emit('approve', sign)"
              >
                批准
              </button>
              <button
                type="button"
                class="rounded-full border border-line px-3.5 py-1.5 text-[11px] text-ink-soft transition-colors hover:border-ink/30"
                @click.stop="emit('reject', sign)"
              >
                拒绝
              </button>
            </div>

            <div
              v-if="sign.kind === 'approval' && sign.state !== 'pending'"
              class="mt-2 text-[11px] text-ink-muted"
            >
              {{ sign.state === "approved" ? "已批准" : "已拒绝" }}
            </div>
          </div>
        </article>
      </TransitionGroup>

      <div v-if="isThinking" class="relative mt-6 flex items-center gap-3 pl-7 text-[12px] text-ink-muted">
        <span class="thinking-dot h-1.5 w-1.5 rounded-full bg-celadon"></span>
        <span>风正在穿过风铃…</span>
      </div>
    </div>
  </div>
</template>
