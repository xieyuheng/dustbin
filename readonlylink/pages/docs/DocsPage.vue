<template>
  <Head>
    <title v-if="config.langIs('zh')">文档 | 只读</title>
    <title v-else>Docs | Readonly</title>
  </Head>

  <DocsSlogan class="my-4" />

  <div class="flex items-baseline space-x-4">
    <Multilingual class="font-logo text-2xl font-semibold text-gray-800">
      <template #zh> 文档 </template>
      <template #default> Documents </template>
    </Multilingual>
  </div>

  <div class="flex flex-col space-y-3 py-4">
    <a
      href="https://readonly.link/manuals/readonlylink/readonlylink-manual"
      target="_blank"
    >
      <Multilingual class="font-sans font-bold underline">
        <template #zh>
          只读链接手册 <IconExternalLink class="inline w-4" />
        </template>
        <template #default>
          Readonly.Link Manual <IconExternalLink class="inline w-4" />
        </template>
      </Multilingual>
    </a>

    <Multilingual class="font-sans text-xl font-bold">
      <template #zh> 只读链接规则 </template>
      <template #default> Readonly.Link Rules </template>
    </Multilingual>

    <Multilingual>
      <template #zh>
        <b>规则一：</b>当成功渲染您的内容时，我们将不会显示任何额外内容。
        包括任何形式的广告，以及我们的标识。
      </template>
      <template #default>
        <b>Rule 1:</b> When your contents are rendered successfully, we will not
        display any extra contents. Including any form of advertisement, and our
        logo.
      </template>
    </Multilingual>

    <Multilingual>
      <template #zh>
        <b>规则二：</b
        >您拥有您的内容与数据，但是我们将删除违反法律的内容，或者我们认为不合适的内容。
      </template>
      <template #default>
        <b>Rule 2:</b> You own your contents and data, but we will delete
        anything that breaks the laws or considered inappropriate by us.
      </template>
    </Multilingual>
  </div>
</template>

<script>
import PageLayout from "../../components/layouts/page-layout/PageLayout.vue"

export default {
  layout: PageLayout,
}
</script>

<script setup>
import { useConfig } from "../../composables/config"

import IconExternalLink from "../../components/icons/IconExternalLink.vue"
import DocsSlogan from "./DocsSlogan.vue"
import Multilingual from "../../components/atoms/Multilingual.vue"

const config = useConfig()
</script>
