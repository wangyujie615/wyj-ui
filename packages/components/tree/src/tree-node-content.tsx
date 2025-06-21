import { computed, defineComponent, inject } from 'vue'
import { treeInjectKey, treeNodeContentProps } from './tree'
// 渲染插槽组件 将插槽内容渲染出来
export default defineComponent({
  name: 'WTreeNodeContent',
  props: treeNodeContentProps,
  setup(props) {
    // 注入插槽内容
    const treeContext = inject(treeInjectKey)
    const node = computed(() => props.node)
    return () => {
      return treeContext?.slots.default
        ? treeContext?.slots.default!({ node: node.value }) // 插槽内容存在即返回对应内容
        : node.value?.label // 否则返回label
    }
  },
})
