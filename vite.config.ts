import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [
    Pages({
      dirs: [{ dir: 'src/views', baseRoute: '' }],
      exclude: ['**/components/*.vue']
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'DefaultLayout'
    }),
    AutoImport({
      dts: './types/imports.d.ts',
      imports: ['vue', 'vue-router', 'pinia']
    }),
    Components({
      dirs: ['src/components', 'src/layouts', 'src/views'],
      extensions: ['vue', 'md'],
      dts: './types/components.d.ts',
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
    }),
    vue(),
    vueDevTools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
