//整合组件 最后实现导出组件
import _Icon from './src/icon.vue'
//每个组件都需要暴露一个install方法
import { withInstall } from '@wyj-ui/utils/with-install'
const Icon = withInstall(_Icon)
export default Icon
export * from './src/icon'

//这里添加的类型可以在模板被解析
declare module 'vue'{
    export interface GlobalComponents{
        //让我们的接口可以自动合并
        WIcon: typeof Icon
    }
}
