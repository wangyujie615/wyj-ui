import DefaultTheme from 'vitepress/theme'
import { AntDesignContainer, ElementPlusContainer, NaiveUIContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
// 全局注册组件

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('demo-preview', AntDesignContainer)
  }
}