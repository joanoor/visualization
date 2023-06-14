/**
 * **********************表单相关类型**********************
 */
import type { FormItemRule } from 'element-plus'

export interface FormPropRule<T> {
  name: T // 表单字段标识符
  title?: string // 表单字段的中文名称（当想自定义的时候，会用到）
  default?: any // 默认表单字段的初始值
  uniqId?: string // 重复表单的标识id，这个字段不能重复
  message?: string // 触发表单校验时的提示信息
  trigger?: 'blur' | 'change' | '' // 触发方式
  dictName?: string // 字典表中的字段名称
  required?: boolean // 字段是否需要校验
  rule?: Arrayable<FormItemRule> // 自定义校验规则
  component?: // 该属性对应的表单组件类型
  | 'checkbox'
    | 'input'
    | 'select'
    | 'date'
    | 'time'
    | 'number'
    | 'radio'
    | 'switch'
    | 'upload'
    | 'text'
    | 'inputselect'
    | 'cascader'
}
