/**
 * unocss的配置文件，文件名也可以是uno.config.js, unocss.config.js, vite.config.js, svelte.config.js, astro.config.js, iles.config.js or nuxt.config.js (or .ts)
 *
 * 如果这里进行了配置，则无需在vite插件中在进行配置，只需要引入插件即可。参见：https://juejin.cn/post/7142466784971456548
 */
import {
  presetUno,
  presetIcons,
  presetAttributify,
  defineConfig,
  UserConfig,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  theme: {
    colors: {
      primary: 'var(--el-color-primary)',
      dark_bg: 'var(--dark-bg)',
    },
  },
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['f-c-c', 'flex justify-center items-center'],
    ['fcol-c-c', 'flex justify-center items-center'],
    ['flex-col', 'flex flex-col'],
    ['text-ellipsis', 'truncate'],
    [
      'icon-btn',
      'text-16 inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-primary !outline-none',
    ],
    ['heavy', 'text-size-3.5 font-500 leading-5.5 h-5.5'],
    ['heavier', 'text-size-5.5 font-500 leading-6.5 h-6.5'],
    ['heaviest', 'text-size-5 font-600 leading-7'],
    ['light', 'text-size-3 leading-5 h-5 text-#4E5969'],
    ['lighter', 'text-size-3 leading-5 h-5 text-#86909C'],
    ['box', 'p-4 border-1 rounded-1 border-solid'],
    [
      'tag',
      'px-2 py-0 inline-block rounded-0.5 border-solid leading-5.5 h-5.5',
    ],
    [
      'border-b',
      'border-solid py-0 inline-block rounded-0.5 border-solid leading-5.5 h-5.5',
    ],
    ['btn-danger', 'bg-#f53f3f! border-#f53f3f! color-white!'],
    ['btn-info', 'bg-#F2F3F5! border-#F2F3F5! color-#4E5969!'],
    ['normal-title', 'text-size-4 h-6 leading-6 font-bold color-#1D2129'],
    ['tag-warning', 'bg-#FFF7E8! color-#FF7D00! border-unset!'],
    ['tag-default', 'bg-#F2F3F5! color-#1D2129! border-unset!'],
    ['tag-primary', 'bg-#E8F3FF! color-primary! border-unset!'],
    ['tag-success', 'bg-#E8FFEA! color-#00B42A! border-unset!'],
  ],
  rules: [
    [/^bc-(.+)$/, ([, color]) => ({ 'border-color': `${color}` })],
    [
      /^circle-(\d+)$/,
      ([, d]) => ({
        width: `${(d as unknown as number) / 4}rem`,
        height: `${(d as unknown as number) / 4}rem`,
        'border-radius': '50%',
      }),
    ],
    [
      'numeric',
      {
        'font-family': 'Roboto, Roboto-Bold',
      },
    ],
    [
      'min-h-full-sweet',
      {
        'min-height': 'calc(100% - 128px)',
      },
    ],
  ],

  variants: [
    {
      match: s => {
        if (s.startsWith('i-')) {
          return {
            matcher: s,
            selector: s => {
              return s.startsWith('.') ? `${s.slice(1)},${s}` : s
            },
          }
        }
      },
    },
  ],
} as UserConfig)
