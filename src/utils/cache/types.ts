import {
  TOKEN_KEY,
  USER_INFO_KEY,
  MULTIPLE_TABS_KEY,
  PROJ_CONF_KEY,
} from '@/settings/cacheSetting'
import type { RouteLocationNormalized } from 'vue-router'
import type { ProjectConfig, UserInfoStruct } from '@/types'

interface BasicStore {
  [TOKEN_KEY]: string | number | null | undefined
  [USER_INFO_KEY]: UserInfoStruct
  [MULTIPLE_TABS_KEY]: RouteLocationNormalized[]
  [PROJ_CONF_KEY]: ProjectConfig
  [x: string]: any
}

export type LocalStore = BasicStore
export type SessionStore = BasicStore

export type BasicKeys = keyof BasicStore
export type LocalKeys = keyof LocalStore
export type SessionKeys = keyof SessionStore
