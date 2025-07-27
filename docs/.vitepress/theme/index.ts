import DefaultTheme from 'vitepress/theme'
import type { App } from "vue"
import WyjUI from "@wyj-ui/app/index.ts"
import "highlight.js/lib/common" // 修正模块名
import hljsVuePlugin from "@highlightjs/vue-plugin"
import "@wyj-ui/theme-chalk/src/index.scss"
import diractive from './diractive'
import Layout from './components/layout.vue'
import DocsCodeDemo from './components/docs-code-demo.vue' assert { type: 'module' }
export default {
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }: { app: App }) {
    app.use(WyjUI)
    app.use(hljsVuePlugin)
    app.component("DocsCodeDemo", DocsCodeDemo)
    diractive(app)
  }
}