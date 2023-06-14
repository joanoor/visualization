import type { App } from 'vue'
import SvgIcon from '~virtual/svg-component'
// import { PageWrapper } from './Page'

export function registerGlobComp(app: App) {
  app.component(SvgIcon.name, SvgIcon)
  // app.component(PageWrapper.name || 'Layout', PageWrapper)
  // app.use(Input).use(Button).use(Layout).use(VXETable);
}
