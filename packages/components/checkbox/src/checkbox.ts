import { ExtractPropTypes, PropType } from "vue";

export const checkboxProps = {
  modelValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: false
  },
  indeterminate: Boolean,
  disabled: Boolean,
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