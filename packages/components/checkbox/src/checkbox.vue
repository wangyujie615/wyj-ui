<script setup lang="ts">
import { createNameSpace } from '@wyj-ui/utils/create';
import { checkboxEmits, checkboxProps } from './checkbox';
import { computed, onMounted, watch, ref } from 'vue';

// 创建bem规范
const bem = createNameSpace('checkbox')
// 组件命名
defineOptions({
  name: 'WCheckbox'
})
// 组件的props
const props = defineProps(checkboxProps)
// 组件的事件emits
const emit = defineEmits(checkboxEmits)
// 计算属性
const model = computed<any>({
  get() {
    return props.modelValue
  },
  set(value: any) {
    emit('update:modelValue', value)
  }
})

// ------------ 操作类 -------------
// 监听传入的indeterminate状态 执行函数
watch(() => props.indeterminate, indeterminate)

// 挂载时,执行函数
onMounted(() => {
  indeterminate(props.indeterminate)
})

// ----------- 操作组件 ------------
const inputRef = ref<HTMLInputElement>()

// ----------- 方法区 --------------

function indeterminate(value: boolean) {
  inputRef.value!.indeterminate = value
}

function handleChange(e: Event) {
  const target = e.target as HTMLInputElement
  const value = target.checked ? true : false
  emit('change', value)
}
</script>
<template>
  <label :class="bem.b()">
    <!-- 勾选框:显示勾选 -->
    <span :class="bem.e('input')">
      <input type="checkbox" v-model="model" ref="inputRef" :disabled="disabled" :value="label"
        @chaneg="handleChange" />
    </span>
    <span v-if="$slots.default || label" :class="bem.e('label')">
      <slot></slot>
      <!-- 插槽不存在显示标签 -->
      <template v-if="!$slots.default">
        {{ label }}
      </template>
    </span>
  </label>
</template>