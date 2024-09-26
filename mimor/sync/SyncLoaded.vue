<script setup lang="ts">
import PageLayout from '../../layouts/page-layout/PageLayout.vue'
import { State } from './State'
import SyncActivities from './SyncActivities.vue'
import SyncDataFlow from './SyncDataFlow.vue'
import SyncFileList from './SyncFileList.vue'
import SyncHead from './SyncHead.vue'

defineProps<{ state: State }>()
</script>

<template>
  <PageLayout>
    <div class="flex h-full w-full flex-col items-center sm:pr-28">
      <div class="flex h-full w-full max-w-[47rem] flex-col py-3 sm:py-6">
        <SyncHead :state />

        <div v-if="state.connection" class="flex space-x-4">
          <div class="flex flex-col space-y-8">
            <SyncActivities :state :connection="state.connection" />
          </div>

          <div class="flex flex-col space-y-8">
            <SyncDataFlow :state :connection="state.connection" />
            <SyncFileList class="pb-3" :state :connection="state.connection" />
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>
