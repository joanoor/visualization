import elementLocale from 'element-plus/lib/locale/lang/en'
import { genMessage } from '../helper'
import { autoImport } from '../../../utils'

const modules = autoImport(import.meta.glob(['./en/**/*.ts'], { eager: true }))
export default {
  message: {
    ...genMessage(modules, 'en'),
    elementLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en',
}
