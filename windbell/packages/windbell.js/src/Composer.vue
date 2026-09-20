<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  isThinking: boolean
}>()

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void
  (event: "send"): void
  (event: "suggestion", value: string): void
}>()

const suggestions = ["解释选区", "写得更文学", "补一个代码例子"]

function updateValue(event: Event): void {
  emit("update:modelValue", (event.target as HTMLTextAreaElement).value)
}

function send(): void {
  if (props.isThinking || props.modelValue.trim() === "") return
  emit("send")
}
</script>

<template>
  <div class="border-t border-line/60 bg-paper/80 px-4 py-3 backdrop-blur-xl">
    <div class="mb-2 flex flex-wrap gap-1.5">
      <button
        v-for="suggestion in suggestions"
        :key="suggestion"
        type="button"
        class="rounded-full border border-line/70 px-2.5 py-1 text-[10.5px] text-ink-muted transition-colors hover:border-celadon/70 hover:text-ink"
        @click="emit('suggestion', suggestion)"
      >
        {{ suggestion }}
      </button>
    </div>

    <div class="flex items-end gap-2 rounded-2xl border border-line/80 bg-paper px-3 py-2">
      <textarea
        class="scroll-thin max-h-28 min-h-[38px] flex-1 resize-none bg-transparent py-1 text-[13px] leading-relaxed text-ink outline-none placeholder:text-ink-muted/60"
        rows="1"
        placeholder="向风铃提问，或在文档中选中一段文字…"
        :value="modelValue"
        @input="updateValue"
        @keydown.enter.exact.prevent="send"
      ></textarea>
      <button
        type="button"
        class="mb-0.5 rounded-full px-3.5 py-2 text-[11px] transition-colors"
        :class="
          isThinking || modelValue.trim() === ''
            ? 'cursor-not-allowed bg-ink/10 text-ink-muted'
            : 'bg-ink text-paper hover:opacity-80'
        "
        :disabled="isThinking || modelValue.trim() === ''"
        @click="send"
      >
        {{ isThinking ? "…" : "送去" }}
      </button>
    </div>

    <div class="mt-2 flex items-center justify-between text-[10px] text-ink-muted/70">
      <span>Enter 发送 · Shift + Enter 换行</span>
      <span>本地 · 私密</span>
    </div>
  </div>
</template>
