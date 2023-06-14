import type { App } from 'vue'
import { createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { createRouter } from 'vue-router'
import { WHITE_NAME_LIST, baseRoutes } from './baseRoutes'

export const routes: RouteRecordRaw[] = [...baseRoutes]

export const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function resetRouter() {
  router.getRoutes().forEach(route => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export function setupRouter(app: App<Element>) {
  app.use(router)
}
