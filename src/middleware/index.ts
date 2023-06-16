import { Router } from 'vue-router'
import {
  useAppStore,
  useAppStoreWithOut,
  useGlobalStore,
  usePermissionStore,
} from '@/store'
import { isEmpty } from '@nrzt/core'
import { Persistent } from '@utils/cache'
import { setRouteChange } from '@/logics/mitt/routeChange'
import { TOKEN_KEY } from '@/settings/cacheSetting'
import { fetchMenuList } from '@/api/common'
import { asyncRoutes } from '@/router/asyncRoutes'
import frontRoutes from '@/router/frontRoutes'
import { menuList as frontMenuList } from '@/settings/menuSetting'

window.NProgress.configure({
  showSpinner: false,
})

export function setupRouterGuard(router: Router) {
  if (router) {
    // 以下调用顺序不要发生变化
    createAuthRedirectGuard(router)
    createPageGuard(router)
    createPageLoadingGuard(router)
    createPermissionGuard(router)
    createProgressGuard(router)
  }
}

// auth跳转
function createAuthRedirectGuard(router: Router) {
  router.beforeEach(async to => {
    console.log('createAuthRedirectGuard beforeEach')
    // 如何query中含有ticket
    if (to.query['ticket']) {
      Persistent.setLocal(TOKEN_KEY, to.query['ticket'] as string)
      Reflect.deleteProperty(to.query, 'ticket')
      await router.replace({
        query: {
          ...to.query,
        },
      })
    }

    return true
  })
}

/**
 * Hooks for handling page state
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>()

  router.beforeEach(async to => {
    console.log('createPageGuard beforeEach')
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    to.meta.loaded = !!loadedPageMap.get(to.path)
    // Notify routing changes
    setRouteChange(to)

    return true
  })

  router.afterEach(to => {
    loadedPageMap.set(to.path, true)
  })
}

// Used to handle page loading status
function createPageLoadingGuard(router: Router) {
  const appStore = useAppStoreWithOut()
  const { getOpenPageLoading } = useTransitionSetting()
  router.beforeEach(async to => {
    console.log('createPageLoadingGuard beforeEach')
    if (unref(getOpenPageLoading)) {
      appStore.setPageLoadingAction(true)
      return true
    }

    return true
  })
  router.afterEach(async () => {
    if (unref(getOpenPageLoading)) {
      // TODO Looking for a better way
      // The timer simulates the loading time to prevent flashing too fast,
      setTimeout(() => {
        appStore.setPageLoading(false)
      }, 220)
    }
    return true
  })
}

function createPermissionGuard(router: Router) {
  router.beforeEach(async to => {
    const appStore = useAppStore()
    const permissionStore = usePermissionStore()
    const { getRoutes, getFrontRoutes, setFrontMenuList } = permissionStore
    if (isEmpty(permissionStore.menuList)) {
      if (appStore.projectConfig?.permissionMode === 'backend') {
        const { result } = await fetchMenuList()
        getRoutes(asyncRoutes, result)
      } else {
        getFrontRoutes(frontRoutes)
        setFrontMenuList(frontMenuList)
      }
      return {
        path: to.path,
        query: to.query,
      }
    } else {
      return true
    }
  })

  router.afterEach(async () => {})
}

function createProgressGuard(router: Router) {
  const { getOpenNProgress } = useTransitionSetting()
  router.beforeEach(async to => {
    console.log('createProgressGuard beforeEach')
    unref(getOpenNProgress) && window.NProgress.start()
    return true
  })

  router.afterEach(async () => {
    unref(getOpenNProgress) && window.NProgress.done()
    return true
  })
}
