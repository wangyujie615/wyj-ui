<template>
  <div class="basic">
    <h3>基本用法</h3>
    <w-tree :data="basicTreeData" />
  </div>

  <div class="selectable">
    <h3>可选择节点</h3>
    <w-tree :data="selectableTreeData" :selectable="true" v-model:selectKeys="selectedKeys" />
  </div>

  <div class="multiple">
    <h3>多选节点</h3>
    <w-tree :data="multipleTreeData" :selectable="true" :multiple="true" v-model:selectKeys="multipleSelectedKeys" />
  </div>

  <div class="checkbox">
    <h3>勾选框</h3>
    <w-tree :data="checkboxTreeData" show-checkbox v-model:checkedKeys="checkedKeys" />
  </div>

  <div class="default-expanded">
    <h3>默认展开节点</h3>
    <w-tree :data="defaultExpandedTreeData" :default-expanded-keys="['1', '1-1']" />
  </div>

  <div class="custom-fields">
    <h3>自定义字段名</h3>
    <w-tree :data="customFieldTreeData" key-field="id" label-field="name" children-field="subs" />
  </div>

  <div class="disabled-nodes">
    <h3>禁用节点</h3>
    <w-tree :data="disabledTreeData" show-checkbox />
  </div>

  <div class="custom-content">
    <h3>自定义节点内容</h3>
    <w-tree :data="customContentTreeData">
      <template #default="{ node }">
        <span style="color: #409eff">{{ node.label }}</span>
      </template>
    </w-tree>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 基本用法数据
const basicTreeData = [
  {
    label: '一级 1',
    key: '1',
    children: [
      {
        label: '二级 1-1',
        key: '1-1',
        children: [{ label: '三级 1-1-1', key: '1-1-1' }],
      },
    ],
  },
  {
    label: '一级 2',
    key: '2',
    children: [
      { label: '二级 2-1', key: '2-1' },
      { label: '二级 2-2', key: '2-2' },
    ],
  },
]

// 可选择节点数据
const selectableTreeData = [
  {
    label: '一级 1',
    key: '1',
    children: [
      {
        label: '二级 1-1',
        key: '1-1',
        children: [{ label: '三级 1-1-1', key: '1-1-1' }],
      },
    ],
  },
  {
    label: '一级 2',
    key: '2',
    children: [
      { label: '二级 2-1', key: '2-1' },
      { label: '二级 2-2', key: '2-2' },
    ],
  },
]
const selectedKeys = ref(['1-1-1'])

// 多选节点数据
const multipleTreeData = [
  {
    label: '一级 1',
    key: '1',
    children: [
      {
        label: '二级 1-1',
        key: '1-1',
        children: [{ label: '三级 1-1-1', key: '1-1-1' }],
      },
    ],
  },
  {
    label: '一级 2',
    key: '2',
    children: [
      { label: '二级 2-1', key: '2-1' },
      { label: '二级 2-2', key: '2-2' },
    ],
  },
]
const multipleSelectedKeys = ref(['1', '2-1'])

// 勾选框数据
const checkboxTreeData = [
  {
    label: '一级 1',
    key: '1',
    children: [
      {
        label: '二级 1-1',
        key: '1-1',
        children: [{ label: '三级 1-1-1', key: '1-1-1' }],
      },
    ],
  },
  {
    label: '一级 2',
    key: '2',
    children: [
      { label: '二级 2-1', key: '2-1' },
      { label: '二级 2-2', key: '2-2' },
    ],
  },
]
const checkedKeys = ref(['1-1', '2-1'])

// 默认展开节点数据
const defaultExpandedTreeData = [
  {
    label: '一级 1',
    key: '1',
    children: [
      {
        label: '二级 1-1',
        key: '1-1',
        children: [{ label: '三级 1-1-1', key: '1-1-1' }],
      },
    ],
  },
  {
    label: '一级 2',
    key: '2',
    children: [
      { label: '二级 2-1', key: '2-1' },
      { label: '二级 2-2', key: '2-2' },
    ],
  },
]

// 自定义字段名数据
const customFieldTreeData = [
  {
    name: '自定义名称',
    id: 'custom-1',
    subs: [{ name: '子节点', id: 'custom-1-1' }],
  },
]

// 禁用节点数据
const disabledTreeData = [
  {
    label: '可勾选',
    key: '1',
    children: [
      { label: '禁用节点', key: '1-1', disabled: true },
      { label: '正常节点', key: '1-2' },
    ],
  },
]

// 自定义节点内容数据
const customContentTreeData = [
  {
    label: '一级 1',
    key: '1',
    children: [
      {
        label: '二级 1-1',
        key: '1-1',
        children: [{ label: '三级 1-1-1', key: '1-1-1' }],
      },
    ],
  },
  {
    label: '一级 2',
    key: '2',
    children: [
      { label: '二级 2-1', key: '2-1' },
      { label: '二级 2-2', key: '2-2' },
    ],
  },
]
</script>

<style lang="scss" scoped>
.basic,
.selectable,
.multiple,
.checkbox,
.default-expanded,
.custom-fields,
.disabled-nodes,
.custom-content {
  margin-bottom: 20px;
}

h3 {
  margin-bottom: 10px;
}
</style>
