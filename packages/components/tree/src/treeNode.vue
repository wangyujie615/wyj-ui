<script setup lang="ts">
import { createNameSpace } from '@wyj-ui/utils/create';
import { treeNodeProps } from './tree';
import Switcher from './icon/Switcher';
import WIcon from '@wyj-ui/components/icon';
const bem = createNameSpace('node')
const { node, expanded } = defineProps(treeNodeProps)
</script>
<template>
  <div :class="bem.b()">
    <div :class="bem.e('content')">
      <span :class="[bem.e('expand-icon'), { expanded: expanded && !node.isLeaf }]">
        <WIcon size="16" color="pink">
          <Switcher></Switcher>
        </WIcon>
      </span>
      <span>{{ node?.label }}</span>
    </div>
  </div>
</template>