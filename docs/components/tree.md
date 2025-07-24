# Tree 树形组件

树形组件用于展示层级结构数据，支持展开/折叠、选择、勾选、异步加载等功能。

## 基本用法

```vue
<template>
  <w-tree :data="treeData" />
</template>

<script setup>
const treeData = [
  {
    label: '一级 1',
    key: '1',
    children: [
      {
        label: '二级 1-1',
        key: '1-1',
        children: [
          { label: '三级 1-1-1', key: '1-1-1' }
        ]
      }
    ]
  },
  {
    label: '一级 2',
    key: '2',
    children: [
      { label: '二级 2-1', key: '2-1' },
      { label: '二级 2-2', key: '2-2' }
    ]
  }
]
</script>
```

## 可选择节点

设置 `selectable` 属性启用节点选择功能：

```vue
<template>
  <w-tree :data="treeData" :selectable="true" v-model:selectKeys="selectedKeys" />
</template>

<script setup>
import { ref } from 'vue'
const selectedKeys = ref(['1-1-1'])
</script>
```

## 多选节点

设置 `multiple` 和 `selectable` 属性启用多选功能：

```vue
<template>
  <w-tree :data="treeData" :selectable="true" :multiple="true" v-model:selectKeys="selectedKeys" />
</template>

<script setup>
import { ref } from 'vue'
const selectedKeys = ref(['1', '2-1'])
</script>
```

## 勾选框

设置 `show-checkbox` 属性启用勾选功能：

```vue
<template>
  <w-tree :data="treeData" show-checkbox v-model:checkedKeys="checkedKeys" />
</template>

<script setup>
import { ref } from 'vue'
const checkedKeys = ref(['1-1', '2-1'])
</script>
```

## 默认展开节点

通过 `default-expanded-keys` 设置默认展开的节点：

```vue
<template>
  <w-tree :data="treeData" :default-expanded-keys="['1', '1-1']" />
</template>
```

## 异步加载节点

通过 `on-load` 属性实现异步加载子节点：

```vue
<template>
  <w-tree :data="treeData" :on-load="loadNode" />
</template>

<script setup>
const loadNode = async (node) => {
  // 模拟异步加载
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    { label: '动态加载节点 1', key: `${node.key}-1` },
    { label: '动态加载节点 2', key: `${node.key}-2` }
  ]
}
</script>
```

## 自定义字段名

通过 `key-field`、`label-field`、`children-field` 自定义数据字段：

```vue
<template>
  <w-tree 
    :data="customData" 
    key-field="id"
    label-field="name"
    children-field="subs"
  />
</template>

<script setup>
const customData = [
  {
    name: '自定义名称',
    id: 'custom-1',
    subs: [
      { name: '子节点', id: 'custom-1-1' }
    ]
  }
]
</script>
```

## 禁用节点

在数据中设置 `disabled: true` 禁用特定节点：

```vue
<template>
  <w-tree :data="treeData" show-checkbox />
</template>

<script setup>
const treeData = [
  {
    label: '可勾选',
    key: '1',
    children: [
      { label: '禁用节点', key: '1-1', disabled: true },
      { label: '正常节点', key: '1-2' }
    ]
  }
]
</script>
```

## 自定义节点内容

使用默认插槽自定义节点内容：

```vue
<template>
  <w-tree :data="treeData">
    <template #default="{ node }">
      <span style="color: #409eff">{{ node.label }}</span>
    </template>
  </w-tree>
</template>
```

## Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| data | TreeOption[] | [] | 树形数据 |
| label-field | string | 'label' | 节点标签字段名 |
| key-field | string | 'key' | 节点唯一标识字段名 |
| children-field | string | 'children' | 子节点字段名 |
| default-expanded-keys | key[] | [] | 默认展开的节点key数组 |
| select-keys | key[] | - | 选中的节点key数组（双向绑定） |
| selectable | boolean | true | 是否支持节点选择 |
| multiple | boolean | false | 是否支持多选 |
| default-checked-keys | key[] | [] | 默认勾选的节点key数组 |
| show-checkbox | boolean | false | 是否显示勾选框 |
| on-load | Function | - | 异步加载子节点的方法，接收节点参数，返回Promise<TreeOption[]> |

### TreeOption 接口

```typescript
interface TreeOption {
  label?: string | number    // 节点显示文本
  key?: string | number      // 节点唯一标识
  children?: TreeOption[]    // 子节点数组
  isLeaf?: boolean          // 是否为叶子节点
  disabled?: boolean        // 是否禁用
  [key: string]: unknown   // 其他自定义属性
}
```

## Emits 事件

| 事件名 | 回调参数 | 说明 |
|--------|----------|------|
| update:selectKeys | (keys: key[]) | 选中的节点key数组变化时触发 |
| update:checkedKeys | (keys: key[]) | 勾选的节点key数组变化时触发 |
| update:expandedKeys | (keys: key[]) | 展开的节点key数组变化时触发 |
| node-click | (node: TreeNode) | 节点被点击时触发 |
| node-expand | (node: TreeNode) | 节点展开时触发 |
| node-collapse | (node: TreeNode) | 节点折叠时触发 |

## TreeNode 节点对象

格式化后的节点包含以下属性：

```typescript
interface TreeNode {
  key: string | number      // 节点唯一标识
  label: string             // 节点显示文本
  children: TreeNode[]      // 子节点数组
  level: number            // 节点层级（从0开始）
  isLeaf: boolean          // 是否为叶子节点
  disabled: boolean        // 是否禁用
  parentKey: string | number | undefined // 父节点key
  rawNode: TreeOption      // 原始数据对象
}
```

## 事件用法示例

```vue
<template>
  <w-tree 
    :data="treeData" 
    show-checkbox
    selectable
    multiple
    v-model:selectKeys="selectedKeys"
    v-model:checkedKeys="checkedKeys"
    @node-click="handleNodeClick"
    @node-expand="handleNodeExpand"
    @node-collapse="handleNodeCollapse"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedKeys = ref([])
const checkedKeys = ref([])

const handleNodeClick = (node) => {
  console.log('点击节点:', node.label, node.key)
}

const handleNodeExpand = (node) => {
  console.log('展开节点:', node.label)
}

const handleNodeCollapse = (node) => {
  console.log('折叠节点:', node.label)
}
</script>
```

## 样式类名

组件遵循 BEM 命名规范，主要类名如下：

- 基础类：`w-tree`
- 节点类：`w-node`
- 节点内容：`w-node__content`
- 展开图标：`w-node__expand-icon`
- 节点标签：`w-node__label`
- 选中状态：`w-node.is-selected`
- 禁用状态：`w-node.is-disabled`

## 注意事项

1. 节点key必须唯一，否则会引发渲染问题
2. 禁用节点无法被选择或勾选
3. 异步加载的节点需要正确设置isLeaf属性
4. 勾选功能支持父子节点的级联选择
5. 虚拟滚动技术确保大数据量下的性能表现
6. 自定义字段名时确保数据结构一致性