/**
 * **********************自定义组件相关类型**********************
 */

import { MenuEventEnum } from './config'

/**
 * ToggleButton
 */
export interface ButtonStruct {
  icon: string
  size?: number
  label?: string
  border?: boolean
}

/**
 * ShowCase
 */
export interface ShowCaseStruct {
  label: string
  desc?: string
  iconSize?: number
  count: string | number
  icon?: string
  color?: string
}

/**
 * MoreOperator
 */
export interface OperateStruct {
  showLabel: (row?: Recordable) => string
  callback?: (row?: Recordable) => void
  disabled?: (row?: Recordable) => boolean
}

/**
 * DropDown
 */
export interface DropDownStruct {
  handler?: Fn
  icon?: string
  text: string
  event: MenuEventEnum
  disabled?: boolean
  divider?: boolean
  popConfirm?: {
    title: string
    icon?: string
    width?: string | number
    confirmButtonType?:
      | 'primary'
      | 'success'
      | 'warning'
      | 'danger'
      | 'info'
      | 'text'
    cancelButtonType?:
      | 'primary'
      | 'success'
      | 'warning'
      | 'danger'
      | 'info'
      | 'text'
  }
}
