/**
 * 与表单相关的操作
 */

import {
  cloneDeep,
  isString,
  _console,
  genRandomString,
  isNullOrUnDef,
} from '@nrzt/core'
import {
  type BaseStruct,
  type RuleItemExtend2,
  type SubmitCallback,
  type ResetCallBack,
  submitForm,
  resetForm,
  generateFormAndRules,
} from '@nrzt/form'
import { FormInstance } from 'element-plus'
import type { ResultColumnsData, DictionaryStruct, FormPropRule } from '@/types'
import { generateDictionary } from './useDecodeDict'

type Make<T> = T extends string[]
  ? {
      [P in T[number]]: any
    }
  : never

/**
 * 此方法用于生成表单类型推断
 * @param configs
 */
function defineFormTypes<T extends string>(configs: (FormPropRule<T> | T)[]) {
  return configs
}

interface HookOption<T> {
  expectOrderPropNames?: string[] // 期待的表单字段排序
  expectOmitedColumnNames?: T // 期待忽略的column字段
  expectPickedColumnNames?: T // 期待存在的表单字段
  customDictionary?: Record<string, DictionaryStruct[]> // 用户自定义的字典（当接口没有返回的时候，自定义的字典，用于select选项）
  onReset?: (data: Make<T>) => void
  onSubmit?: (data: Make<T>) => void
}

/**
 * 通过接口返回的columns来自动生成展示的表单字段
 * 存在的主要问题：
 * 1、接口返回的字段有一些是我们不需要的
 * 2、页面展示的表单字段和实际提交时的表单字段不一致。（因为页面form表单是自动生成的，所以存在此问题，）
 * 3、接口返回的字段可能会发生变化（因为设计的问题，后面可能会新增字段）
 *
 * 解决方法：
 * 1、通过字段hidden和传入自定义expectOmitedPropNames或expectPickedPropNames字段来进行过滤
 * 2、通过传入固定的表单属性，来避免接口返回的字段可能发生的变化
 * @param myFormProps 用户提供的表单字段
 * @param columns 由接口返回，用于生成用户提供的表单字段的详细属性
 * @param option
 * @returns
 */
