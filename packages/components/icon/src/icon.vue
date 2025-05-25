<script setup lang="ts">
import { createNameSpace } from '@wyj-ui/utils/create'
import { computed } from 'vue';
import { iconProps } from './icon';

defineOptions({ name: 'WIcon' })
const bem = createNameSpace('icon')
const props = defineProps(iconProps)
//计算属性计算一个样式
const style = computed(() => {
    if (!props.size && !props.color) {
        return {}
    }
    return {
        ...(props.size ? { "font-size": props.size + "px" } : {}),
        ...(props.color ? { color: props.color } : {})
    }
})
</script>
<template>
    <i :class="bem.b()" :style="style">
        <slot></slot>
    </i>
</template>