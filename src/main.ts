import { createApp } from 'vue'
import App from './App.vue'
import { router, setupRouter } from './router' // 路由
import { setupRouterGuard } from './middleware' // 路由导航守卫
import { setupStyles } from './styles' // 样式
import { setupStore } from './store' // pinia
import { registerGlobComp } from './components'
import { setupGlobDirectives } from './directives'
import { initAppConfig } from './logics/initAppConfig'
import { setupErrorHandle } from './logics/error-handler' // 错误处理

const app = createApp(App)

// 仿nest.js启动
function bootstrap() {
  // 载入store
  setupStore(app)

  // 初始化系统设置
  initAppConfig()

  // 注册全局组件
  registerGlobComp(app)

  // 配置路由
  setupRouter(app)

  // 路由导航守卫
  setupRouterGuard(router)

  // 注册全局指令
  setupGlobDirectives(app)

  // 样式
  setupStyles()

  // 全局错误处理
  setupErrorHandle(app)

  app.mount('#app')
}

bootstrap()

if (window.__MICRO_APP_ENVIRONMENT__) {
  window.unmount = () => {
    app.unmount()
  }
}
