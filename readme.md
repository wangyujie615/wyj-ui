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

# 组件编写技巧原则

组件的编写技巧:

1. 数据类：组件的数据可分为几类，一类是数据可用于操作视图的，二类是渲染更新不变的缓存数据
   - 用于操作视图的数据：响应式数据，数据变化视图变化，视图变化数据变化；比如用于控制、用于切换显示的数据都可以是响应式的数据
     - Vue:ref,reactive;React:useState
   - 缓存数据，这部分数据往往不受操作的影响,或者只受个别元素影响, 视图刷新数据不会发生变化
     - Vue:computed();React:useMemo,useRef,useCallback
2. 生命周期方法：生命周期方法决定了组件加载时，何时执行相关操作，比如加载数据、读取配置等等
   - Vue:onMounted();React:useEffect(()=>{},[]) //每次加载都执行一次
3. 异步监听方法：组件内部设计异步监听方法,用于监听组件内的相关异步操作
   - Vue:watch();React:useEffevt(()=>{},[data]) //监听相关数据依赖
4. 组件缓存优化：组件可以根据 Props 的更改选择是否重新渲染
   - Vue:keepalive;React:React.memo()
5. Props 传递数据尽量保证可读原则, 同时尽量保证单向数据流原则
   - React: 传递父组件的回调进行父组件的状态修改,子调用父
   - Vue: 通过子组件的状态,修改父组件状态,父监听子,emit
6. 数据存储优化：以减少服务端交互，单次渲染少量数据为原则，优化组件的性能
   - 全局属性长期存储,不随页面渲染重复查询, 一般存储于状态管理器
   - 多次查询相同数据缓存服务器状态管理
   - 单组件数据：交互修改的数据：单组件显示；缓存数据：尽量缓存。
7. Hooks 原则：组件的相关通用代码、与外部交互代码, 进行抽离形成 Hooks, 保证整个组件尽量和自身的数据相关
8. 原生元素操纵：组件内部支持原生组件操纵

# 组件

- [ ] icon
- [ ] tree
- [ ] virtual-list(定长)
- [ ] checkbox

## Icon 组件

功能点：根据字体大小和颜色进行显示

## Tree 组件

1. 明确组件需要输入的数据
2. 数据格式化为组件形式的数据(有的数据需要转换,需要保存原始数据)
3. 定义组件的 Props,理论上是只读的
4. 定义组件向外部暴露的具体事件

功能：
步骤：props->格式化节点数据->将组件根据传入字段的含义实现具体功能
Tree 组件->TreeNode 组件(渲染树的节点)->TreeContent 组件(渲染插槽内容)

1. 实现树形结构
2. 树形节点实现默认展开、折叠; 点击展开、折叠; 展开时，树节点要进行拍平处理
3. 树形节点实现默认选中高亮, 点击选中; 并支持多级选中
4. 树形节点实现异步加载功能
   - 组件内记录异步加载的节点，保证已加载过的不用重新加载
   - 异步加载节点的异步函数由外部控制，外部传入一个 Promise 函数，控制节点的数据
5. 实现禁用节点
6. 树自定义节点: (利用 provide inject slot tsx 实现)
7. 树组件可选中
8. 数组组件级联选择

## 虚拟列表(定长)

与分页查询的区别适用场景，需要滚动交互时，需要实现一个虚拟列表, 比如聊天框对话。
性能的解决问题的思路不一样，虚拟列表是通过减少前端数据的渲染解决渲染性能。实际上前端已经拿到大部分数据了，而分页则是在后端处理大部分数据。实际场景下可以将两种方案结合使用。
思路：

1. 明确列表定长的长度，确定列表要显示的数据个数
2. 定义一个变量记录滚动的长度
3. 定义头尾缓冲区
4. 计算可视区域缓冲数据

## Checkbox 组件
如何利用计算属性实现双向绑定(关键)
