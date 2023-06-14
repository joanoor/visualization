import { defineStore } from 'pinia'
import { store } from '@/store'
import { formatToDateTime } from '@nrzt/core'
import type { ErrorLogInfo } from '@/types'
import { ErrorTypeEnum } from '@/settings/exceptionSetting'

export interface ErrorLogState {
  errorLogInfoList: Nullable<ErrorLogInfo[]>
  errorLogListCount: number
}

export const useErrorLogStore = defineStore('app-error-log', {
  state: (): ErrorLogState => ({
    errorLogInfoList: null,
    errorLogListCount: 0,
  }),
  getters: {
    getErrorLogInfoList(): ErrorLogInfo[] {
      return this.errorLogInfoList || []
    },
    getErrorLogListCount(): number {
      return this.errorLogListCount
    },
  },
  actions: {
    addErrorLogInfo(info: ErrorLogInfo) {
      const item = {
        ...info,
        time: formatToDateTime(new Date()),
      }
      this.errorLogInfoList = [item, ...(this.errorLogInfoList || [])]
      this.errorLogListCount += 1
    },

    setErrorLogListCount(count: number): void {
      this.errorLogListCount = count
    },

    /**
     * Triggered after ajax request error
     * @param error
     * @returns
     */
    addAjaxErrorInfo(error: any) {
      const { getUseErrorHandle } = useRootSetting()
      if (!getUseErrorHandle) {
        return
      }
      const errInfo: Partial<ErrorLogInfo> = {
        message: error.message,
        type: ErrorTypeEnum.AJAX,
      }
      if (error.response) {
        const {
          config: {
            url = '',
            data: params = '',
            method = 'get',
            headers = {},
          } = {},
          data = {},
        } = error.response
        errInfo.url = url
        errInfo.name = 'Ajax Error!'
        errInfo.file = '-'
        errInfo.stack = JSON.stringify(data)
        errInfo.detail = JSON.stringify({ params, method, headers })
      }
      this.addErrorLogInfo(errInfo as ErrorLogInfo)
    },
  },
})

/**
 * 通常情况下，我们在setup中使用，但是某些场景下，需要在setup之外使用，则可以采用下面的方式（传入store）
 * 参见：https://pinia.vuejs.org/zh/ssr/#using-the-store-outside-of-setup
 */
export function useErrorLogStoreWithOut() {
  return useErrorLogStore(store)
}
