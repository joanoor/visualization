import type { MultiTabsSetting } from '@/types'
import { useAppStore } from '@/store'
export function useMultipleTabSetting() {
  const appStore = useAppStore()

  const getCanDrag = computed(() => appStore.getMultiTabsSetting.canDrag)
  const getShowRedo = computed(() => appStore.getMultiTabsSetting.showRedo)

  function setMultipleTabSetting(multiTabsSetting: Partial<MultiTabsSetting>) {
    appStore.setProjectConfig({ multiTabsSetting })
  }
  return {
    getCanDrag,
    getShowRedo,
    setMultipleTabSetting,
  }
}
