import { createNameSpace } from '@wyj-ui/utils/create'
import { defineComponent, ref, onMounted, reactive, computed, watch } from 'vue'
// 虚拟列表
export default defineComponent({
  name: 'WVirtualList',
  props: {
    // 每一个列表元素的高度
    size: {
      type: Number,
      default: 35,
    },
    // 列表真实可见的节点个数
    remain: {
      type: Number,
      default: 8,
    },
    // 虚拟列表的数据
    items: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { slots }) {
    // 创建bem规范
    const bem = createNameSpace('vl')
    // 虚拟列表的外边框
    const wrapperRef = ref<HTMLElement>()
    // 滑动条
    const barRef = ref<HTMLElement>()
    // 虚拟列表的开始的长度
    const state = reactive({
      start: 0,
      end: props.remain
    })
    // 滚动的长度
    const offset = ref(0)
    // 向前填充的内容的数量
    const pre = computed(() => {
      return Math.min(state.start, props.remain)
    })
    // 向后填充的内容的数量
    const next = computed(() => {
      return Math.min(props.items.length - state.end, props.remain)
    })
    // 可见的数据
    // 可以多展示上下的数据 保证用户在快速滚动时，数据不会白屏
    // 监听了四个元素进行计算
    const visibleData = computed(() => {
      return props.items.slice(state.start - pre.value, state.end + next.value)
    })

    // 监听传入的数据
    watch(() => props.items, initWrapper)

    // 第一次装载组件时，也实现初始化函数
    onMounted(() => {
      initWrapper()
    })
    // 初始化Wrapper 计算列表的长度和滚动条的长度
    function initWrapper() {
      wrapperRef.value!.style.height = props.remain * props.size + 'px' // 列表的长度
      barRef.value!.style.height = props.items.length * props.size + 'px' // 滚动条的长度
    }
    // 滚动事件
    // 根据当前滚动的距离来计算
    const handleScroll = () => {
      const scrollTop = wrapperRef.value!.scrollTop // 向上滚动的像素数量
      state.start = Math.floor(scrollTop / props.size) // 划过的元素
      state.end = state.start + props.remain // 结尾的元素
      offset.value = state.start * props.size - pre.value * props.size // 滚过去多少个元素
    }
    return () => {
      return (
        <div class={bem.b()} ref={wrapperRef} onScroll={handleScroll}>
          {/* 滑动条 */}
          <div class={bem.e('scroll-bar')} ref={barRef}></div>
          {/* 滑动列表 */}
          <div
            class={bem.e('scroll-list')}
            style={{ transform: `translate3d(0,${offset.value}px,0)` }}
          >
            {/* 渲染可见数据 */}
            {visibleData.value.map(node => slots.default!({ node }))}
          </div>
        </div>
      )
    }
  },
})
