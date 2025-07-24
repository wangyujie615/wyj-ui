import { ExtractPropTypes, PropType } from "vue"
// 组件的大小
export type ButtonSize = 'large'| 'medium' | 'small' 
// 组件的类型
export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'link' | 'text'
// 组件的原始类型
export type NativeType = 'button' | 'submit' | 'reset'
// icon的placement
export type IconPlacement = 'left' | 'right'
// 链接打开方式
export type LinkTarget = '_blank' | '_self' | '_parent' | '_top'

export const buttonProps = {
  // @type:按钮大小
  size: {
    type: String as PropType<ButtonSize>,
    default: 'medium'
  },
  // @type:按钮类型
  type: {
    type: String as PropType<ButtonType>,
    //配置校验器
    validator:(val:string)=>['default', 'primary', 'success', 'warning', 'danger', 'info', 'link', 'text'].includes(val),
    default: 'default'
  },
  // @type:是否圆角按钮
  round:{
    type: Boolean,
    default: false
  },
  // @type:是否被禁用
  disabled:{
    type: Boolean,
    default: false
  },
  // @type:是否加载
  loading:{
    type: Boolean,
    default: false
  },
  // @type:组件的原始类型
  nativeType:{
    type: String as PropType<NativeType>,
    default: 'button'
  },
  // @type: icon的placement
  iconPlacement:{
    type: String as PropType<IconPlacement>,
    default: 'left'
  },
  // @type: 链接地址
  href: {
    type: String,
    default: ''
  },
  // @type: 链接打开方式
  target: {
    type: String as PropType<LinkTarget>,
    default: '_self'
  }
} as const
export type ButtonProps = ExtractPropTypes<typeof buttonProps>

// 给按钮绑定事件
export const buttonEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent,
  mousedown: (e: MouseEvent) => e instanceof MouseEvent
}
export type ButtonEmits = typeof buttonEmits