import { Plugin } from 'vue'
// 给组件添加install方法，使得组件可以通过.use方法进行全局注册 
// Plugin自带有install方法
export type SFCWithInstall<T> = T & Plugin
export function withInstall<T>(component: T) {
    // 1.进行安装
    (component as SFCWithInstall<T>).install = function(app){
        const { name } = component as unknown as { name: string }
         //组件注册为全局组件
        app.component(name, component)
    }
    // 2.返回安装成功的组件
    return component as SFCWithInstall<T>
}