import { ExtractPropTypes, PropType } from "vue"
type key = string|number
// data数据的组成 
export interface TreeOption{
  label?:key,
  key?:key,
  children?: TreeOption[], //子节点元素
  isLeaf: boolean,
  [key:string]:unknown, //任意接口
}
// 格式化后的结果
// Required: 强制所有可选属性变为必填
export interface TreeNode extends Required<TreeOption>{
  level: number,
  rawNode: TreeOption,
  children: TreeNode[] // 覆盖了原始属性
}

// tree组件的props props是只读的
export const treeProps = {
  data:{
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  // 默认展开字段
  defaultExpandedKeys:{
    type: Array as PropType<key[]>,
    default: () => []
  },
  labelField:{
    type:String,
    default:'label'
  },
  keyField:{
    type:String,
    default:'key'
  },
  childrenField:{
   type:String, 
   default:'children'
  }
} as const
// 控制属性可选
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>