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
export interface TreeNode extends Required<TreeOption>{
  level: number,
  rawNode: TreeOption,
  children: TreeNode[],
  isLeaf: boolean
}

//tree组件的props props是只读的
export const treeProps = {
  data:{
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  labelFiled:{
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
//控制属性可选
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>