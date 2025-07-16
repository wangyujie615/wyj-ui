<script setup lang="ts">
import { createNameSpace } from '@wyj-ui/utils/create';
import { checkboxEmits, checkboxProps } from './checkbox';
import { computed } from 'vue';

const bem = createNameSpace('checkbox')
defineOptions({
  name: 'WCheckbox'
})
const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)

const model = computed<any>({
  get() {
    return props.modelValue
  },
  set(value: any) {
    emit('update:modelValue', value)
  }
})
</script>
<template>
  <label :class="bem.b()">
    <span :class="bem.e('input')">
      <input type="checkbox" v-model="model" />
    </span>
    <span v-if="$slots.default || label" :class="bem.e('label')">
      <slot></slot>
      <template v-if="!$slots.default">
        {{ label }}
      </template>
    </span>
  </label>
</template>