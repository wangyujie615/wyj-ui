import type { App, Component } from 'vue'

/**
 * 创建一个安装器对象，用于批量注册Vue组件
 * @param components 需要注册的组件数组，默认为空数组
 * @returns 包含install方法的对象，用于在Vue应用中安装组件
 */
export const makeInstaller = (components: Component[] = []) => {
  /**
   * 在Vue应用中注册所有组件
   * @param app Vue应用实例
   */
  const install = (app: App) => {
    components.forEach(comp => app.use(comp))
  }
  return {
    install
  }
}