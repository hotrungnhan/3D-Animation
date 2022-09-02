import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  // eslint-disable-next-line no-undef
  const isDev = command == 'serve'
  return {
    base: 'https://hotrungnhan.github.io/3D-Animation',
    plugins: [
      react(),
      eslint({
        exclude: ['node_modules/**'],
      }),
      createHtmlPlugin({
        minify: true,
        entry: 'src/main.tsx',
        inject: {
          data: { dev: isDev },
        },
      }),
    ],
  }
})
