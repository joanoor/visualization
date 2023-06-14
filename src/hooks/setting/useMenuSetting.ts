import type { MenuSetting } from '@/types'
import { useAppStore } from '@/store'

const mixSideHasChildren = ref(false)

export function useMenuSetting() {
  const appStore = useAppStore()

  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth)
  const getMenuCollapsedWidth = computed(
    () => appStore.getMenuSetting.menuCollapsedWidth
  )
  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed)
  const getShowCollapsed = computed(() => appStore.getMenuSetting.showCollapsed)
  const getSplitMenu = computed(() => appStore.getMenuSetting.splitMenu)

  const getMenuType = computed(() => appStore.getMenuSetting.type)

  const getMenuMode = computed(() => appStore.getMenuSetting.mode)

  const getMenuFixed = computed(() => appStore.getMenuSetting.fixed)

  const getMenuHidden = computed(() => appStore.getMenuSetting.hidden)

  const getTrigger = computed(() => appStore.getMenuSetting.trigger)

  const getMenuTheme = computed(() => appStore.getMenuSetting.theme)

  const getSplit = computed(() => appStore.getMenuSetting.split)

  const getMenuBgColor = computed(() => appStore.getMenuSetting.bgColor)

  const getMixSideTrigger = computed(
    () => appStore.getMenuSetting.mixSideTrigger
  )

  const getCanDrag = computed(() => appStore.getMenuSetting.canDrag)

  const getAccordion = computed(() => appStore.getMenuSetting.accordion)

  const getShowTopMenu = computed(() => {
    return unref(getMenuMode) === 'horizontal' || unref(getSplit)
  })

  const getIsHorizontal = computed(() => {
    return unref(getMenuMode) === 'horizontal'
  })

  const getIsMixSidebar = computed(() => {
    return unref(getMenuType) === 'mix-sidebar'
  })

  const getIsMixMode = computed(() => {
    return unref(getMenuMode) === 'inline' && unref(getMenuType) === 'mix'
  })

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting })
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    })
  }
  return {
    getMenuWidth,
    getMenuCollapsedWidth,
    getCollapsed,
    getShowCollapsed,
    getSplitMenu,
    setMenuSetting,

    toggleCollapsed,

    getMenuFixed,
    getMenuType,
    getMenuMode,
    getTrigger,
    getSplit,
    getMenuTheme,
    getCanDrag,
    getIsHorizontal,
    getAccordion,
    getShowTopMenu,
    getMenuHidden,
    getMenuBgColor,
    getIsMixMode,
    getIsMixSidebar,
    getMixSideTrigger,
    mixSideHasChildren,
  }
}
