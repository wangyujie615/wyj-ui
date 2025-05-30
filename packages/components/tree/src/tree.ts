import { ExtractPropTypes, PropType } from "vue"
type key = string|number
export interface TreeOption{
  label?:key,
  key?:key,
  children?:TreeOption[],
  [key:string]:unknown //任意接口
}

export interface TreeNode extends Required<TreeOption>{
  level: number,
  rawNode: TreeOption
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
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>