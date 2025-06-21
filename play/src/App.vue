<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5'
import { ref } from 'vue'
import type { key, TreeOption } from '@wyj-ui/components/tree/src/tree'
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
// function createData() {
//   return [
//     {
//       label: nextLabel(),
//       key: 1,
//       isLeaf: false
//     },
//     {
//       label: nextLabel(),
//       key: 2,
//       isLeaf: false
//     }
//   ]
// }
function nextLabel(currentLabel?: string | undefined | number): string {
  if (!currentLabel) return "hello,world"
  if (currentLabel === 'hello,world') return "你好,世界"
  if (currentLabel === '你好,世界') return "你好,世界1"
  if (currentLabel === '你好,世界1') return "你好,世界2"
  if (currentLabel === '你好,世界2') return "你好,世界3"
  return ""
}
const handleLoad = (node: TreeOption) => {
  return new Promise<TreeOption[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { label: nextLabel(node.label), key: node.key + nextLabel(node.label), isLeaf: false }
      ])
    }, 1000)
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
const data = ref<TreeOption[]>(createData())
// const data = ref<TreeOption[]>([
//   {
//     label: '一',
//     key: '1',
//     children: [
//       {
//         label: '一-1',
//         key: '11',
//         children: [
//           {
//             label: '一-1-1',
//             key: '111',
//             disabled: true,
//             children: [
//               {
//                 label: '一-1-1-1',
//                 key: '1111',
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }
// ])
const value = ref<key[]>(['40', '41'])
function handleSelect(keys: key[]) {
  console.log(keys);

  value.value = keys
}
</script>

<template>
  <WIcon :color="'red'" :size="20">
    <AddCircle></AddCircle>
  </WIcon>
  <!-- 在使用树组件时 会传递一个树形结构 -->
  <WTree :data="data" label-field="label" key-field="key" children-field="children" :mutiple="true" :select-keys="value"
    @update:select-keys="handleSelect">
    <template #default="{ node }">
      {{ node.key }}-{{ node.label }}
    </template>
  </WTree>
  <WButton type="primary" size="small" native-type="button">按钮</WButton>
</template>

<style scoped></style>
