// 按需引入组件库样式
import {
  createStyleImportPlugin,
  ElementPlusResolve,
} from 'vite-plugin-style-import'

export function configStyleImportPlugin() {
  return createStyleImportPlugin({
    resolves: [ElementPlusResolve()],
    libs: [
      {
        libraryName: 'element-plus',
        resolveStyle: name => `element-plus/theme-chalk/${name}.css`,
      },
    ],
  })
}
