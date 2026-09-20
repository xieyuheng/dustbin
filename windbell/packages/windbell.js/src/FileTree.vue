<script setup lang="ts">
import type { FileEntry } from "./types"

defineProps<{
  entries: Array<FileEntry>
  activePath: string
}>()

defineEmits<{
  (event: "select", path: string): void
}>()
</script>

<template>
  <aside class="hidden w-60 shrink-0 flex-col border-r border-line/60 bg-paper-deep/30 md:flex">
    <div class="flex h-11 items-center justify-between border-b border-line/50 px-4">
      <span class="text-[10px] uppercase tracking-[0.24em] text-ink-muted">书稿</span>
      <span class="text-[10px] text-ink-muted">⌘K</span>
    </div>

    <div class="scroll-thin flex-1 overflow-y-auto px-3 py-3">
      <button
        v-for="entry in entries"
        :key="entry.path"
        type="button"
        class="group flex w-full items-center gap-2 rounded-md py-1.5 pr-2 text-left text-[13px] transition-colors"
        :class="
          entry.type === 'file' && entry.path === activePath
            ? 'bg-glass/70 text-ink'
            : 'text-ink-soft hover:bg-ink/5'
        "
        :style="{ paddingLeft: `${entry.depth * 14 + 8}px` }"
        @click="entry.type === 'file' && $emit('select', entry.path)"
      >
        <span v-if="entry.type === 'directory'" class="text-[11px] text-ink-muted">▾</span>
        <span v-else class="inline-block h-1 w-1 rounded-full bg-ink-muted/50"></span>
        <span class="truncate">{{ entry.name }}</span>
      </button>
    </div>

    <div class="border-t border-line/50 px-4 py-3">
      <p class="font-serif text-[12px] leading-relaxed text-ink-muted">
        风过铃响，<br />
        符号开始解释自身。
      </p>
    </div>
  </aside>
</template>
