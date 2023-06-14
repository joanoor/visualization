import type { TransitionSetting } from '@/types'

import { computed } from 'vue'

import { useAppStore } from '@/store/modules/app'

export function useTransitionSetting() {
  const appStore = useAppStore()

  const getEnableTransition = computed(
    () => appStore.getTransitionSetting?.enable
  )
  const getOpenNProgress = computed(
    () => appStore.getTransitionSetting?.openNProgress
  )
  const getOpenPageLoading = computed((): boolean => {
    return !!appStore.getTransitionSetting?.openPageLoading
  })
  const getBasicTransition = computed(
    () => appStore.getTransitionSetting?.basicTransition
  )

  const setTransitionSetting = (
    transitionSetting: Partial<TransitionSetting>
  ) => {
    appStore.setProjectConfig({ transitionSetting })
  }
  return {
    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
    setTransitionSetting,
  }
}
