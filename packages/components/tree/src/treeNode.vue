<script setup lang="ts">
import { createNameSpace } from '@wyj-ui/utils/create';
import { treeNodeEmits, treeNodeProps } from './tree';
import Switcher from './icon/Switcher';
import WIcon from '@wyj-ui/components/icon';
import Loading from "./icon/Loading"
import { computed } from 'vue'
// 组件的名称
defineOptions({ name: 'WTreeNode' })
// bem规范
const bem = createNameSpace('node')
// props
const { node, isExpanded, loadingKeys } = defineProps(treeNodeProps)
// emits
const emit = defineEmits(treeNodeEmits)
// 计算属性 判断节点的加载状态
const isLoading = computed(() => {
  return loadingKeys.has(node.key)
})
// 点击展开
function handleExpand() {
  emit('toggle', node)
}
</script>
<template>
  <div :class="bem.b()" :style="{ paddingLeft: `${node.level * 16}px` }">
    <div :class="bem.e('content')">
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
      <span>{{ node?.label }}</span>
    </div>
  </div>
</template>