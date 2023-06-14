import { CheckboxValueType } from 'element-plus'

interface IntCheckBox {
  label: string | number
  name: string
  disabled?: boolean
}

/**
 * 设置dialog弹框相关
 */
export default function (
  checkboxs: IntCheckBox[] = [],
  callback?: (checkeds: CheckboxValueType[]) => void
) {
  const data = reactive({
    checkboxList: [] as IntCheckBox[],
    checkedList: [] as string[] | number[], // 已选
  })

  data.checkboxList = checkboxs

  const handleChangeCheckBox = (value: CheckboxValueType[]) => {
    callback && callback(value)
  }

  return {
    ...toRefs(data),
    handleChangeCheckBox,
  }
}
