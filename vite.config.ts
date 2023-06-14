import { loadEnv, defineConfig } from 'vite'
import { createVitePlugins } from './scripts/vite/plugins'
import { configAlias } from './scripts/vite/alias'
import { createProxy } from './scripts/vite/proxy'
import { wrapperEnv } from './scripts/utils'

export default defineConfig(({ command, mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build'
  return {
    base: VITE_PUBLIC_PATH,
    root,

    resolve: {
      alias: [...configAlias()],
    },
    server: {
      host: true,
      open: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      chunkSizeWarningLimit: 2000,
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use './src/styles/modules' as *;`,
        },
      },
    },
    plugins: [...createVitePlugins(viteEnv, isBuild)],
    optimizeDeps: {
      include: ['echarts'],
    },
  }
})
