// 声明文件 申明vue的类型
declare module '*.vue' {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>
    export default component
}