import type { LocaleType } from '../../types'
import { set } from '@nrzt/core'

export const loadLocalePool: LocaleType[] = []

export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale)
}

export function setLoadLocalePool(cb: (loadLocalePool: LocaleType[]) => void) {
  cb(loadLocalePool)
}

export function genMessage(langs: Record<string, Recordable>, prefix = 'lang') {
  const obj: Recordable = {}
  Object.keys(langs).forEach(key => {
    const langFileModule = langs[key].default
    const fileName = key.replace(`${prefix}/`, '')
    const keyList = fileName.split('/')
    const moduleName = keyList.shift()
    const objKey = keyList.join('.')

    if (moduleName) {
      if (objKey) {
        set(obj, moduleName, obj[moduleName] || {})
        set(obj[moduleName], objKey, langFileModule)
      } else {
        set(obj, moduleName, langFileModule || {})
      }
    }
  })
  return obj
}
