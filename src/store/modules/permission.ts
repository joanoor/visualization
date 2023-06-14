import { defineStore } from 'pinia'
import {
  sortTreeData,
  listToTree,
  cloneDeep,
  isNull,
  isNullOrUnDef,
} from '@nrzt/core'
import { router } from '@/router'
import type { AppAsyncRouteRecord } from '@/router/types'
import type { ResultMenuStruct } from '@/types'
import { LAYOUT } from '@/router/constant'
import { RouteRecordRaw } from 'vue-router'
import { Menu } from '@/settings/menuSetting'

// 递归生成路由
const getRoutePath = (
  menus: ResultMenuStruct[], // 后端返回的非树形数组
  menuId: string | number,
  path = ''
) => {
  const item = menus.find(v => v.menuId === menuId)
  if (item) {
    path = item.perms + path
    return isNullOrUnDef(item.parentId)
      ? getRoutePath(menus, item.parentId, path)
      : getRoutePath(menus, item.parentId, '/' + path)
  }
  return path
}

// 递归生成面包屑
const getRouteBreadList = (
  menus: ResultMenuStruct[], // 后端返回的非树形数组
  myAsyncRoutes: AppAsyncRouteRecord[], // 本地定义的非树形anyncRoutes
  menuId: string | number,
  bread: Bread[] = []
) => {
  const item = menus.find(v => v.menuId === menuId)
  const tmpAsyncRoute = myAsyncRoutes.find(v => v.name === item?.perms)
  if (item && tmpAsyncRoute) {
    bread.unshift({
      name: item.menuName,
      path: tmpAsyncRoute.menuType === '3' ? '' : tmpAsyncRoute.path,
    })
    return getRouteBreadList(menus, myAsyncRoutes, item.parentId, bread)
  }
  return bread
}

/**
 * 根据不同的登录用户，动态生成不同的路由
 */
export const usePermissionStore = defineStore('app-permission', {
  state: () => ({
    menuList: [] as ResultMenuStruct[],
    defaultRouter: '/',
  }),
  getters: {},
  actions: {
    async getRoutes(
      asyncRoutes: AppAsyncRouteRecord[],
      result?: ResultMenuStruct[]
    ) {
      if (!result || result.length === 0) {
        return false
      }
      const tmpArr1 = isNull(result[0].parentId) ? result.slice(1) : result

      const myAsyncRoutes = cloneDeep(asyncRoutes) as AppAsyncRouteRecord[]
      const resultRoutes: any[] = []

      // 第一次循环，用于动态生成路由
      tmpArr1.forEach(v => {
        const tmpAsyncRoute = myAsyncRoutes.find(
          v2 => v2.name === v.perms && v.menuType !== '1' && v.menuType !== '2' // 过滤出菜单和目录
        )
        if (tmpAsyncRoute) {
          // 根据目录和菜单生成path
          tmpAsyncRoute.path = getRoutePath(tmpArr1, v.menuId)

          if (!tmpAsyncRoute.meta) {
            tmpAsyncRoute.meta = {}
          }
          tmpAsyncRoute.meta.title =
            tmpAsyncRoute.meta.title || v.menuName || ''

          // 生成activeMenu，用于下钻页面的菜单高亮
          const tmpParentMenu = tmpArr1.find(v2 => v2.menuId === v.parentId)
          if (tmpParentMenu && tmpParentMenu.menuType === '0') {
            tmpAsyncRoute.meta.activeMenu = tmpParentMenu.perms
          }
        }
      })

      // 第二次循环，用于动态生成面包屑
      tmpArr1.forEach(v => {
        const tmpAsyncRoute = myAsyncRoutes.find(
          v2 => v2.name === v.perms && v.menuType !== '1' && v.menuType !== '2'
        )
        if (tmpAsyncRoute) {
          if (!tmpAsyncRoute.meta) {
            tmpAsyncRoute.meta = {}
          }
          tmpAsyncRoute.meta.breadList = getRouteBreadList(
            tmpArr1,
            myAsyncRoutes,
            v.menuId,
            []
          )
          resultRoutes.push(tmpAsyncRoute)
        }
      })

      const dynamicRoutes = resultRoutes.filter(v => v.menuType === '0') // 因为目录不会有path，所以这一步过滤目录,只保留菜单

      const tmpRoutes = {
        component: LAYOUT,
        path: '/',
        children: [...dynamicRoutes],
      }
      console.log('查看生成的系统路由===>', tmpRoutes)

      this.setBackMenuList(tmpArr1, myAsyncRoutes)

      // 设置第一条路由为默认路由
      this.setDefaultRoute(dynamicRoutes[0]['path'])

      // 添加到路由表中
      router?.addRoute(tmpRoutes as any)
      return true
    },

    /**
     * 根据不同的登录用户，动态生成不同的菜单
     */
    setBackMenuList(
      menus: ResultMenuStruct[],
      myAsyncRoutes: AppAsyncRouteRecord[]
    ) {
      const tmpMenus = menus.filter(v => v.visibility === '0')
      tmpMenus.forEach(v => {
        const tmpAsyncRoute = myAsyncRoutes.find(v2 => v2.name === v.perms)
        if (tmpAsyncRoute) {
          if (!tmpAsyncRoute.meta) {
            tmpAsyncRoute.meta = {}
          }
          v.icon = tmpAsyncRoute.meta.icon || v.icon || ''
          v.path = tmpAsyncRoute.path || ''
        }
      })
      // 生成左侧树形菜单
      const tmp = listToTree(tmpMenus, {
        id: 'menuId',
        pid: 'parentId',
      })

      // 对菜单进行排序
      this.menuList = sortTreeData(tmp, (a, b) => a.viewOrder - b.viewOrder)
      console.log('查看生成的系统菜单===>', this.menuList)
    },

    /**
     * 设置默认路由
     */
    setDefaultRoute(defaultRoute: string) {
      this.defaultRouter = defaultRoute
    },

    getFrontRoutes(routes: RouteRecordRaw) {
      router?.addRoute(routes)
      // 添加了路由
      console.log('添加了路由', router?.getRoutes())
    },

    setFrontMenuList(result: Menu[]) {
      this.menuList = result as ResultMenuStruct[]
    },
  },
})
