import type { App } from 'vue'
import { createPinia } from 'pinia'

export const store = createPinia()
export function setupStore(app: App<Element>) {
  app.use(store)
}
export * from './modules/app'
export * from './modules/errorLog'
export * from './modules/global'
export * from './modules/locale'
export * from './modules/multipleTab'
export * from './modules/permission'
export * from './modules/user'
