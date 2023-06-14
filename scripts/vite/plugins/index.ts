import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import unocss from 'unocss/vite'
import { configCompressPlugin } from './compress'
import { configHtmlPlugin } from './html'
import { configStyleImportPlugin } from './styleImport'
import { configMockServerPlugin } from './mock'
import { configVisualizerConfig } from './visualizer'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VueHooksPlusResolver } from '@vue-hooks-plus/resolvers'
import AutoImport from 'unplugin-auto-import/vite' // 为 Vite、Webpack、Rollup 和 esbuild 按需自动导入 API
import Components from 'unplugin-vue-components/vite' // 为vite-Vue 的按需组件自动导入
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import UnpluginSvgComponent from 'unplugin-svg-component/vite'
import { pathResolve } from '../../utils'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv

  const vitePlugins: PluginOption | PluginOption[] = [
    vue({
      template: {
        compilerOptions: {
          /**
           * 在使用微前端microapp的时候
           * 注册自定义组件micro-app 防止控制台警告
           */
          isCustomElement: tag => /^micro-app/.test(tag),
        },
      },
    }),

    // jsx和tsx
    vueJsx(),

    // 在setup语法糖上添加name属性
    vueSetupExtend(),

    // https://github.com/unocss/unocss
    unocss(),

    // https://github.com/Jevon617/unplugin-svg-component
    UnpluginSvgComponent({
      iconDir: pathResolve('src/assets/icons'),
      dts: true,
      dtsDir: 'types/',
    }),

    // 按需引入api
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: ['vue', 'vue-router', 'pinia'],
      dirs: [pathResolve('src/hooks/web'), pathResolve('src/hooks/setting')],
      eslintrc: {
        enabled: false, // Default `false` 设置为true，会生成.eslintrc-auto-import.json，生成文件之后，建议将enabled设成false，否则每次重新加载会重新生成
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`，将此文件引入到.eslintrc中
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [
        ElementPlusResolver(),
        IconsResolver(),
        VueHooksPlusResolver(),
      ],
    }),

    // 按需引入组件
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ['ant-design', 'ep', 'carbon', 'ion'],
          customCollections: ['iemp'],
        }),
        ElementPlusResolver(),
      ],
    }),

    // 配置图标
    Icons({
      autoInstall: true, // 当import图标的时候，会自动检测并安装图标集，不引入则不会自动下载
      customCollections: {
        // 自定义图标集合
        iemp: FileSystemIconLoader(pathResolve('src/assets/icons')),
        // iemp: FileSystemIconLoader(pathResolve('src/assets/icons'), svg =>
        //   svg.replace(/^<svg /, '<svg fill="currentColor" ')
        // ),
      },
    }),
  ]

  // @vitejs/plugin-legacy
  VITE_LEGACY &&
    isBuild &&
    vitePlugins.push(legacy({ targets: ['defaults', 'not IE 11'] }))

  // vite-plugin-mock
  const mockServerPlugin = configMockServerPlugin(isBuild)
  !isBuild && mockServerPlugin && vitePlugins.push(mockServerPlugin)

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin())

  // vite-plugin-html
  const htmlPlugin = configHtmlPlugin(viteEnv, isBuild)
  vitePlugins.push(htmlPlugin)

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig())

  // rollup-plugin-gzip
  const compressPlugin = configCompressPlugin(
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  )
  isBuild && compressPlugin && vitePlugins.push(compressPlugin)

  return vitePlugins
}