export default function <T extends string, TData>(
  myFormProps: (FormPropRule<T> | T)[],
  columns?: Ref<ResultColumnsData<keyof TData>[]>,
  option: HookOption<T[]> = {}
) {
  const searchFormProps = defineFormTypes(myFormProps)

  type FormStruct = {
    [P in (typeof searchFormProps)[number] as P extends string ? P : never]: any
  } & { [x: string]: any }

  const initialHookOption = {
    expectOrderPropNames: [],
    expectOmitedColumnNames: [],
    expectPickedColumnNames: [],
    customDictionary: {} as Record<string, DictionaryStruct[]>,
    ...option,
  }

  const {
    expectOrderPropNames,
    expectOmitedColumnNames,
    expectPickedColumnNames,
    customDictionary,
    onReset,
    onSubmit,
  } = initialHookOption

  const dictionary = generateDictionary(customDictionary)

  // 将用户传入的myFormProps转成FormPropRule[]类型
  const myHandledFormProps = myFormProps.map(v => {
    if (isString(v)) {
      return {
        name: v,
      }
    } else {
      return v
    }
  })

  // 获取表单的全部字段
  const myFormPropNames = myHandledFormProps.map<string>(v => v.name)

  // 获取需要校验的表单字段名称组成的数组
  const expectRequiredPropNames = myHandledFormProps
    .filter(v => v.required)
    .map(v => v.name)

  // 表单涉及的数据
  const formRef = ref<FormInstance>() as Ref<FormInstance> // 表单ref
  const form = ref<FormStruct>({} as FormStruct)
  const rules = ref<Recordable>({})
  const originalForm = ref<FormStruct>({} as FormStruct) // 保存原始的form表单，用于重置数据
  const formColumns = ref<ResultColumnsData[]>([]) // 由于接口返回的columns和表单要展示的字段不完全一致，所以这里定义了新的变量formColumns用于保存页面中form要展示的字段

  let attaches: BaseStruct<string, boolean>[] = []
  const uniqIds: string[] = []
  if (columns) {
    // 接口返回列表，自动生成表单结构和校验规则
    const unwatch = watchEffect(() => {
      // 若接口没有返回值，则直接返回
      if (columns.value.length === 0) return
      const columns2 = cloneDeep(columns)
      // 设置整个columns2表单字段的default、trigger、selectOption、message、component属性
      columns2.value.forEach(column => {
        // @ts-ignore
        const tmp = myHandledFormProps.filter(v => v.name === column.name)[0]
        if (tmp) {
          column.trigger = tmp.trigger || 'blur'
          const tmpDictName = tmp.dictName || column.dictName || ''
          // 不存在column.trigger，说明不是接口返回的字典字段(因为如果是接口返回装字典，会在useQueryTable中进行设置)
          column.selectOption = dictionary[tmpDictName] ?? []
          !isNullOrUnDef(tmp.title) && (column.title = tmp.title)

          column.message = tmp.message || `请输入${column.title}`
          column.component =
            tmp.component ||
            (column.selectOption.length > 0 ? 'select' : 'input')
          column.rule = tmp.rule
          // 设置字典

          column.default = tmp.default ?? ''
        }
      })

      /**
       * 以下从第1步到第3步，生成的是页面中展示的表单字段（跟提交时的表单字段可能会有区别：比如id字段，不需要在页面中出现，但是编辑提交时需要带上）
       */

      // 1、重新排序并过滤不需要出现在页面中的form字段
      const orderedColumnNames = Array.from(
        new Set([...expectOrderPropNames, ...myFormPropNames])
      )

      expectOmitedColumnNames.forEach(columnName => {
        // expectPickedColumnNames的权重高于expectOmitedColumnNames
        if (expectPickedColumnNames.indexOf(columnName) === -1) {
          const tmpIndex = orderedColumnNames.indexOf(columnName)
          if (tmpIndex > -1) {
            orderedColumnNames.splice(tmpIndex, 1)
          }
        }
      })

      // 2、生成表单字段的对象数组(ResultColumnsData[]类型)
      const orderedColumns = orderedColumnNames
        .map<ResultColumnsData<keyof TData> | undefined>(columnName => {
          return columns2.value.find(column => column.name === columnName)
        })
        .filter(v => v) as ResultColumnsData[]

      // 3、赋值给表示页面展示的表单字段的变量
      formColumns.value = orderedColumns

      // 用于生成表单和校验规则
      // @ts-ignore
      attaches = columns2.value
        // @ts-ignore
        .filter(v => myFormPropNames.indexOf(v.name) > -1)
        .map(column => {
          const uniqId = genRandomString()
          uniqIds.push(uniqId)
          return {
            label: column.name,
            default: column.default || '',
            // @ts-ignore
            required: expectRequiredPropNames.some(v => v === column.name),
            rule: (column.rule || [
              {
                // @ts-ignore
                required: expectRequiredPropNames.some(v => v === column.name),
                message: column.message ?? '',
                trigger: column.trigger ?? 'blur',
              },
            ]) as unknown as RuleItemExtend2,
            id: uniqId,
          }
        })
      // 生成最终的表单和校验规则
      const [_form, _rules] = generateFormAndRules(
        [...myFormPropNames],
        attaches,
        uniqIds
      )
      originalForm.value = cloneDeep(_form) as FormStruct
      form.value = _form as FormStruct
      rules.value = _rules
      // 取消监听
      unwatch()
    })
  } else {
    // 用于生成表单和校验规则
    attaches = myHandledFormProps.map(myProp => {
      const uniqId = genRandomString()
      uniqIds.push(uniqId)
      return {
        label: myProp.name,
        default: myProp.default || '',
        required: expectRequiredPropNames.some(v => v === myProp.name),
        rule: (myProp.rule || [
          {
            required: expectRequiredPropNames.some(v => v === myProp.name),
            message: myProp.message ?? '',
            trigger: myProp.trigger ?? 'blur',
          },
        ]) as unknown as RuleItemExtend2,
        id: uniqId,
      }
    })
    const [_form, _rules] = generateFormAndRules(
      [...myFormPropNames],
      attaches,
      uniqIds
    )
    originalForm.value = cloneDeep(_form) as FormStruct
    form.value = _form as FormStruct
    rules.value = _rules
  }

  /**
   * 初始化表单
   */
  const onInitialForm = () => {
    // 因为重置表单只能重置页面中展示的字段，而不在页面中展示的字段，没有办法通过resetFields来重置，所以这里人工设置一下
    // pageOmitedFormColumnNames.forEach(v => {
    //   const t = attaches.find(v2 => v2.label === v)
    //   ;(data.form as Recordable)[v] = t ? t.default : ''
    // })
    form.value = cloneDeep(originalForm.value)
  }

  /**
   * 回显表单数据
   * @param obj
   */
  const onEchoForm = (obj: Recordable) => {
    nextTick(() => {
      // 必须要放在nextTick中执行，否则就相当于一开始给表单赋初值，当重置表单的时候就不对了
      for (const prop of Object.keys(form.value as Recordable)) {
        ;(form.value as Recordable)[prop] = obj[prop]
      }
    })
  }

  /**
   * 重置表单校验状态
   * @param callback
   */
  const onResetForm = () => {
    const handleResetForm2 = resetForm(() => {
      onReset && onReset(form.value)
    })

    handleResetForm2 &&
      // @ts-ignore
      handleResetForm2(formRef.value?.formRef2 || formRef.value)
  }

  /**
   * 提交表单并进行表单校验
   * @param callback
   */
  const onSubmitForm = (callback: SubmitCallback) => {
    const handleSubmitForm2 = submitForm(callback)
    handleSubmitForm2 && handleSubmitForm2(formRef.value)
  }

  /**
   * 重置表单
   */
  const handleResetForm = () => {
    onInitialForm()
    onResetForm()
  }

  /**
   * 提交表单
   */
  const handleSubmitForm = () => {
    onSubmitForm(async valid => {
      if (valid) {
        onSubmit && (await onSubmit(form.value))
      } else {
        _console.error('提交表单，校验失败')
      }
    })
  }

  return {
    formRef,
    form,
    formColumns,
    rules,
    originalForm,
    onInitialForm, // 初始化表单数据
    onEchoForm, // 回显表单数据
    // onResetForm, // 重置表单状态
    // onSubmitForm, // 提交表单状态
    handleResetForm, // 重置表单
    handleSubmitForm, // 提交表单
  }
}
