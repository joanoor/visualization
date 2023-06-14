import { defineStore } from 'pinia'
import { store } from '@/store'
import type { LocaleSetting, LocaleType } from '@/types'
import { createLocalStorage } from '@nrzt/cache'
import { localeSetting } from '@/settings/localeSetting'
import { LOCALE_KEY } from '@/settings/cacheSetting'

const ls = createLocalStorage({
  hasEncrypt: false,
})

const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting

interface LocaleState {
  localInfo: LocaleSetting
}

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): LocaleState => ({
    localInfo: lsLocaleSetting,
  }),
  getters: {
    getShowPicker(state): boolean {
      return !!state.localInfo?.showPicker
    },
    getLocale(state): LocaleType {
      return state.localInfo?.locale ?? 'zh_CN'
    },
  },
  actions: {
    /**
     * 设置多语言信息和缓存
     * @param info multilingual info
     */
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info }
      ls.set(LOCALE_KEY, this.localInfo)
    },

    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localInfo,
      })
    },
  },
})

/**
 * 通常情况下，我们在setup中使用，但是某些场景下，需要在setup之外使用，则可以采用下面的方式（传入store）
 * 参见：https://pinia.vuejs.org/zh/ssr/#using-the-store-outside-of-setup
 */
export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
