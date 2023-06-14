import { defineComponent } from 'vue'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'

// 组件类型
export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

// asyncRouters的类型
export interface AppAsyncRouteRecord
  extends Omit<RouteRecordRaw, 'meta' | 'path'> {
  name: string
  meta?: RouteMeta
  menuType: MenuType
  path?: string // 通过接口返回数据自动生成
}

export type MenuType = '0' | '1' | '2' | '3' // '0'表示菜单 '1' 表示按钮 '2' 表示筛选条件 '3' 表示目录
