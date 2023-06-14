import { Result, UserInfoStruct } from '@/types'
import { Persistent } from '@/utils/cache'
import { http } from '@/utils/http'
import { defineStore } from 'pinia'
import { store, useAppStore } from '@/store'

interface UserStoreStruct {
  userInfo: UserInfoStruct
  token: string
  defaultRoute: string
}

export const useUserStore = defineStore('app-user', {
  state: (): UserStoreStruct => ({
    userInfo: {} as UserInfoStruct,
    token: '',
    defaultRoute: '/overview',
  }),
  getters: {},
  actions: {
    // 获取用户信息
    async getUserInfo() {
      const res = await http.get<Result<UserInfoStruct>>({
        url: `/sso/user/info`,
      })
      this.userInfo = res.result
    },

    loginOutByUser() {
      const useApp = useAppStore()
      http
        .post({
          url: `/sso/logout`,
        })
        .then(() => {
          Persistent.clearAll(true)
          location.href = useApp.getProjectConfig.loginOutUrl
        })
    },
  },
})

/**
 * 通常情况下，我们在setup中使用，但是某些场景下，需要在setup之外使用，则可以采用下面的方式（传入store）
 * 参见：https://pinia.vuejs.org/zh/ssr/#using-the-store-outside-of-setup
 */
export function useUserStoreWithOut() {
  return useUserStore(store)
}
