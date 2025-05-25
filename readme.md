# 开发
## 环境搭建
采用monorepo项目结构
```
- docs # 存储文档
- packages
    - components # 组件的逻辑
    - theme-chalk
    - utils # 相关工具方法
- play
- types
- pnpm-workspace.yaml # 工作空间文件
- tsconfig.json # ts配置文件
```
### monorepo环境搭建步骤
1. 安装pnpm并保持项目初始化 
```
npm install pnpm -g
pnpm init
```
2. 设置pnpm-workspace.yaml设置工作区文件
```
packages:
  - play #存放组件测试时候的代码
  - "packages/**" # 
  - docs # 存放组件文档
```
3. 创建packages下文件，并在全局进行安装使用

## 创建BEM规范
BEM规范(block-element-modifier-state):用于统一规范组件变量规范
在uitls工具文件夹中创建BEM规范

## 组件的编写
位置：packages/components文件下编写主要的逻辑及代码
注意：每个组件都是一个单独的文件夹
比如icon组件的的结构是：
```
- icon 
    - src
        - icon.ts # 准备组件的相关属性,TS的类型
        - icon.vue # 具体的组件逻辑
    - index.ts # 出口文件：整合组件 最后实现导出组件
```

### 如何实现组件的能够全局注册
插件：插件 (Plugins) 是一种能为 Vue 添加全局功能的工具代码。一个插件可以是一个拥有install()方法的对象，也可以直接是一个安装函数本身。
步骤：
1. 实现组件的安装和全局注册，插件可以是一个拥有install()方法的对象
2. 返回安装和注册的组件

- app.use(plugin) # 用于注册、安装插件
- app.component(name,component) # 用于全局注册组件

### 追加类型解析和接口合并
为 Vue 的全局组件类型补充声明，使得在模板中使用 <WIcon /> 时能获得类型提示和语法检查支持。
```
declare module 'vue'{ // declare module 'vue' 是对 Vue 类型模块的扩展声明。
    export interface GlobalComponents{
        // GlobalComponents 是 Vue 提供的接口，用于描述全局可用的组件（也就是通过app.component(...) 注册的组件）。
        //让我们的接口可以自动合并 WIcon: typeof Icon 的作用是让 <WIcon /> 在 .vue 文件模板中有类型提示。
        WIcon: typeof Icon
    }
}

```
