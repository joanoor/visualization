/**
 * 1、加载env.config.js中的配置
 * 2、初始化多语言
 * 3、初始化页面主题dark还是light
 */
import type { ProjectConfig } from '@/types'
import {
  updateHeaderTheme,
  updateSideBarTheme,
  updateColorWeak,
  updateGrayMode,
  updateDarkTheme,
} from '@/logics/theme'
import { useAppStore, useLocaleStore } from '@/store'
import { Persistent } from '@/utils/cache'
import { deepmerge } from '@nrzt/core'
import { PROJ_CONF_KEY } from '@/settings/cacheSetting'

export async function initAppConfig() {
  const appStore = useAppStore()

  // const localeStore = useLocaleStore()

  let projCfg: ProjectConfig = Persistent.getLocal(
    PROJ_CONF_KEY
  ) as ProjectConfig
  projCfg = deepmerge(projCfg || {}, window.__NRZT_TEMPLATE__ || {}, {
    arrayMerge: (_destinationArray, sourceArray, _options) => sourceArray,
  })
  const theme = appStore.getTheme

  const {
    colorWeak, // 色弱
    grayMode, // 灰色模式
    headerSetting: { bgColor: headerBgColor } = {}, // 初始头部背景色
    menuSetting: { bgColor } = {}, // 初始菜单背景色
  } = projCfg

  try {
    grayMode && updateGrayMode(grayMode)
    colorWeak && updateColorWeak(colorWeak)
  } catch (error) {
    console.log(error)
  }

  appStore.setProjectConfig(projCfg)

  updateDarkTheme(theme)

  if (theme === 'dark') {
    // 暗黑模式
    updateHeaderTheme()
    updateSideBarTheme()
  } else {
    // 明亮模式
    headerBgColor && updateHeaderTheme(headerBgColor)
    bgColor && updateSideBarTheme(bgColor)
  }

  // 初始国际化
  // localeStore.initLocale()
}
