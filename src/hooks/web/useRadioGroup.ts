import type { WatchSource } from 'vue'
import { cloneDeep } from '@nrzt/core'

interface UseRadioGroupHook<TData> {
  radioList: TData[]
  activeRadio: string | number | boolean
}

interface TreeHookOption<TData> {
  onTransform?: (data: TData[]) => void //转换传进来的数据
  onChange?: (value: string | number | boolean) => void
  onDefault?: (data: TData[]) => void // 设置默认激活的值
}

export default function <TData>(
  data: WatchSource<TData[]>,
  option: TreeHookOption<TData> = {}
) {
  const tdata: UseRadioGroupHook<TData> = reactive({
    activeRadio: '',
    radioList: [],
  })

  const { onTransform, onChange, onDefault } = option
  watch(
    data,
    newValue => {
      if (newValue.length === 0) return
      const data2 = cloneDeep(newValue)
      onTransform && onTransform(data2)
      tdata.radioList = data2

      if (onDefault) {
        onDefault(tdata.radioList)
        onChange && onChange(tdata.activeRadio)
      }
    },
    {
      immediate: true,
    }
  )

  const handleRadioChange = (data: string | number | boolean) => {
    onChange && onChange(data)
  }

  return {
    ...toRefs(tdata),
    handleRadioChange,
  }
}
