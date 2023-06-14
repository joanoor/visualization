import { toggleClass } from '@nrzt/core'

/**
 * 更改项目色弱模式的状态
 * @param colorWeak
 */
export function updateColorWeak(colorWeak: boolean) {
  toggleClass(colorWeak, 'color-weak', document.documentElement)
}
