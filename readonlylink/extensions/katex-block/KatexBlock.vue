<template>
  <div class="relative text-center text-2xl" v-html="safeHtml(output)"></div>
</template>

<script setup>
import { computed } from "vue"
import katex from "katex"
// NOTE There is a `absolute` in "katex/dist/katex.css",
//   so we need to use the above `relative` to catch it.
import "katex/contrib/mhchem"
import { safeHtml } from "../../ut/safe-html"

const props = defineProps({ text: String })

const output = computed(() => {
  return katex.renderToString(props.text, {
    throwOnError: false,
  })
})
</script>
