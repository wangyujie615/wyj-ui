<script setup lang="ts">
import { ref, watch } from 'vue';
import { TreeNode, TreeOption, treeProps } from './tree';
// 封装调用的方法
function createOption(key: string, label: string, children: string) {
  return {
    getKey(node: TreeOption) {
      return node[key] as string // 用户获得的key
    },
    getLable(node: TreeOption) {
      return node[label] as string // 用户传递的label
    },
    getChildren(node: TreeOption) {
      return node[children] as TreeOption[] // 用户传递的children
    }
  }
}
defineOptions({
  name: "WTree"
})
const props = defineProps(treeProps)
console.log(props);

// 1.有了props要对用户的数据进行格式化，格式化一个固定的结果
const tree = ref<TreeNode[]>([])

const treeOptions = createOption(props.keyField, props.labelFiled, props.childrenField)
// 2.将props.data格式化
function formatData(data: TreeOption[]): any {
  function traversal(data: TreeOption[], parent: TreeNode | null = null) {
    return data.map(node => {
      // 查看孩子节点
      const children = treeOptions.getChildren(node) || []
      // 数据转换后的格式 将数据转换为TreeNode格式
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLable(node),
        children: [], // 默认为空
        rawNode: node,
        level: parent ? parent.level + 1 : 0, // 根据父亲节点进行计算
        isLeaf: node.isLeaf ?? children.length == 0 // 判断节点是否自带叶子属性
      }
      if (children.length) {
        // 有孩子才去递归
        treeNode.children = traversal(children, parent)
      }
      return treeNode
    })
  }
  const result: TreeNode[] = traversal(data)
  return result
}
// 3.监听props.data
watch(
  () => props.data,
  (data: TreeOption[]) => {
    // 4.将格式化后的数据放入到tree
    tree.value = formatData(data)
    console.log(tree.value);
  },
  { immediate: true }
)
</script>
<template>Tree</template>