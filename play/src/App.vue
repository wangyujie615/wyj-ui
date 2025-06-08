<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5'
import { ref } from 'vue'
function createData(level = 4, parentKey = ''): any {
  if (!level) return []
  const arr = new Array(6 - level).fill(0)
  return arr.map((_, idx: number) => {
    const key = parentKey + level + idx
    return {
      key, //为了唯一性 
      label: createLabel(level), //层级
      children: createData(level - 1, key) //子节点
    }
  })
}

function createLabel(level: number): string {
  if (level === 4) {
    return '一'
  }
  if (level === 3) {
    return '二'
  }
  if (level === 2) {
    return '三'
  }
  if (level === 1) {
    return '四'
  }
  return ''
}
const data = ref(createData())

console.log("data");
console.log(data.value);
</script>

<template>
  <WIcon :color="'red'" :size="20">
    <AddCircle></AddCircle>
  </WIcon>
  <!-- 在使用树组件时 会传递一个树形结构 -->
  <WTree :data="data" label-filed="label" key-field="key" children-field="children"></WTree>
  <WButton type="primary" size="small" native-type="button">按钮</WButton>
</template>

<style scoped></style>
