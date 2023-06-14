/**
 * **********************系统配置相关**********************
 */
import type { RouteLocationNormalized } from 'vue-router'

// 网站主题类型
export type ThemeType = 'dark' | 'light'

export type MenuType = 'sidebar' | 'mix-sidebar' | 'mix' | 'top-menu'

export type MenuModeType =
  | 'vertical'
  | 'vertical-right'
  | 'horizontal'
  | 'inline'

export type TriggerType = 'none' | 'footer' | 'header'

// 路由切换动画
export type RouterTransitionType =
  | 'zoom-fade'
  | 'zoom-out'
  | 'fade-slide'
  | 'fade'
  | 'fade-bottom'
  | 'fade-scale'

export type MixSidebarTriggerType = 'hover' | 'click'

export type PermissionModeType = 'backend' | 'frontend'

/**
 * ******************************************************
 *                     页面多tabs行
 * ******************************************************
 */
export enum TabContentEnum {
  TAB_TYPE,
  EXTRA_TYPE,
}

export interface TabContentProps {
  tabItem: RouteLocationNormalized
  type?: TabContentEnum
  trigger?: 'click' | 'hover' | 'contextmenu'
}

export enum MenuEventEnum {
  REFRESH_PAGE,
  CLOSE_ALL,
  CLOSE_LEFT,
  CLOSE_RIGHT,
  CLOSE_OTHER,
  CLOSE_CURRENT,
  CLOSE,
}

/***************************系统配置***************************/

// 项目配置类型
export interface ProjectConfig {
  projectName: string
  appId: string
  loginOutUrl: string
  whiteList: string[]
  prefixCls: string
  showBreadCrumb: boolean
  showBreadCrumbIcon: boolean
  showFooter: boolean
  showShortCuts: boolean
  showThemeToggle: boolean
  showBackToTop: boolean
  theme: 'light' | 'dark'
  grayMode: boolean
  colorWeak: boolean
  showMenu: boolean
  showTopMenu: boolean
  showHeader: boolean
  showMultiTabs: boolean
  permissionMode: PermissionModeType
  // ==============
  permissionCacheType: '0' | '1'
  fullContent: boolean
  openKeepAlive: boolean
  useErrorHandle: boolean
  canEmbedIFramePage: boolean
  closeMessageOnSwitch: boolean
  removeAllHttpPending: boolean
  headerSetting: HeaderSetting
  menuSetting: MenuSetting
  multiTabsSetting: MultiTabsSetting
  transitionSetting: TransitionSetting
}

export interface HeaderSetting {
  bgColor: string
  borderColor: string
  headerHeight: number
  showFullScreen: boolean
  showNotice: boolean
  showSearch: boolean
  showThemeToggle: boolean
  showUser: boolean
}

export interface MenuSetting {
  menuWidth: number
  menuCollapsedWidth: number
  collapsed: boolean
  showCollapsed: boolean
  splitMenu: boolean
  bgColor: string
  fixed: boolean
  siderHidden: boolean
  canDrag: boolean
  hidden: boolean
  split: boolean
  mode: MenuModeType
  type: MenuType
  trigger: TriggerType
  closeMixSidebarOnChange: boolean
  mixSideTrigger: MixSidebarTriggerType
  accordion: boolean
  mixSideFixed: boolean
  topMenuAlign: 'start' | 'center' | 'end'
}

export interface MultiTabsSetting {
  cache: boolean
  canDrag: boolean
  showRedo: boolean
}

export interface TransitionSetting {
  enable: boolean
  openNProgress: boolean
  openPageLoading: boolean
  basicTransition: RouterTransitionType
}
