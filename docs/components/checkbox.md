# Checkbox 复选框组件

复选框组件，支持双向数据绑定、半选状态、禁用状态等功能。

## 基本用法

### 基础复选框

```vue
<template>
  <WCheckbox v-model="checked">选项1</WCheckbox>
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
</script>
```

### 带标签值的复选框

```vue
<template>
  <WCheckbox v-model="value" label="选项A">选项A</WCheckbox>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(false)
</script>
```

### 禁用状态

```vue
<template>
  <WCheckbox v-model="checked" disabled>禁用复选框</WCheckbox>
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
</script>
```

### 半选状态

```vue
<template>
  <WCheckbox v-model="checked" :indeterminate="true">半选状态</WCheckbox>
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
</script>
```

## 组件属性 (Props)

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | `boolean \| string \| number` | `false` | 绑定值，支持双向数据绑定 |
| indeterminate | `boolean` | `false` | 是否显示半选状态 |
| disabled | `boolean` | `false` | 是否禁用复选框 |
| label | `string` | - | 复选框的标签值，当插槽内容为空时显示 |

## 组件事件 (Emits)

| 事件名 | 回调参数 | 说明 |
|--------|----------|------|
| update:modelValue | `(value: boolean \| string \| number)` | 当复选框值改变时触发，用于双向数据绑定 |
| change | `(value: boolean \| string \| number)` | 当复选框状态改变时触发 |

## 事件使用示例

### 监听change事件

```vue
<template>
  <WCheckbox v-model="checked" @change="handleChange">复选框</WCheckbox>
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)

const handleChange = (value) => {
  console.log('复选框状态改变:', value)
}
</script>
```

### 使用update:modelValue事件

```vue
<template>
  <WCheckbox 
    :modelValue="checked" 
    @update:modelValue="handleUpdate"
  >
    复选框
  </WCheckbox>
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)

const handleUpdate = (value) => {
  checked.value = value
  console.log('值更新为:', value)
}
</script>
```

## 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 复选框的标签内容，当提供此插槽时，会优先显示插槽内容 |

## 样式类名

组件使用BEM命名规范，主要样式类名如下：

- `w-checkbox` - 复选框根元素
- `w-checkbox__input` - 复选框输入区域
- `w-checkbox__label` - 复选框标签区域

## 注意事项

1. 组件支持 `v-model` 指令进行双向数据绑定
2. 当 `indeterminate` 为 `true` 时，复选框会显示半选状态，此时 `modelValue` 的值不影响显示状态
3. 禁用状态下，复选框无法被点击，且样式会变为禁用状态
4. 如果同时提供了插槽内容和 `label` 属性，插槽内容会优先显示
5. 组件内部使用了原生的 `checkbox` 输入框，因此支持所有原生复选框的特性

## 完整示例

```vue
<template>
  <div>
    <h3>基础用法</h3>
    <WCheckbox v-model="checked1">选项1</WCheckbox>
    <WCheckbox v-model="checked2" label="选项2">选项2</WCheckbox>
    
    <h3>禁用状态</h3>
    <WCheckbox v-model="checked3" disabled>禁用复选框</WCheckbox>
    
    <h3>半选状态</h3>
    <WCheckbox v-model="checked4" :indeterminate="true">半选状态</WCheckbox>
    
    <h3>事件监听</h3>
    <WCheckbox v-model="checked5" @change="handleChange">带事件监听</WCheckbox>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const checked1 = ref(false)
const checked2 = ref(true)
const checked3 = ref(false)
const checked4 = ref(false)
const checked5 = ref(false)

const handleChange = (value) => {
  console.log('复选框状态改变:', value)
}
</script>
```