import { createSSRApp, h } from "vue"
import { createInertiaApp, Link, Head } from "@inertiajs/inertia-vue3"
import { InertiaProgress } from "@inertiajs/progress"

createInertiaApp({
  resolve: (name) => require(`./pages/${name}`),
  setup({ el, app: App, props, plugin }) {
    createSSRApp({ render: () => h(App, props) })
      .use(plugin)
      .component("Link", Link)
      .component("Head", Head)
      .mount(el)
  },
})

InertiaProgress.init({
  // NOTE Use stone gray
  // - https://tailwindcss.com/docs/customizing-colors
  color: "#a8a29e",
})
