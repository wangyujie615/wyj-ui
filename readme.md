# 开发

## 环境搭建

采用 monorepo 项目结构

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

### monorepo 环境搭建步骤

1. 安装 pnpm 并保持项目初始化

```
npm install pnpm -g
pnpm init
```

2. 设置 pnpm-workspace.yaml 设置工作区文件

```
packages:
  - play #存放组件测试时候的代码
  - "packages/**" #
  - docs # 存放组件文档
```

3. 创建 packages 下文件，并在全局进行安装使用

## 创建 BEM 规范

BEM 规范(block-element-modifier-state):用于统一规范组件变量规范
在 uitls 工具文件夹中创建 BEM 规范

## 组件的编写

位置：packages/components 文件下编写主要的逻辑及代码
注意：每个组件都是一个单独的文件夹
比如 icon 组件的的结构是：

```
- icon
    - src
        - icon.ts # 准备组件的相关属性,TS的类型
        - icon.vue # 具体的组件逻辑
    - index.ts # 出口文件：整合组件 最后实现导出组件
```

### 如何实现组件的能够全局注册

插件：插件 (Plugins) 是一种能为 Vue 添加全局功能的工具代码。一个插件可以是一个拥有 install()方法的对象，也可以直接是一个安装函数本身。
步骤：

1. 实现组件的安装和全局注册，插件可以是一个拥有 install()方法的对象
2. 返回安装和注册的组件

- app.use(plugin) # 用于注册、安装插件
- app.component(name,component) # 用于全局注册组件

```typescript
import { Plugin } from 'vue'
// 给组件添加install方法，使得组件可以同.use方法进行全局注册
// Plugin自带有install方法
export type SFCWithInstall<T> = T & Plugin
export function withInstall<T>(component: T) {
  // 1.进行安装
  ;(component as SFCWithInstall<T>).install = function (app) {
    const { name } = component as unknown as { name: string }
    //组件注册为全局组件
    app.component(name, component)
  }
  // 2.返回安装成功的组件
  return component as SFCWithInstall<T>
}
```

### 追加类型解析和接口合并

为 Vue 的全局组件类型补充声明，使得在模板中使用 <WIcon /> 时能获得类型提示和语法检查支持。

```typescript
declare module 'vue' {
  // declare module 'vue' 是对 Vue 类型模块的扩展声明。
  export interface GlobalComponents {
    // GlobalComponents 是 Vue 提供的接口，用于描述全局可用的组件（也就是通过app.component(...) 注册的组件）。
    //让我们的接口可以自动合并 WIcon: typeof Icon 的作用是让 <WIcon /> 在 .vue 文件模板中有类型提示。
    WIcon: typeof Icon
  }
}
```

## 组件样式增加

1. 推荐 xicons 作为图标库：https://www.xicons.org/#/
2. scss 编写

- 结构目录

```
theme-chalk
    - src
        - mixins
            - config.scss
            - mixin.scss
        - index.scss
```

- 编写公共配置

```config.scss
$namespace: 'w';
$element-separator: '__';
$modifier-separator: '--';
$state-prefix: 'is-';
```

- 编写 scss 的 bem 规范，与之前的组件 bem 规范对应

```mixin.scss
@use 'config' as *; //引用config.scss
@forward 'config';

//bem-规范
//.z-button
@mixin b($block) {
    $B: $namespace+'-' +$block;

    .#{$B} {
        @content;
    }
}

// .z-button.is-xxx
@mixin when($state) {
    @at-root {
        &.#{$state-prefix+$state} {
            @content;
        }
    }
}

// .z-butoon--primary
@mixin m($modifier) {
    @at-root {
        #{&+$modifier-separator+$modifier} {
            @content;
        }
    }
}

// z-button__header
@mixin e($element) {
    @at-root {
        #{&+$element-separator+$element} {
            @content;
        }
    }
}
```

## 配置代码校验

配置 eslint,校验代码是否符合规范

```
npx eslint --init
pnpm i eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint@latest -D -w
```

配置 Preitter 进行代码格式化

```.prettierrc.js
module.exports = {
    singleQuote: true,//使用单引号
    semi: false,//使用分号
    trailingComa: "none",//末尾逗号
    arrowParens: "avoid",//箭头函数括号
    endOfLine: "auto"//结尾自动换行
}
```

编辑器配置
安装 EditorConfig 插件,创建.editorcinfig 配置文件

## 组件库文档搭建

选择 vitepress 进行组件库文档搭建,可以快速的将 markdown 转化为 html
在 docs 目录下进行安装

```
pnpm install vitepress -D
```

vitepress 的相关使用参考：https://vitepress.dev/zh/

# 组件

- [ ] icon
- [ ] tree
- [ ]

## Tree 组件

功能：
步骤：props->格式化节点数据->将树形结构拍平数据结构

1. 实现树形结构
2. 树形节点实现默认展开、折叠; 点击展开、折叠
3. 树形节点实现默认选中高亮, 点击选中; 并支持多级选中
4. 树形节点实现异步加载功能
5. 实现禁用节点
