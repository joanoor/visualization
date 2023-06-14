import { useAppStore } from '@/store'

export function useHeaderSetting() {
  const appStore = useAppStore()

  const getHeaderBgColor = computed(() => appStore.getHeaderSetting.bgColor)
  const getHeaderBorderColor = computed(
    () => appStore.getHeaderSetting.borderColor
  )
  const getHeaderHeight = computed(() => appStore.getHeaderSetting.headerHeight)
  const getShowFullScreen = computed(
    () => appStore.getHeaderSetting.showFullScreen
  )
  const getShowNotice = computed(() => appStore.getHeaderSetting.showNotice)
  const getShowSearch = computed(() => appStore.getHeaderSetting.showSearch)
  const getShowThemeToggle = computed(
    () => appStore.getHeaderSetting.showThemeToggle
  )
  const getShowUser = computed(() => appStore.getHeaderSetting.showUser)

  return {
    getHeaderBgColor,
    getHeaderBorderColor,
    getHeaderHeight,
    getShowFullScreen,
    getShowNotice,
    getShowSearch,
    getShowThemeToggle,
    getShowUser,
  }
}
