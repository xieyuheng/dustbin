<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGlobalAuth } from '../../models/auth'
import { State } from './State'
import SyncLoaded from './SyncLoaded.vue'
import SyncLoading from './SyncLoading.vue'
import { stateLoadReactive } from './stateLoadReactive'

const state = ref<State | undefined>(undefined)

const auth = useGlobalAuth()

onMounted(async () => {
  if (auth.username === undefined) return

  state.value = await stateLoadReactive({
    username: auth.username,
  })
})
</script>

<template>
  <SyncLoaded v-if="state" :state :key="state.username" />
  <SyncLoading v-else />
</template>
