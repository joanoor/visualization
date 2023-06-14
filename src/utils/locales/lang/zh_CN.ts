import elementLocale from 'element-plus/lib/locale/lang/zh-cn'
import { genMessage } from '../helper'
import { autoImport } from '../../../utils'
// const modules = import.meta.globEager('./zh-CN/**/*.ts')
const modules = autoImport(
  import.meta.glob(['./zh_CN/**/*.ts'], {
    eager: true,
    // query: '?inline',
  })
)

export default {
  message: {
    ...genMessage(modules, 'zh_CN'),
    elementLocale,
  },
}
