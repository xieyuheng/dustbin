<template>
  <Head>
    <title v-if="config.langIs('zh')">关于 | 只读</title>
    <title v-else>About | Readonly</title>
  </Head>

  <AboutSlogan class="my-4" />

  <div class="flex items-baseline space-x-4">
    <div class="font-logo text-2xl font-semibold text-gray-800">
      <Multilingual>
        <template #zh> 关于 </template>
        <template #default> About </template>
      </Multilingual>
    </div>
  </div>

  <main class="space-y-3 py-4">
    <Multilingual>
      <template #zh>
        <div class="inline-flex flex-wrap items-baseline text-gray-900">
          <div class="pr-1 font-logo font-semibold text-gray-900">只读链接</div>
          <div>是一个文档渲染工具，</div>
          <div>文字创作者的社区。</div>
        </div>
      </template>
      <template #default>
        <div class="inline-flex flex-wrap items-baseline text-gray-900">
          <div class="pr-1 font-logo font-semibold text-gray-900">
            Readonly.Link
          </div>
          <div class="pr-1">is a document rendering tool,</div>
          <div>and a community for authors.</div>
        </div>
      </template>
    </Multilingual>

    <Multilingual>
      <template #zh>
        项目在 2021 年末由
        <a
          href="https://xieyuheng.com"
          class="inline-flex items-center underline"
          target="_blank"
        >
          谢宇恒 <IconExternalLink class="w-4 shrink-0 text-gray-500" />
        </a>
        发起。
      </template>
      <template #default>
        The project was founded by
        <a
          href="https://xieyuheng.com"
          class="inline-flex items-center underline"
          target="_blank"
        >
          Xie Yuheng <IconExternalLink class="w-4 shrink-0 text-gray-500" />
        </a>
        at the end of 2021.
      </template>
    </Multilingual>

    <Multilingual>
      <template #zh>
        有时候，我只想把我写的文章分享给朋友，不想有任何纷扰。
      </template>
      <template #default>
        Sometimes, I just want to share my articles to my friends, without any
        distractions.
      </template>
    </Multilingual>

    <Multilingual>
      <template #zh> 另外，我还想天马行空地扩展 Markdown。 </template>
      <template #default>
        I also want to extend Markdown in interesting ways.
      </template>
    </Multilingual>

    <Multilingual>
      <template #zh>
        在设计一个解决方案为自己所用的同时，我也有能力把它作成一个网络服务，让大家都有机会用上。
      </template>
      <template #default>
        When designing a solution for myself, I can also build it as a web
        service to reuse with others.
      </template>
    </Multilingual>

    <Multilingual>
      <template #zh> 何乐而不为呢？ </template>
      <template #default> I am glad to just do that! </template>
    </Multilingual>

    <Multilingual>
      <template #zh>
        <h2 class="py-1 font-sans text-2xl font-bold">反馈</h2>
      </template>
      <template #default>
        <h2 class="py-1 font-sans text-2xl font-bold">Feedback</h2>
      </template>
    </Multilingual>

    <Multilingual>
      <template #zh>
        我们用 GitHub 的
        <a
          href="https://github.com/readonlylink/feedback/issues"
          class="inline-flex items-center underline"
          target="_blank"
        >
          Issues <IconExternalLink class="w-4 shrink-0 text-gray-500" />
        </a>
        来响应大家发现的问题，用
        <a
          href="https://github.com/readonlylink/feedback/discussions"
          class="inline-flex items-center underline"
          target="_blank"
        >
          讨论区 <IconExternalLink class="w-4 shrink-0 text-gray-500" />
        </a>
        来倾听反馈。
      </template>
      <template #default>
        We use GitHub
        <a
          href="https://github.com/readonlylink/feedback/issues"
          class="inline-flex items-center underline"
          target="_blank"
        >
          Issues <IconExternalLink class="w-4 shrink-0 text-gray-500" />
        </a>
        to respond to bug reports, and
        <a
          href="https://github.com/readonlylink/feedback/discussions"
          class="inline-flex items-center underline"
          target="_blank"
        >
          Discussions <IconExternalLink class="w-4 shrink-0 text-gray-500" />
        </a>
        to listen to general feedback.
      </template>
    </Multilingual>

    <Multilingual>
      <template #zh>
        <h2 class="py-1 font-sans text-2xl font-bold">技术</h2>
      </template>
      <template #default>
        <h2 class="py-1 font-sans text-2xl font-bold">Powered by</h2>
      </template>
    </Multilingual>

    <Multilingual>
      <template #zh>
        只读链接使用
        <a
          href="https://github.com/xieyuheng/postmark"
          class="inline-flex items-center underline"
          target="_blank"
        >
          Postmark <IconExternalLink class="w-4 shrink-0 text-gray-500" />
        </a>
        来定制 Markdown 解析器。
      </template>
      <template #default>
        Readonly.Link uses
        <a
          href="https://github.com/xieyuheng/postmark"
          class="inline-flex items-center underline"
          target="_blank"
        >
          Postmark <IconExternalLink class="w-4 shrink-0 text-gray-500" />
        </a>
        to customize Markdown parser.
      </template>
    </Multilingual>
  </main>
</template>

<script>
import PageLayout from "../../components/layouts/page-layout/PageLayout.vue"

export default {
  layout: PageLayout,
}
</script>

<script setup>
import { useConfig } from "../../composables/config"
const config = useConfig()

import Multilingual from "../../components/atoms/Multilingual.vue"
import IconExternalLink from "../../components/icons/IconExternalLink.vue"
import AboutSlogan from "./AboutSlogan.vue"
</script>
