# Button 按钮组件

按钮组件用于触发操作或导航，支持多种类型、尺寸和状态。

:::demo
WButton/index
:::

## 基本用法

```vue
<template>
  <w-button>默认按钮</w-button>
  <w-button type="primary">主要按钮</w-button>
  <w-button type="success">成功按钮</w-button>
</template>
```

## 按钮类型

支持多种按钮类型，通过 `type` 属性设置：

```vue
<template>
  <w-button type="default">默认</w-button>
  <w-button type="primary">主要</w-button>
  <w-button type="success">成功</w-button>
  <w-button type="warning">警告</w-button>
  <w-button type="danger">危险</w-button>
  <w-button type="info">信息</w-button>
  <w-button type="link">链接</w-button>
  <w-button type="text">文字</w-button>
</template>
```

## 按钮尺寸

支持三种尺寸，通过 `size` 属性设置：

```vue
<template>
  <w-button size="large">大号</w-button>
  <w-button size="medium">中号</w-button>
  <w-button size="small">小号</w-button>
</template>
```

## 禁用状态

通过 `disabled` 属性设置禁用状态：

```vue
<template>
  <w-button disabled>禁用按钮</w-button>
  <w-button type="primary" disabled>禁用主要按钮</w-button>
</template>
```

## 加载状态

通过 `loading` 属性设置加载状态：

```vue
<template>
  <w-button loading>加载中</w-button>
  <w-button type="primary" loading>加载中</w-button>
</template>
```

## 圆角按钮

通过 `round` 属性设置圆角样式：

```vue
<template>
  <w-button round>圆角按钮</w-button>
  <w-button type="primary" round>圆角主要按钮</w-button>
</template>
```

## 链接按钮

当 `type="link"` 时，可以设置链接相关属性：

```vue
<template>
  <w-button type="link" href="https://example.com">内部链接</w-button>
  <w-button type="link" href="https://example.com" target="_blank"
    >新窗口打开</w-button
  >
</template>
```

## Props 属性

| 属性名        | 类型          | 默认值    | 说明                                                                                           |
| ------------- | ------------- | --------- | ---------------------------------------------------------------------------------------------- |
| type          | ButtonType    | 'default' | 按钮类型，可选值：'default', 'primary', 'success', 'warning', 'danger', 'info', 'link', 'text' |
| size          | ButtonSize    | 'medium'  | 按钮尺寸，可选值：'large', 'medium', 'small'                                                   |
| round         | boolean       | false     | 是否圆角按钮                                                                                   |
| disabled      | boolean       | false     | 是否禁用                                                                                       |
| loading       | boolean       | false     | 是否加载中                                                                                     |
| nativeType    | NativeType    | 'button'  | 原生按钮类型，可选值：'button', 'submit', 'reset'                                              |
| iconPlacement | IconPlacement | 'left'    | 图标位置，可选值：'left', 'right'                                                              |
| href          | string        | ''        | 链接地址，仅当 type='link' 时有效                                                              |
| target        | LinkTarget    | '\_self'  | 链接打开方式，可选值：'\_blank', '\_self', '\_parent', '\_top'，仅当 type='link' 时有效        |

## Emits 事件

| 事件名    | 回调参数            | 说明               |
| --------- | ------------------- | ------------------ |
| click     | (event: MouseEvent) | 点击按钮时触发     |
| mousedown | (event: MouseEvent) | 鼠标按下按钮时触发 |

## 事件用法示例

```vue
<template>
  <w-button @click="handleClick" @mousedown="handleMouseDown">
    点击我
  </w-button>
</template>

<script setup>
const handleClick = event => {
  console.log('按钮被点击', event)
}

const handleMouseDown = event => {
  console.log('鼠标按下', event)
}
</script>
```

## 样式类名

组件遵循 BEM 命名规范，生成的类名结构如下：

- 基础类：`w-button`
- 类型类：`w-button--${type}`
- 尺寸类：`w-button--${size}`
- 状态类：`w-button.is-disabled`、`w-button.is-round`、`w-button.is-loading`

## 注意事项

1. 当按钮处于 `disabled` 或 `loading` 状态时，点击事件不会触发
2. 链接按钮（type='link'）会渲染为 `<a>` 标签，其他类型渲染为 `<button>`
3. 所有按钮都支持点击和鼠标按下事件，除非被禁用
4. 按钮具有默认的过渡动画效果，包括点击时的缩放动画
