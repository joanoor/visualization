import { toggleClass } from '@nrzt/core'

/**
 * 更改项目灰色模式状态
 * @param gray
 */
export function updateGrayMode(gray: boolean) {
  toggleClass(gray, 'gray-mode', document.documentElement)
}
