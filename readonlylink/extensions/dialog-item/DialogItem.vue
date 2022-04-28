<template>
  <div class="py-2">
    <div class="divide-y divide-gray-900 border-y border-gray-900">
      <DialogFrame
        v-for="(frame, index) of dialog.frames"
        :key="index"
        :frame="frame"
        :pageState="pageState"
      />
    </div>
  </div>
</template>

<script setup>
import { Dialog } from "../../models/dialog"
import { MdPageState } from "../../components/md/md-page-state"

import DialogFrame from "./DialogFrame.vue"

defineProps({ pageState: MdPageState, dialog: Dialog })
</script>
