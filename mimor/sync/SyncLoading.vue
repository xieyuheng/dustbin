<script setup lang="ts">
import Lang from '../../components/lang/Lang.vue'
import PageLayout from '../../layouts/page-layout/PageLayout.vue'
</script>

<template>
  <PageLayout>
    <div class="p-3 text-xl text-stone-500 dark:text-stone-300 sm:p-6">
      <Lang>
        <template #zh>
          <div>作者加载中⋯⋯</div>
          <div>第一次加载速度较慢，</div>
          <div>下次加载会快很多。</div>
        </template>
        <template #en>
          <div>Loading author ...</div>
          <div>The first time loading is relatively slow.</div>
          <div>The next loading will be much faster.</div>
        </template>
      </Lang>
    </div>
  </PageLayout>
</template>
