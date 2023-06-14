import type { RouteLocationRaw, Router } from 'vue-router'
import { REDIRECT_NAME, PageEnum } from '@/router/constant'
import { usePermissionStore } from '@/store'

export type PathAsPageEnum<T> = T extends { path: string }
  ? T & { path: PageEnum }
  : T
export type RouteLocationRawEx = PathAsPageEnum<RouteLocationRaw>

/**
 * 切换页面
 */
export const useGo = (_router?: Router) => {
  const permissionStore = usePermissionStore()
  const { push, replace } = _router || useRouter()
  const go = (
    opt: RouteLocationRawEx = permissionStore.defaultRouter,
    isReplace = false
  ) => {
    if (!opt) {
      return
    }
    isReplace
      ? replace(opt).catch(console.error)
      : push(opt).catch(console.error)
  }
  return go
}

/**
 * 刷新当前页面
 */
export const useRedo = (_router?: Router) => {
  const {
    replace,
    currentRoute,
    options: { routes },
  } = _router || useRouter()
  const { query, params = {}, name, fullPath } = unref(currentRoute.value)
  const redo = (): Promise<boolean> => {
    return new Promise(resolve => {
      if (name === REDIRECT_NAME) {
        resolve(false)
        return
      }
      console.log('怎么不到这么', routes, REDIRECT_NAME, params, query)
      if (name && Object.keys(params).length > 0) {
        params['_origin_params'] = JSON.stringify(params ?? {})
        params['_redirect_type'] = 'name'
        params['path'] = String(name)
      } else {
        params['_origin_params'] = JSON.stringify({})
        params['_redirect_type'] = 'path'
        params['path'] = fullPath
      }
      replace({ name: REDIRECT_NAME, params, query }).then(() => resolve(true))
    })
  }
  return redo
}
