import { h, defineComponent } from 'vue'
/**
 * 树形组件切换图标
 */
export default defineComponent({
  name: 'Switcher',
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="1em"
        height="1em"
      >
        <path d="M12 8l10 8l-10 8z" />
      </svg>
    )
  },
})
