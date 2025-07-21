import { ExtractPropTypes, InjectionKey, PropType, SetupContext } from "vue"
export type key = string | number
// data数据的组成 由于这些数据来自后端
export interface TreeOption {
  label?: key,
  key?: key,
  children?: TreeOption[], // 子节点元素
  isLeaf: boolean,
  disabled?: boolean, // 禁用
  [key: string]: unknown // 任意接口
}
// 格式化后的结果
// Required: 强制所有可选属性变为必填
export interface TreeNode extends Required<TreeOption> {
  level: number, // 节点的层级
  rawNode: TreeOption, // 原始节点的数据
  children: TreeNode[], // 同名覆盖原始属性
  isLeaf: boolean,
  parentKey: key | undefined
}


export interface TreeContext {
  slots: SetupContext['slots'],
}

// 作为提供出去的变量
export const treeInjectKey: InjectionKey<TreeContext> = Symbol()

// tree组件的props props是只读的
export const treeProps = {
  // 用户传递的数据--一个TreeOption数组
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  // 用户传递的字段 - label
  labelField: {
    type: String,
    default: 'label'
  },
  // 用户传递的字段 - key
  keyField: {
    type: String,
    default: 'key'
  },
  // 用户传递的字段 - children
  childrenField: {
    type: String,
    default: 'children'
  },
  // 控制默认展开字段 - key[]
  defaultExpandedKeys: {
    type: Array as PropType<key[]>,
    default: () => []
  },
  // 异步加载数据
  onLoad: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>,
  // 选中的结果
  selectKeys: {
    type: Array as PropType<key[]>,
  },
  // 是否支持可选节点
  selectAble: {
    type: Boolean,
    default: true
  },
  // 是否支持多选节点
  mutiple: {
    type: Boolean,
    default: false
  },
  // 默认选中的节点
  defaultCheckedKeys: {
    type: Array as PropType<key[]>,
    default: () => []
  },
  // 是否显示checkbox
  showCheckbox: {
    type: Boolean,
    default: false
  }
} as const // 组件的props理论上是只读的
// 控制属性可选
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>
// 树内部发射的事件用来同步响应数据
export const treeEmits = {
  'update:selectKeys': (keys: key[]) => keys
}

// TreeNode的props
export const treeNodeProps = {
  // 节点数据
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  // 节点是否被展开
  isExpanded: {
    type: Boolean,
    default: false
  },
  // 异步加载的节点
  loadingKeys: {
    type: Object as PropType<Set<key>>,
    required: true
  },
  // 选中的节点数据
  selectKeys: {
    type: Array as PropType<key[]>,
    default: () => []
  },
  // 是否显示CheckBox
  showCheckbox: {
    type: Boolean,
    default: false
  },
  // 是否选中
  checked: Boolean,
  // 是否禁用
  disabled: Boolean,
  // 是否是半选
  indeterminate: Boolean
} as const

export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>
export const treeNodeEmits = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node,
  check: (node: TreeNode, value: boolean) => typeof value === 'boolean'
}

// 节点内容Props
export const treeNodeContentProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  }
}