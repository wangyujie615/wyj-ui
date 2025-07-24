<script setup lang="ts">
import { computed } from 'vue';
import { buttonEmits, buttonProps } from './button';
import { createNameSpace } from '@wyj-ui/utils/create';

defineOptions({ name: "WButton" })
const bem = createNameSpace('button')
const props = defineProps(buttonProps)
const emits = defineEmits(buttonEmits)

// 根据type属性决定渲染的元素
const renderTag = computed(() => {
  if (props.type === 'link') {
    return 'a'
  }
  return 'button'
})
</script>
<template>
  <component
    :is="renderTag"
    :class="[
      bem.b(),
      bem.m(props.type),
      bem.m(props.size),
      bem.is('disabled', props.disabled),
      bem.is('round', props.round),
      bem.is('loading', props.loading),
    ]"
    :type="nativeType"
    :disabled="disabled || loading"
    v-bind="props.type === 'link' ? { href: props.href, target: props.target } : {}"
    @click="emits('click', $event)"
    @mousedown="emits('mousedown', $event)"
  >
    <slot></slot>
  </component>
</template>