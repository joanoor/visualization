import { CascaderValue, CascaderProps } from 'element-plus'
import deepmerge from 'deepmerge'
import { ElCascader } from 'element-plus'
import { isArray } from '@nrzt/core'

export default function (
  defaultValue?: string,
  props: CascaderProps = {
    expandTrigger: 'hover' as const,
    value: 'areaNo', // areaNo
    label: 'areaName',
    checkStrictly: true,
  },
  callback?: (value: CascaderValue) => void
) {
  const cascaderValue = ref(defaultValue || '')
  const cascaderRef = ref<InstanceType<typeof ElCascader>>()
  const baseProps: CascaderProps = {
    expandTrigger: 'hover' as const,
    checkStrictly: true,
    value: 'areaNo', // areaNo
    label: 'areaName',
  }

  props = deepmerge(baseProps, props)

  const handleChange = (value: CascaderValue) => {
    callback && callback(value)
    isArray(cascaderRef.value)
      ? cascaderRef.value[0]?.togglePopperVisible()
      : cascaderRef.value?.togglePopperVisible()
  }

  return {
    cascaderRef,
    cascaderValue,
    props,
    handleChange,
  }
}
