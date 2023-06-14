import '@unocss/reset/normalize.css'
import 'uno.css'
import { autoImport } from '@/utils'

export function setupStyles() {
  autoImport(
    import.meta.glob(['./**/*', '!./modules/**/*'], {
      eager: true,
      // query: '?inline',
    })
  )
}
