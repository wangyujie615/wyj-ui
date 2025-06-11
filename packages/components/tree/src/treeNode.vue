<script setup lang="ts">
import { createNameSpace } from '@wyj-ui/utils/create';
import { treeNodeEmits, treeNodeProps } from './tree';
import Switcher from './icon/Switcher';
import WIcon from '@wyj-ui/components/icon';
const bem = createNameSpace('node')
const { node, isExpanded } = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmits)
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
          <Switcher></Switcher>
        </WIcon>
      </span>
      <span>{{ node?.label }}</span>
    </div>
  </div>
</template>