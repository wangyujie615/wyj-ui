<script setup lang="ts">
import { ref, watch } from 'vue';
import { TreeNode, TreeOption, treeProps } from './tree';
defineOptions({
  name: "WTree"
})
const props = defineProps(treeProps)
//有了props要对用户的数据进行格式化，格式化一个固定的结果
const tree = ref<TreeNode[]>([])
// 将props.data格式化后放入到tree
function formatData(data: TreeOption[]): any {

}
watch(
  () => props.data,
  (data: TreeOption[]) => {
    tree.value = formatData(data)
  },
  { immediate: true }
)
</script>
<template>Tree</template>