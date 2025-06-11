<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { TreeNode, TreeOption, treeProps } from './tree';
import { createNameSpace } from '@wyj-ui/utils/create';
import WTreeNode from './treeNode.vue';

// bem规范
const bem = createNameSpace('tree')
// 封装调用的方法
function createOption(key: string, label: string, children: string) {
  return {
    getKey(node: TreeOption) {
      return node[key] as string // 用户获得的key
    },
    getLabel(node: TreeOption) {
      return node[label] as string // 用户传递的label
    },
    getChildren(node: TreeOption) {
      return node[children] as TreeOption[] // 用户传递的children
    }
  }
}
// 组件的名称
defineOptions({
  name: "WTree"
})
const props = defineProps(treeProps)
// 1.有了props要对用户的数据进行格式化，格式化一个固定的结果
const tree = ref<TreeNode[]>([])

const treeOptions = createOption(props.keyField, props.labelField, props.childrenField)
// 2.将props.data格式化
function formatData(data: TreeOption[]): any {
  function traversal(data: TreeOption[], parent: TreeNode | null = null) {
    return data.map(node => {
      // 查看孩子节点
      const children = treeOptions.getChildren(node) || []
      // 数据转换后的格式 将数据转换为TreeNode格式
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [], // 默认为空
        rawNode: node,
        level: parent ? parent.level + 1 : 0, // 根据父亲节点进行计算
        isLeaf: node.isLeaf ?? children.length === 0 // 判断节点是否自带叶子属性
      }
      if (children.length) {
        // 有孩子才去递归
        treeNode.children = traversal(children, treeNode)
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
// 将树拍平，点击还能实现展开操作  
// 需要展开的key有哪些
const expandedKeysSet = ref(new Set(props.defaultExpandedKeys))

const flattenTree = computed(() => {
  let expandedKeys = expandedKeysSet.value; // 要展开的keys有哪些
  const flattenNode: TreeNode[] = []; // 存储拍平后的结果
  const nodes = tree.value || []; // 被格式化的节点
  const stack: TreeNode[] = []; // 用于遍历树的栈
  // 1.倒序放入
  for (let i = nodes.length - 1; i >= 0; --i) {
    stack.push(nodes[i])
  }
  while (stack.length) {
    const node = stack.pop(); // 取出栈顶元素
    if (!node) continue;
    flattenNode.push(node);
    if (expandedKeys.has(node.key)) {
      // 需要展开，拿到孩子节点
      const children = node.children;
      if (children) {
        for (let i = node.children.length - 1; i >= 0; --i) {
          stack.push(node.children[i])
        }
      }
    }
  }
  return flattenNode
})

function isExpanded(node: TreeNode): boolean {
  return expandedKeysSet.value.has(node.key)
}
// 折叠
function collapse(node: TreeNode) {
  expandedKeysSet.value.delete(node.key)
}
// 展开
function expand(node: TreeNode) {
  expandedKeysSet.value.add(node.key)
}
// 切换展开
function toggleExpand(node: TreeNode) {
  const expandKeys = expandedKeysSet.value
  if (expandKeys.has(node.key)) {
    collapse(node)
  } else {
    expand(node)
  }
}
</script>
<template>
  <div :class="bem.b()">
    <WTreeNode v-for="node in flattenTree" :key="node.key" :node="node" :is-expanded="isExpanded(node)"
      @toggle="toggleExpand"></WTreeNode>
  </div>
</template>