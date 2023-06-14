import { toRaw } from 'vue'
import { pick, omit } from '@nrzt/core'
import {
  createLocalStorage,
  createSessionStorage,
  Memory,
  DEFAULT_CACHE_TIME,
} from '@nrzt/cache'
import {
  TOKEN_KEY,
  USER_INFO_KEY,
  APP_LOCAL_CACHE_KEY,
  APP_SESSION_CACHE_KEY,
} from '@/settings/cacheSetting'
import type { LocalKeys, LocalStore, SessionKeys, SessionStore } from './types'
import { isDevMode } from '../env'

/**
 * 定义了两种类型的存储方式，一种需要加密的ls和ss，另一种是不需要加密的memory。这样做是为了优化获取数据的速度
 */

// 存储到localStorage或者sessionStorage
const ls = createLocalStorage({ hasEncrypt: !isDevMode() })
const ss = createSessionStorage({ hasEncrypt: !isDevMode() })

// 存储到Memory中
const localMemory = new Memory(DEFAULT_CACHE_TIME)
const sessionMemory = new Memory(DEFAULT_CACHE_TIME)

// 从localStorage和sessionStorage中拿到数据，重置memory中的缓存
function initPersistentMemory() {
  const localCache = ls.get(APP_LOCAL_CACHE_KEY)
  const sessionCache = ss.get(APP_SESSION_CACHE_KEY)
  localCache && localMemory.resetCache(localCache)
  sessionCache && sessionMemory.resetCache(sessionCache)
}

export class Persistent {
  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as Nullable<T>
  }

  static setLocal(
    key: LocalKeys,
    value: LocalStore[LocalKeys],
    immediate = false
  ): void {
    localMemory.set(key, toRaw(value))
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache)
  }

  static removeLocal(key: LocalKeys, immediate = false): void {
    localMemory.remove(key)
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache)
  }

  static clearLocal(immediate = false): void {
    localMemory.clear()
    immediate && ls.clear()
  }

  static getSession<T>(key: SessionKeys) {
    return sessionMemory.get(key)?.value as Nullable<T>
  }

  static setSession(
    key: SessionKeys,
    value: SessionStore[SessionKeys],
    immediate = false
  ): void {
    sessionMemory.set(key, toRaw(value))
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache)
  }

  static removeSession(key: SessionKeys, immediate = false): void {
    sessionMemory.remove(key)
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache)
  }
  static clearSession(immediate = false): void {
    sessionMemory.clear()
    immediate && ss.clear()
  }

  static clearAll(immediate = false) {
    sessionMemory.clear()
    localMemory.clear()
    if (immediate) {
      ls.clear()
      ss.clear()
    }
  }
}

// 当浏览器窗口关闭或者刷新时，会触发 beforeunload 事件。
window.addEventListener('beforeunload', function () {
  // TOKEN_KEY 在登录或注销时已经写入到storage了，此处为了解决同时打开多个窗口时token不同步的问题
  ls.set(APP_LOCAL_CACHE_KEY, {
    ...localMemory.getCache,
    ...pick(ls.get(APP_LOCAL_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY]),
  })
  ss.set(APP_SESSION_CACHE_KEY, {
    ...sessionMemory.getCache,
    ...pick(ss.get(APP_SESSION_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY]),
  })
})

function storageChange(e: StorageEvent) {
  const { key, newValue, oldValue } = e
  if (!key) {
    Persistent.clearAll()
    return
  }
  if (!!newValue && !!oldValue) {
    if (APP_LOCAL_CACHE_KEY === key) {
      Persistent.clearLocal()
    }
    if (APP_SESSION_CACHE_KEY === key) {
      Persistent.clearSession()
    }
  }
}

// 事件在同一个域下的不同页面之间触发，即在 A 页面注册了 storge 的监听处理，只有在跟 A 同域名下的 B 页面操作 storage 对象，A 页面才会被触发 storage 事件
window.addEventListener('storage', storageChange)

initPersistentMemory()
