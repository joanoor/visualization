import { TOKEN_KEY } from '@/settings/cacheSetting'
import { Persistent, type BasicKeys } from '@/utils/cache'

const { permissionCacheType } = window.__NRZT_TEMPLATE__
const isLocal = permissionCacheType === '1'

export function getToken() {
  return getAuthCache(TOKEN_KEY)
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession
  return fn(key) as T
}

export function setAuthCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession
  return fn(key, value, true)
}

export function clearAuthCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession
  return fn(immediate)
}
