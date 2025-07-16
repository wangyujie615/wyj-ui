<script setup lang="ts">
/**
 * 图标组件
 *
 * 一个可自定义颜色和大小的图标组件，通过插槽提供图标内容
 */
import { createNameSpace } from '@wyj-ui/utils/create'
import { computed } from 'vue'
import { iconProps } from './icon'

// 定义组件名称为WIcon
defineOptions({ name: 'WIcon' })

// 创建BEM命名空间
const bem = createNameSpace('icon')

// 定义组件属性
const props = defineProps(iconProps)

/**
 * 计算图标样式
 * 根据传入的size和color属性动态生成样式对象
 */
const style = computed(() => {
  if (!props.size && !props.color) {
    return {}
  }
  return {
    ...(props.size ? { 'font-size': props.size + 'px' } : {}),
    ...(props.color ? { color: props.color } : {}),
  }
})
</script>
<template>
  <!-- 
    图标容器元素
    应用BEM命名的类名和计算后的样式
    通过默认插槽接收图标内容
  -->
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>