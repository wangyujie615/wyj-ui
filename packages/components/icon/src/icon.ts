/**
 * 图标组件属性定义
 * 
 * 此文件定义了图标组件的属性和类型
 */
import { ExtractPropTypes, PropType } from 'vue'

/**
 * 图标组件属性
 * @property {string} color - 图标颜色
 * @property {number|string} size - 图标大小（可以是数字或字符串）
 */
export const iconProps = {
    color: String,
    size: [Number, String] as PropType<number | string>
} as const

/**
 * 从iconProps提取的类型定义
 * 用于组件中的类型检查和智能提示
 */
export type IconProps = ExtractPropTypes<typeof iconProps>