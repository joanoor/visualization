import { lighten, darken, setCssVar } from '@nrzt/core'
import { useAppStore } from '@/store'

const HEADER_BG_COLOR = '--header-bg-color'
const HEADER_BORDER_COLOR = '--header-border-color'
const HEADER_BG_HOVER_COLOR = '--header-bg-hover-color'
const HEADER_MENU_ACTIVE_BG_COLOR = '--header-active-menu-bg-color'

const SIDE_BG_COLOR = '--sider-bg-color'
const SIDER_DARK_DARKEN_BG_COLOR = '--sider-dark-darken-bg-color'
const SIDER_LIGHTEN_BG_COLOR = '--sider-dark-lighten-bg-color'

/**
 * 改变header的背景色
 * @param bgColor
 * @param bgColor
 */
export function updateHeaderTheme(bgColor?: string, borderColor?: string) {
  const appStore = useAppStore()
  const isDark = appStore.getTheme === 'dark'
  if (!bgColor) {
    if (isDark) {
      bgColor = '#151515'
    } else {
      bgColor = appStore.getHeaderSetting.bgColor
    }
  }
  if (!borderColor) {
    if (isDark) {
      borderColor = '#151515'
    } else {
      borderColor = appStore.getHeaderSetting.borderColor
    }
  }

  setCssVar(HEADER_BG_COLOR, bgColor)
  setCssVar(HEADER_BORDER_COLOR, borderColor)

  // hover color
  const hoverColor = lighten(bgColor!, 6)
  setCssVar(HEADER_BG_HOVER_COLOR, hoverColor)
  setCssVar(HEADER_MENU_ACTIVE_BG_COLOR, hoverColor)
}

/**
 * 改变菜单的背景色
 * @param color  bg color
 */
export function updateSideBarTheme(color?: string) {
  const appStore = useAppStore()

  // if (!isHexColor(color)) return;
  const isDark = appStore.getTheme === 'dark'
  if (!color) {
    if (isDark) {
      color = '#212121'
    } else {
      color = appStore.getMenuSetting.bgColor
    }
  }
  setCssVar(SIDE_BG_COLOR, color)
  setCssVar(SIDER_DARK_DARKEN_BG_COLOR, darken(color!, 6))
  setCssVar(SIDER_LIGHTEN_BG_COLOR, lighten(color!, 5))
}
