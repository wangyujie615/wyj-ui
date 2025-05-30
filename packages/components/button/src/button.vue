<script setup lang="ts">
import { buttonEmits, buttonProps } from './button';
import { createNameSpace } from '@wyj-ui/utils/create';

defineOptions({ name: "WButton" })
const bem = createNameSpace('button')
const props = defineProps(buttonProps)
const emits = defineEmits(buttonEmits)
</script>
<template>
  <button :class="[
    bem.b(),
    bem.m(props.type),
    bem.m(props.size),
    bem.is('disabled', props.disabled),
    bem.is('round', props.round),
    bem.is('loading', props.loading),
  ]" :type="nativeType" :disabled="disabled || loading">
    <slot></slot>
  </button>
</template>