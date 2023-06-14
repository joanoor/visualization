/**
 * **********************网络请求相关类型**********************
 */

import type { FormPropRule } from './form'
import type { DictionaryStruct } from './dict'

type Struct<T> = T extends ResultPagingData<infer P>
  ? keyof P // 分页
  : T extends (infer A)[] // 列表
  ? keyof A
  : never

export interface Result<T = any, K = ResultColumnsData<Struct<T>>[]> {
  code: number
  type?: 'success' | 'error' | 'warning'
  message: string
  result: T
  columns?: K // 字段说明，可以当作表头
}

// 接口返回的columns字段类型
export interface ResultColumnsData<T = string> extends FormPropRule<T> {
  title?: string // 列的中文名称
  nullable?: boolean
  readOnly?: boolean
  hidden?: boolean // 是否可以隐藏列
  notes?: string // 是否与字典相关的说明名字，其中含有字典名称，可以正则匹配出来
  type?: 'selection' | 'expand' | 'index' // 列的类型
  align?: 'left' | 'center' | 'right' // 列中内容的对齐方式
  headerAlign?: 'left' | 'center' | 'right' // 表头对齐方式， 若不设置该项，则使用表格的对齐方式
  sortable?: boolean | 'custom' // 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
  selectable?: boolean // 仅对 type=selection 的列有效 function(row, index)
  formatter?: (row: any, column: any, cellValue: any, index: number) => string
  index?: (index: number) => number // table列序号
  width?: string | number // 列的宽度
  minWidth?: string | number // 列的最小宽度
  fixed?: boolean | 'right' | 'left' // 列是否固定
  checked?: boolean // 一些特殊的情况下会使用，比如需要用户点击展示哪些列，默认都设置成团设
  selectOption?: DictionaryStruct[] // 如果与字典相关，从字典中获取select选项(可以是接口返回的字典，也可以是用户自定义的字典)
  [x: string]: any
}

// 分页接口返回的类型
export interface ResultPagingData<T> {
  current: number
  orders: string[]
  pages: number
  records: T[]
  searchCount: boolean
  size: number
  total: number
}

// 菜单接口返回的类型
export interface ResultMenuStruct {
  appId: string
  distLv: string
  icon?: string
  isCache: null
  isExternalLink: null
  judgeMenuDTO: { judgeMenu: boolean; isAloneUser: number }
  menuId: number
  menuName: string
  menuType: string
  parentId: number
  perms: string
  requestUrl: null
  routerUrl: null
  status: string
  viewOrder: number
  visibility: string
  children?: ResultMenuStruct[]
  path?: string
}
