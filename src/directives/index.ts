import type { App } from 'vue'
// import { setupPermissionDirective } from './dragbar';
// import { setupLoadingDirective } from './loading';

export function setupGlobDirectives(app: App) {
  // setupPermissionDirective(app);
  // setupLoadingDirective(app);
  app.directive('number', el => {
    if (el.tagName.toLowerCase() !== 'input') {
      el = el.getElementsByTagName('input')[0]
    }
    el.value = el.value.replace(/[^\d]/g, '')
  })
}
