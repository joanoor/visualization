import { defineStore } from 'pinia'
import { DictionaryStruct, DictType } from '@/types'
import { store } from '@/store'
import { fetchDictList } from '@/api/common'

interface GlobalStoreState {
  dicts: DictType
}

export const useGlobalStore = defineStore('app-globals', {
  state: (): GlobalStoreState => ({
    dicts: {} as DictType,
  }),
  getters: {},
  actions: {
    async getDicts() {
      const { result } = await fetchDictList()
      this.dicts = {
        ...result,
      }
    },

    addDicts(customDictionary: Record<string, DictionaryStruct[]>) {
      this.dicts = {
        ...this.dicts,
        ...customDictionary,
      }
    },
  },
})

/**
 * 通常情况下，我们在setup中使用，但是某些场景下，需要在setup之外使用，则可以采用下面的方式（传入store）
 * 参见：https://pinia.vuejs.org/zh/ssr/#using-the-store-outside-of-setup
 */
export function useGlobalStoreWithOut() {
  return useGlobalStore(store)
}
