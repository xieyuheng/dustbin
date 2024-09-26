<script setup lang="ts">
import Lang from '../../components/lang/Lang.vue'
import { Connection } from './Connection'
import { State } from './State'
import SyncDataFlowAutoUpload from './SyncDataFlowAutoUpload.vue'
import SyncDataFlowDisconnect from './SyncDataFlowDisconnect.vue'
import SyncDataFlowDownload from './SyncDataFlowDownload.vue'
import SyncDataFlowRefresh from './SyncDataFlowRefresh.vue'
import SyncDataFlowSave from './SyncDataFlowSave.vue'
import SyncDataFlowUpload from './SyncDataFlowUpload.vue'

defineProps<{
  state: State
  connection: Connection
}>()
</script>

<template>
  <div class="flex flex-col space-y-2">
    <Lang class="text-xl font-bold">
      <template #zh> 数据流示意图 </template>
      <template #en> Data Flow illustration </template>
    </Lang>

    <Lang class="px-5">
      <template #zh>
        <pre>
         云端
        /   ↖
<SyncDataFlowRefresh :state :connection />     <SyncDataFlowSave :state :connection />
        ↘   /
         App
        /   ↖          <SyncDataFlowDisconnect :state :connection />
<SyncDataFlowDownload :state :connection />     <SyncDataFlowUpload :state :connection />
        ↘   /          <SyncDataFlowAutoUpload :state :connection />
       本地文件夹
</pre>
      </template>
      <template #en>
        <pre>
            Cloud
            /   ↖
 <SyncDataFlowRefresh :state :connection />     <SyncDataFlowSave :state :connection />
            ↘   /
             App
            /   ↖           <SyncDataFlowDisconnect :state :connection />
<SyncDataFlowDownload :state :connection />     <SyncDataFlowUpload :state :connection />
            ↘   /           <SyncDataFlowAutoUpload :state :connection />
          Directory
</pre>
      </template>
    </Lang>
  </div>
</template>
