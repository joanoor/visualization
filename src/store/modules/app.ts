import { defineStore } from 'pinia'
import { store } from '@/store'
import { resetRouter } from '@/router'
import {
  HeaderSetting,
  MenuSetting,
  MultiTabsSetting,
  ProjectConfig,
  ThemeType,
  TransitionSetting,
} from '@/types'
import { Persistent } from '@/utils/cache'
import { deepmerge } from '@nrzt/core'
import { PROJ_CONF_KEY, APP_THEME_KEY } from '@/settings/cacheSetting'

interface AppState {
  theme?: ThemeType
  pageLoading: boolean
  projectConfig: ProjectConfig | null
}
let timeId: TimeoutHandle

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    theme: undefined,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CONF_KEY),
  }),
  getters: {
    getPageLoading(state): boolean {
      return state.pageLoading
    },
    getTheme(state): ThemeType {
      return (
        state.theme ||
        Persistent.getLocal(APP_THEME_KEY) ||
        window.__NRZT_TEMPLATE__.theme
      )
    },
    getProjectConfig(state): ProjectConfig {
      return state.projectConfig || ({} as ProjectConfig)
    },
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting || {}
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting || {}
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting || {}
    },
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting || {}
    },
  },
  actions: {
    setPageLoading(loading: boolean) {
      this.pageLoading = loading
    },
    setTheme(mode: ThemeType) {
      this.theme = mode
      // localStorage.setItem(APP_THEME_KEY, mode)
      Persistent.setLocal(APP_THEME_KEY, mode)
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>) {
      this.projectConfig = deepmerge(this.projectConfig || {}, config, {
        arrayMerge: (_destinationArray, sourceArray, _options) => sourceArray,
      }) as any

      Persistent.setLocal(PROJ_CONF_KEY, this.projectConfig)
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId)
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading)
        }, 50)
      } else {
        this.setPageLoading(loading)
        clearTimeout(timeId)
      }
    },
    async resetAllState() {
      resetRouter()
      Persistent.clearAll()
    },
  },
})

/**
 * 通常情况下，我们在setup中使用，但是某些场景下，需要在setup之外使用，则可以采用下面的方式（传入store）
 * 参见：https://pinia.vuejs.org/zh/ssr/#using-the-store-outside-of-setup
 */
export function useAppStoreWithOut() {
  return useAppStore(store)
}
