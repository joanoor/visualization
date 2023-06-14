/**
 * **********************字典相关类型**********************
 */

import { DICT_FIELDS } from '@/settings/dictSetting'

export type DictionaryStruct = {
  codeId?: string
  codeType?: string
  value: string
  name: string
} & Recordable

export type DictField = (typeof DICT_FIELDS)[number]

export type DictType = {
  [K in (typeof DICT_FIELDS)[number]]: DictionaryStruct[]
} & {
  [x: string]: DictionaryStruct[]
}
