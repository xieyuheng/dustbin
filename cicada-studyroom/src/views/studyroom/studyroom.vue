<template>
  <div class="md:px-6 md:py-4 flex flex-col items-start p-2">
    <page-header />

    <div class="flex flex-wrap items-baseline py-3">
      <h2 class="text-xl font-bold">//// 学习 / Study</h2>
      <h1 v-if="state" class="pt-1 pl-3 text-lg font-bold text-gray-500">
        {{ state.library.config.name }}
      </h1>
    </div>

    <div v-if="state" class="md:flex-row flex flex-col w-full max-h-full">
      <studyroom-file-list :state="state" />
      <studyroom-editor :state="state" />
      <studyroom-reporter :state="state" />
    </div>
    <div class="p-3 border border-gray-400 rounded-md" v-else>
      加载中 / Loading ...
    </div>

    <page-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import { StudyroomState as State } from "./studyroom-state"

@Component({
  name: "studyroom",
  components: {
    "page-header": () => import("@/components/page-header"),
    "page-footer": () => import("@/components/page-footer"),
    "studyroom-file-list": () => import("./studyroom-file-list.vue"),
    "studyroom-editor": () => import("./studyroom-editor.vue"),
    "studyroom-reporter": () => import("./studyroom-reporter.vue"),
  },
})
export default class extends Vue {
  @Prop() servant!: "gitlab" | "github"
  @Prop() library_id!: string

  state: State | null = null

  async mounted(): Promise<void> {
    this.state = await State.build({
      library_id: this.library_id,
      servant: this.servant,
    })
  }
}
</script>
