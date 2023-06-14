/**
 * **********************store相关类型**********************
 */

import { ErrorTypeEnum } from '@/settings/exceptionSetting'

// Error-log information
export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum
  // Error file
  file: string
  // Error name
  name?: string
  // Error message
  message: string
  // Error stack
  stack?: string
  // Error detail
  detail: string
  // Error url
  url: string
  // Error time
  time?: string
}

export interface UserInfoStruct {
  companyId: string
  companyName: string
  departId: string
  departName: string
  id: string
  userName: string
  loginName: string
  userStatus: string
  userMobile: string
  updateUser: string
  updateTime: string
}
