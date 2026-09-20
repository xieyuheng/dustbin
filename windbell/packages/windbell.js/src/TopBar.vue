<script setup lang="ts">
defineProps<{
  activePath: string
  isDark: boolean
  isThinking: boolean
}>()

defineEmits<{
  (event: "toggle-theme"): void
}>()
</script>

<template>
  <header
    class="relative z-20 flex h-14 items-center gap-4 border-b border-line/70 bg-paper/80 px-5 backdrop-blur-xl"
  >
    <div class="flex items-center gap-3">
      <span class="relative flex h-5 w-5 items-center justify-center">
        <span class="absolute h-4 w-px bg-ink/70"></span>
        <span class="absolute h-2 w-2 rounded-full border border-brass/80 bg-brass/20"></span>
      </span>
      <h1 class="font-serif text-[17px] tracking-[0.18em] text-ink">风铃</h1>
      <span class="hidden text-[10px] uppercase tracking-[0.24em] text-ink-muted sm:inline">
        Windbell
      </span>
    </div>

    <div class="ml-3 flex min-w-0 items-center gap-2 text-xs text-ink-muted">
      <span class="hidden md:inline">书稿</span>
      <span class="hidden md:inline">/</span>
      <span class="truncate text-ink-soft">{{ activePath }}</span>
    </div>

    <div class="ml-auto flex items-center gap-3">
      <div class="hidden items-center gap-2 text-xs text-ink-muted sm:flex">
        <span
          class="h-1.5 w-1.5 rounded-full"
          :class="isThinking ? 'animate-pulse bg-celadon' : 'bg-ink-muted/50'"
        ></span>
        <span>{{ isThinking ? "正在解释" : "风静" }}</span>
      </div>

      <button
        type="button"
        class="rounded-full border border-line/80 px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-brass/60 hover:text-ink"
        @click="$emit('toggle-theme')"
      >
        {{ isDark ? "日" : "夜" }}
      </button>
    </div>
  </header>
</template>
