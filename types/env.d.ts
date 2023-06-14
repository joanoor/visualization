/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />
import { ProjectConfig } from '../src/types/config'

import type {
  VNodeChild,
  ComponentPublicInstance,
  FunctionalComponent,
  ComponentCustomProps,
  PropType as VuePropType,
} from 'vue'

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>
}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    // 是可选的
    icon?: string
    // 每个路由都必须声明
    title?: string
    breadList?: Bread[]
  }
}

declare global {
  interface Bread {
    name: string
    path?: string
  }

  interface Window {
    unmount: Fn
    __MICRO_APP_NAME__: string
    __MICRO_APP_ENVIRONMENT__: boolean
    __MICRO_APP_BASE_APPLICATION__: boolean
    NProgress: typeof import('nprogress')
    dayjs: typeof import('dayjs')
    readonly __NRZT_TEMPLATE__: ProjectConfig
  }

  // VITE环境配置
  interface ViteEnv {
    VITE_PORT: number
    VITE_USE_MOCK: boolean
    VITE_PUBLIC_PATH: string
    VITE_PROXY: [string, string][]
    VITE_DROP_CONSOLE: boolean
    VITE_BUILD_COMPRESS: 'gzip' | 'brotliCompress' | 'deflate' | 'deflateRaw'
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
    VITE_LEGACY: boolean
  }
}

declare interface ImportMetaEnv extends ViteEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_BASEAPI_DEV: string
  readonly VITE_APP_BASEAPI_PROD: string
  // 更多环境变量...
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
