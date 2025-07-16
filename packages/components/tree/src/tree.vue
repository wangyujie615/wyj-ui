<script setup lang="ts">
import { computed, ref, watch, provide, useSlots } from 'vue';
import { TreeNode, TreeOption, treeProps, key, treeEmits, treeInjectKey } from './tree';
import { createNameSpace } from '@wyj-ui/utils/create';
import WTreeNode from './treeNode.vue';
import WVirtualList from '@wyj-ui/components/virtual-list';
// 组件的名称
defineOptions({
  name: "WTree"
})
// bem规范
const bem = createNameSpace('tree')
// 定义组件的props
const props = defineProps(treeProps)
// 定义树组件的事件
const emit = defineEmits(treeEmits)
// 1.对用户传入的数据进行格式化，格式化一个固定的结果
const tree = ref<TreeNode[]>([])
// 封装获取的属性的方法
const treeOptions = createOption(props.keyField, props.labelField, props.childrenField)

// 将树的节点进行展开，点击还能实现展开操作  
// 需要展开的key有哪些
const expandedKeysSet = ref(new Set(props.defaultExpandedKeys))

// 记录异步加载的节点
const loadingKeyRef = ref(new Set<key>())

// 记录选中的节点
const selectKeysRef = ref<key[]>([])

// 外层传入的插槽 接受Tree传入的插槽
provide(treeInjectKey, {
  slots: useSlots()
})


// 2.监听props.data，将传入的props格式化
watch(
  () => props.data,
  (data: TreeOption[]) => {
    // 4.将格式化后的数据放入到tree
    tree.value = formatData(data)
    console.log(tree.value);
  },
  { immediate: true }
)

// 监听props.selectKeys，更新选中的节点
watch(
  () => props.selectKeys,
  (value) => {
    if (value) {
      selectKeysRef.value = value
    }
  },
  { immediate: true }
)
// 根据展开的节点对树进行拍平
// 例子：[{id:1,label:'level1',children:[{id:11,label:'leve;2'}]},{id:2,label:'level1',children:[]}]
// 展开节点一：相当于转化为[1,11,2]=>为了懒加载的实现
const flattenTree = computed(() => {
  let expandedKeys = expandedKeysSet.value; // 要展开的keys有哪些 计算属性依赖的属性 需要时才计算 并且会缓存
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

/**
 * 将传入的数据进行格式化
 * @param data props.data
 * @param parent 父级节点数据
 * @returns 格式化后的数据
 */
function formatData(data: TreeOption[], parent: TreeNode | null = null): any {
  function traversal(data: TreeOption[], parent: TreeNode | null = null) {
    return data.map(node => {
      // 查看孩子节点
      const children = treeOptions.getChildren(node) || []
      // 数据转换后的格式 将数据转换为TreeNode格式
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [], // 默认为空
        rawNode: node, // 原始数据
        disabled: node.disabled ?? false, // 禁用
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
  const result: TreeNode[] = traversal(data, parent)
  return result
}

/**
 * 封装调用TreeOption属性的方法
 * @param key 获取的key
 * @param label 获取的label
 * @param children 获取的children
 */
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

/**
 * 是否展开节点
 * @param node 
 */
function isExpanded(node: TreeNode): boolean {
  return expandedKeysSet.value.has(node.key)
}

/**
 * 折叠节点
 * @param node 
 */
function collapse(node: TreeNode) {
  expandedKeysSet.value.delete(node.key)
}

/**
 * 展开节点
 * @param node 
 */
function expand(node: TreeNode) {
  expandedKeysSet.value.add(node.key)
  // 加载子节点
  triggerLoading(node)
}

/**
 * 异步加载节点 需要时，去请求节点数据
 * @param node 
 */
function triggerLoading(node: TreeNode) {
  if (!node.children.length && !node.isLeaf) {
    let loadingKeys = loadingKeyRef.value
    // 如果没有加载过这个节点 就加载这个节点
    if (!loadingKeys.has(node.key)) {
      loadingKeys.add(node.key)
      const onLoad = props.onLoad // 调用传入的异步加载函数进行异步加载
      if (onLoad) {
        onLoad(node.rawNode).then((children) => {
          // 修改原来的节点
          node.rawNode.children = children
          node.children = formatData(children, node)
          loadingKeys.delete(node.key)
        })
      }
    }
  }
}
/**
 * 子节点点击展开
 * @param node 
 */
function toggleExpand(node: TreeNode) {
  const expandKeys = expandedKeysSet.value
  if (expandKeys.has(node.key) && !loadingKeyRef.value.has(node.key)) {
    // 已经展开则关闭
    collapse(node)
  } else {
    // 展开
    expand(node)
  }
}

/**
 * 处理选中的节点
 * @param node 
 */
function handleSelect(node: TreeNode) {
  let keys = Array.from(selectKeysRef.value)
  // 无法选择
  if (!props.selectAble) return
  if (props.mutiple) {
    let index = keys.findIndex(key => key === node.key)
    if (index > -1) {
      // 当前节点被选中 则取消选中
      keys.splice(index, 1)
    } else {
      // 当前节点未选中 则选中
      keys.push(node.key)
    }
  } else {
    if (keys.includes(node.key)) {
      // 之前选中 变成未被选中
      keys = []
    } else {
      // 反之选中
      keys = [node.key]
    }
  }
  emit('update:selectKeys', keys)
}
</script>
<template>
  <div :class="bem.b()">
    <!-- 实现虚拟树列表 -->
    <WVirtualList :items="flattenTree" :remain="8" :size="33">
      <template #default="{ node }">
        <WTreeNode :key="node.key" :node="node" :is-expanded="isExpanded(node)" :loading-keys="loadingKeyRef"
          :select-keys="selectKeysRef" @select="handleSelect" @toggle="toggleExpand">
        </WTreeNode>
      </template>
    </WVirtualList>
  </div>
</template>