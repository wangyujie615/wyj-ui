import { ExtractPropTypes, PropType } from "vue";
// 组件的Props
export const checkboxProps = {
  // 勾选框的数据
  modelValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: false
  },
  // 默认半选状态
  indeterminate: Boolean,
  // 是否禁用
  disabled: Boolean,
  // 标签值
  label: {
    type: String as PropType<string>,
  }
} as const

export type CheckboxProps = Partial<ExtractPropTypes<typeof checkboxProps>>

export const checkboxEmits = {
  'update:modelValue': (value: boolean | string | number) => value,
  'change': (value: boolean | string | number) => value
}
export type CheckboxEmits = typeof checkboxEmits