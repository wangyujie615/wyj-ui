// vite.config.ts
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vueJsx(), vueSetupExtend() as any],
  server: {
    host: '0.0.0.0',
    port: 2222,
    open: true
  },
  resolve: {
    alias: {
      '@wyj-ui/app': resolve(__dirname, '../packages/wyj-ui'),
      '@wyj-ui/components': resolve(__dirname, '../packages/components'),
      '@wyj-ui/utils': resolve(__dirname, '../packages/utils'),
      '@wyj-ui/theme-chalk': resolve(__dirname, '../packages/theme-chalk'),
    }
  }
})