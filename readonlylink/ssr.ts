import { createSSRApp, h } from "vue"
import { renderToString } from "vue/server-renderer"
import { createInertiaApp, Link, Head } from "@inertiajs/inertia-vue3"
import createServer from "@inertiajs/server"

createServer((page) =>
  createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => require(`./pages/${name}`),
    setup({ app: App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) })
        .use(plugin)
        .component("Link", Link)
        .component("Head", Head)
    },
  })
)
