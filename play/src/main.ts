import { createApp } from 'vue'
import App from './App.vue'
import Icon from '@wyj-ui/components/icon'
import '@wyj-ui/theme-chalk/src/index.scss'
const Plugins = [
    Icon
]
const app = createApp(App)
//注册为全局组件
Plugins.forEach(item =>app.use(item))
app.mount('#app')
