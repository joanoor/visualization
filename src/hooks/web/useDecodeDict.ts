/**
 * 整个项目中对字典进行处理
 */

import type { DictionaryStruct } from '@/types'
import { useGlobalStore } from '@/store'

// 拿到字典
const useGlobal = useGlobalStore()

export const generateDictionary = (
  customDictionary: Record<string, DictionaryStruct[]>
) => {
  useGlobal.addDicts(customDictionary)
  return {
    ...useGlobal.dicts,
    ...customDictionary,
  }
}

/**
 * table展示数据的时候，将接口返回的数据翻译成字典中对应的数据，若数据为空，则翻译成'--'
 * @param customDictionary  自定义字典
 * @param placeWord 自定义的缺省字符，默认为'--'
 * @returns
 */
export default function (
  customDictionary: Record<string, DictionaryStruct[]> = {},
  placeWord = '--'
) {
  // 合并字典，用户自定义的字典会覆盖默认的
  const dictionary: Record<string, DictionaryStruct[]> =
    generateDictionary(customDictionary)

  /**
   * 转义字典方法。会先从整个项目的字典中获取，如果取不到值，再从用户自定义的字典中获取，如果再取不到，则返回对象属性值，如果对象属性值为null或undefined，返回"--"
   * @param row 行数据
   * @param prop 属性名称
   * @param dictName 字典名称。可以大写，也可以小写。（table接口返回的转成大写，自定义customDictionary可以是小写）
   * @param placeWord2 传入的缺省字符，默认为'--'
   * @param
   */
  const onDecodeDict = <TData>(
    row: TData,
    prop: keyof TData,
    dictName?: string,
    placeWord2?: string
  ) => {
    if (!row) return
    if (dictName) {
      // ?? 空值合并运算符只对undefined和null进行处理
      return (
        (dictionary[dictName]?.filter(v => v.value === row[prop])[0]?.name ||
          row[prop]) ??
        (placeWord2 || placeWord)
      )
    } else {
      return row[prop] ?? placeWord2 ?? placeWord
    }
  }

  return {
    onDecodeDict,
  }
}
