import { colorIsDark, lighten, darken, setCssVar } from '@nrzt/core'
import { useAppStore } from '@/store'

const HEADER_BG_COLOR_VAR = '--header-bg-color'
const HEADER_BG_HOVER_COLOR_VAR = '--header-bg-hover-color'
const HEADER_MENU_ACTIVE_BG_COLOR_VAR = '--header-active-menu-bg-color'

const SIDER_DARK_BG_COLOR = '--sider-dark-bg-color'
const SIDER_DARK_DARKEN_BG_COLOR = '--sider-dark-darken-bg-color'
const SIDER_LIGHTEN_BG_COLOR = '--sider-dark-lighten-bg-color'

/**
 * 改变header的背景色
 * @param color
 */
export function updateHeaderBgColor(color?: string) {
  const appStore = useAppStore()
  const darkMode = appStore.getDarkMode === 'dark'
  if (!color) {
    if (darkMode) {
      color = '#151515'
    } else {
      color = appStore.getHeaderSetting.bgColor
    }
  }
  // bg color
  setCssVar(HEADER_BG_COLOR_VAR, color)

  // hover color
  const hoverColor = lighten(color!, 6)
  setCssVar(HEADER_BG_HOVER_COLOR_VAR, hoverColor)
  setCssVar(HEADER_MENU_ACTIVE_BG_COLOR_VAR, hoverColor)

  // Determine the depth of the color value and automatically switch the theme
  const isDark = colorIsDark(color!)

  appStore.setProjectConfig({
    headerSetting: {
      theme: isDark || darkMode ? 'dark' : 'light',
    },
  })
}

/**
 * 改变左侧菜单的背景色
 * @param color  bg color
 */
export function updateSidebarBgColor(color?: string) {
  const appStore = useAppStore()

  // if (!isHexColor(color)) return;
  const darkMode = appStore.getDarkMode === 'dark'
  if (!color) {
    if (darkMode) {
      color = '#212121'
    } else {
      color = appStore.getMenuSetting.bgColor
    }
  }
  setCssVar(SIDER_DARK_BG_COLOR, color)
  setCssVar(SIDER_DARK_DARKEN_BG_COLOR, darken(color!, 6))
  setCssVar(SIDER_LIGHTEN_BG_COLOR, lighten(color!, 5))

  // only #ffffff is light
  // Only when the background color is #fff, the theme of the menu will be changed to light
  const isLight = ['#fff', '#ffffff'].includes(color!.toLowerCase())

  appStore.setProjectConfig({
    menuSetting: {
      theme: isLight && !darkMode ? 'light' : 'dark',
    },
  })
}
