import { cloneDeep } from '@nrzt/core'
import { WatchSource } from 'vue'
import { ButtonStruct } from '@/types'

interface UseTabData {
  activeButtonIndex: string | number
  buttonList: ButtonStruct[]
}

interface UseTabOption {
  onTransform?: (tdata: ButtonStruct[]) => void //转换传进来的数据
  onChange?: (value: string | number | boolean) => void
  onDefault?: (tdata: ButtonStruct[]) => number // 设置默认激活的值
}

export default function (
  data: WatchSource<ButtonStruct[]>,
  option: UseTabOption = {}
) {
  const tdata: UseTabData = reactive({
    activeButtonIndex: 0,
    buttonList: [],
  })

  const { onTransform, onChange, onDefault } = option

  watch(
    data,
    newValue => {
      if (newValue.length === 0) return
      const data2 = cloneDeep(newValue)
      onTransform && onTransform(data2)
      tdata.buttonList = data2

      if (onDefault) {
        tdata.activeButtonIndex = onDefault(tdata.buttonList)
      }
      onChange && onChange(tdata.activeButtonIndex)
    },
    {
      immediate: true,
    }
  )

  watch(
    () => tdata.activeButtonIndex,
    newValue => {
      onChange && onChange(newValue)
    }
  )

  return {
    ...toRefs(tdata),
  }
}
