/**
 * 与弹框相关的操作
 * 包括打开dialog、关闭弹框，重置表单
 */

import { reactive, toRefs, WatchSource } from 'vue'
import type { TabPaneName } from 'element-plus'
import { Awaitable } from 'element-plus/es/utils'
import { cloneDeep } from '@nrzt/core'

interface UseTabData<TData> {
  activeTabName: string | number
  tabList: TData[]
}

interface UseTabOption<TData> {
  onTransform?: (tdata: TData[]) => void //转换传进来的数据
  onChange?: (value: string | number | boolean) => void
  onDefault?: (tdata: TData[]) => string | number // 设置默认激活的值
  onBeforeChange?: (
    newName: TabPaneName,
    oldName: TabPaneName
  ) => Awaitable<boolean | void>
}

/**
 * 设置dialog弹框相关
 */
export default function <TData>(
  data: WatchSource<TData[]>,
  option: UseTabOption<TData> = {}
) {
  const tdata: UseTabData<TData> = reactive({
    activeTabName: '',
    tabList: [],
  })

  const { onTransform, onChange, onDefault, onBeforeChange } = option

  watch(
    data,
    newValue => {
      if (newValue.length === 0) return
      const data2 = cloneDeep(newValue)
      onTransform && onTransform(data2)
      tdata.tabList = data2

      if (onDefault) {
        tdata.activeTabName = onDefault(tdata.tabList)
      }
      onChange && onChange(tdata.activeTabName)
    },
    {
      immediate: true,
    }
  )

  const handleBeforeLeave = (
    activeName: TabPaneName,
    oldActiveName: TabPaneName
  ) => {
    if (onBeforeChange) {
      return onBeforeChange(activeName, oldActiveName)
    }

    return true
  }

  watch(
    () => tdata.activeTabName,
    newValue => {
      onChange && onChange(newValue)
    }
  )

  return {
    ...toRefs(tdata),
    handleBeforeLeave,
  }
}
