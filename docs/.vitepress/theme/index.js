import DefaultTheme from 'vitepress/theme'
import { AntDesignContainer, ElementPlusContainer, NaiveUIContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
// 全局注册组件
import WButton from '@wyj-ui/components/button'
import WTree from '@wyj-ui/components/tree'
import WCheckbox from '@wyj-ui/components/checkbox'
import '@wyj-ui/theme-chalk/src/index.scss'
const components = [WButton,WTree,WCheckbox]

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('demo-preview', AntDesignContainer)
    components.forEach((component) => {
      app.use(component)
    })
  }
}