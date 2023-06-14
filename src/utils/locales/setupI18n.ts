import { createI18n, I18nOptions } from 'vue-i18n'
import { useLocaleStoreWithOut } from '../../store'
import { setHtmlPageLang, setLoadLocalePool } from './helper'
import { localeSetting } from '../../settings/localeSetting'
import { App } from 'vue'

const { fallback, availableLocales } = localeSetting

export let i18n: ReturnType<typeof createI18n>

/**
 * 创建i18的配置选项
 *
 * https://vue-i18n.intlify.dev/guide/migration/vue3.html
 * @returns
 */
async function createI18nOptions(): Promise<I18nOptions> {
  const localeStore = useLocaleStoreWithOut()
  const locale = localeStore.getLocale || 'zh_CN'
  const defaultLocal = await import(`./lang/${locale}.ts`)
  const message = defaultLocal.default?.message ?? {}

  setHtmlPageLang(locale)
  setLoadLocalePool(loadLocalePool => {
    loadLocalePool.push(locale)
  })

  return {
    legacy: false, // false表示使用组合式，true表示使用选项式
    locale,
    allowComposition: true, // you need to specify that!
    messages: {
      [locale]: message,
    },
    fallbackLocale: fallback,
    availableLocales: availableLocales,
    sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  }
}

export default async function (app: App) {
  i18n = createI18n(await createI18nOptions())
  app.use(i18n)
}
