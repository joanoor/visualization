import type { ProjectConfig, ThemeType } from '@/types'
import { computed } from 'vue'
import { useAppStore } from '@/store'

type RootSetting = Omit<
  ProjectConfig,
  | 'locale'
  | 'headerSetting'
  | 'menuSetting'
  | 'multiTabsSetting'
  | 'transitionSetting'
>

export function useRootSetting() {
  const appStore = useAppStore()
  const getProjectName = computed(() => appStore.getProjectConfig.projectName)
  const getAppId = computed(() => appStore.getProjectConfig.appId)
  const getLoginOutUrl = computed(() => appStore.getProjectConfig.loginOutUrl)
  const getWhiteList = computed(() => appStore.getProjectConfig.whiteList)
  const getShowBreadCrumb = computed(() =>
    window.__MICRO_APP_BASE_APPLICATION__
      ? false
      : appStore.getProjectConfig.showBreadCrumb
  )
  const getShowBreadCrumbIcon = computed(
    () => appStore.getProjectConfig.showBreadCrumbIcon
  )
  const getShowFooter = computed(() =>
    window.__MICRO_APP_ENVIRONMENT__
      ? false
      : appStore.getProjectConfig.showFooter
  )
  const getShowShortCuts = computed(
    () => appStore.getProjectConfig.showShortCuts
  )
  const getShowThemeToggle = computed(
    () => appStore.getProjectConfig.showThemeToggle
  )
  const getShowBackToTop = computed(
    () => appStore.getProjectConfig.showBackToTop
  )
  const getTheme = computed(() => appStore.getTheme)
  const getGrayMode = computed(() => appStore.getProjectConfig.grayMode)
  const getColorWeak = computed(() => appStore.getProjectConfig.colorWeak)
  const getShowMenu = computed(() =>
    window.__MICRO_APP_ENVIRONMENT__
      ? false
      : appStore.getProjectConfig.showMenu
  )
  const getShowTopMenu = computed(() => appStore.getProjectConfig.showTopMenu)
  const getShowHeader = computed(() =>
    window.__MICRO_APP_ENVIRONMENT__
      ? false
      : appStore.getProjectConfig.showHeader
  )
  const getShowMultiTabs = computed(
    () => appStore.getProjectConfig.showMultiTabs
  )
  const getOpenKeepAlive = computed(
    () => appStore.getProjectConfig.openKeepAlive
  )
  const getUseErrorHandle = computed(
    () => appStore.getProjectConfig.useErrorHandle
  )

  const getCanEmbedIFramePage = computed(
    () => appStore.getProjectConfig.canEmbedIFramePage
  )

  const getPageLoading = computed(() => appStore.getPageLoading)

  const getFullContent = computed(() => appStore.getProjectConfig.fullContent)

  function setTheme(mode: ThemeType) {
    appStore.setTheme(mode)
  }

  function setRootSetting(setting: Partial<RootSetting>) {
    appStore.setProjectConfig(setting)
  }

  return {
    getProjectName,
    getAppId,
    getLoginOutUrl,
    getWhiteList,
    getShowBreadCrumb,
    getShowBreadCrumbIcon,
    getShowFooter,
    getShowShortCuts,
    getShowThemeToggle,
    getShowBackToTop,
    getTheme,
    getColorWeak,
    getGrayMode,
    getShowMenu,
    getShowTopMenu,
    getShowHeader,
    getShowMultiTabs,
    setRootSetting,
    setTheme,
    getFullContent,
    getPageLoading,
    getOpenKeepAlive,
    getCanEmbedIFramePage,
    getUseErrorHandle,
  }
}
