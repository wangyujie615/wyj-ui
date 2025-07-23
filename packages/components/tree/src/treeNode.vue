<script setup lang="ts">
import { createNameSpace } from '@wyj-ui/utils/create';
import { treeNodeEmits, treeNodeProps, treeInjectKey } from './tree';
import Switcher from './icon/Switcher';
import WCheckbox from '@wyj-ui/components/checkbox'
import WIcon from '@wyj-ui/components/icon';
import Loading from "./icon/Loading"
import { computed, inject } from 'vue'
import WTreeNodeContent from './tree-node-content';
// 组件的名称
defineOptions({ name: 'WTreeNode' })
// bem规范
const bem = createNameSpace('node')
// props
const { node, isExpanded, loadingKeys, selectKeys } = defineProps(treeNodeProps)
// emits
const emit = defineEmits(treeNodeEmits)

// 注入插槽 (如果后续需要使用插槽功能)
// const treeContext = inject(treeInjectKey)

// 计算属性 判断节点的加载状态
const isLoading = computed(() => {
  return loadingKeys.has(node.key)
})

// 判断节点是否选中
const isSelected = computed(() => {
  return selectKeys.includes(node.key)
})
// 点击展开
function handleExpand() {
  emit('toggle', node)
}

// 点击选中
function handleSelected() {
  if (node.disabled) return
  emit('select', node)
}

function handleCheckChange(value: boolean | string | number) {
  // 确保传递给父组件的是布尔值
  const booleanValue = typeof value === 'boolean' ? value : !!value
  emit('check', node, booleanValue)
}

</script>
<template>
  <div :class="[bem.b(), bem.is('selected', isSelected), bem.is('disabled', node.disabled)]"
    :style="{ paddingLeft: `${node.level * 16}px` }">
    <div :class="bem.e('content')">
      <!-- 图标区域 -->
      <span :class="[
        bem.e('expand-icon'),
        { expanded: isExpanded && !node.isLeaf },
        bem.is('leaf', node.isLeaf)
      ]" @click="handleExpand">
        <WIcon size="16" color="pink">
          <!-- 非加载时显示 -->
          <Switcher v-if="!isLoading"></Switcher>
          <!-- 加载时显示 -->
          <Loading v-else size="48" color="#3b82f6" thickness="8"></Loading>
        </WIcon>
      </span>
      <WCheckbox v-if="showCheckbox" :model-value="checked" :disabled="disabled" :indeterminate="indeterminate"
        @change="handleCheckChange">
      </WCheckbox>
      <!-- 节点内容：这里使用的是TSX渲染插槽传入的数据 -->
      <span @click="handleSelected" :class="bem.e('label')">
        <WTreeNodeContent :node="node"></WTreeNodeContent>
      </span>
    </div>
  </div>
</template>