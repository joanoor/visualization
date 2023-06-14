import { Result, ResultColumnsData, ResultPagingData } from '@/types'
import type { RequestOptions } from '@nrzt/request'
import { TableInstance } from 'element-plus'
import { useGlobalStore } from '@/store'
import { default as deepmerge2 } from 'deepmerge'
import {
  assertType,
  cloneDeep,
  downloadByJson,
  omit,
  textSize,
} from '@nrzt/core'
import { judgeWord } from '@/utils'
import useDecodeDict from '@/hooks/web/useDecodeDict'
import { MaybeComputedElementRef, useElementBounding } from '@vueuse/core'
import { useEventListener } from '@vueuse/core'

/********************************涉及到的类型********************************/

export type ServiceType<TData extends object, TParams extends Recordable> = (
  data: TParams,
  requestUrl?: string,
  opt?: RequestOptions
) => Promise<Result<ResultPagingData<TData>, ResultColumnsData<keyof TData>[]>>

interface HookOption<TData extends object, TParams extends Recordable> {
  queryParams?: TParams // 调用hooks时传递的参数
  requestUrl?: string // 不同接口的baseUrl
  insertColumns?: ResultColumnsData<string>[] // 在前面新增加的自定义列，比如“操作”
  appendColumns?: ResultColumnsData<string>[] // 在后面新增加的自定义列，比如“操作”
  customColumns?: ResultColumnsData<keyof TData>[]
  expectOmitedColumnNames?: (keyof TData)[]
  expectPickedColumnNames?: (keyof TData)[]
  expectOrderColumnNames?: (keyof TData)[]
  lazy?: boolean // 是否懒加载，true表示是懒加载，不会在onMounted中执行，否则会在onMounted中执行
  baseOffsetWidth?: number // 基础的列宽
  requestOpt?: RequestOptions
  onBefore?: (data: TParams) => void
  onSuccess?: (data: TData[]) => void
  onTransformColumns?: (columns: ResultColumnsData<keyof TData>[]) => void
  onSetTableHeight?: (tableRef: MaybeComputedElementRef) => void
  onSelectionChange?: (selection) => void
  onSelectionAll?: (selection) => void
}

interface AdditionalOption {
  downloadTable?: boolean // 是否是下载table的情况，因为下载excel的时候，要求不影响分页列表
  deepmerge?: boolean // 是否需要深度合并
}

interface UseQueryTableResult<TData extends object> {
  loading: boolean
  tableHeight: number
  total: number
  current: number
  size: number
  hasSelectedRow: boolean // el-table的selection模式下，表示是否选择了行（true表示选择了，false表示没有选择）
  columns: ResultColumnsData<keyof TData>[]
  tableColumns: ResultColumnsData<keyof TData>[]
  tableData: TData[]
  allSelectedData: TData[]
  allExcelData: TData[]
}

const getBaseHookOption = <
  TData extends object,
  TParams extends Recordable = Recordable
>(): Omit<
  Required<HookOption<TData, TParams>>,
  | 'queryParams'
  | 'requestUrl'
  | 'requestOpt'
  | 'onBefore'
  | 'onSuccess'
  | 'onTransformColumns'
  | 'onSetTableHeight'
  | 'onSelectionChange'
  | 'onSelectionAll'
> => ({
  expectOrderColumnNames: [],
  expectPickedColumnNames: [],
  expectOmitedColumnNames: [],
  insertColumns: [],
  appendColumns: [],
  customColumns: [],
  lazy: false,
  baseOffsetWidth: 80,
})

/********************************主要方法********************************/

// 拿到字典，用于设置列的selectOption字段
const useGlobal = useGlobalStore()

export default function <TData extends object, TParams extends Recordable>(
  service: ServiceType<TData, TParams>,
  option: HookOption<TData, TParams> = {}
) {
  const initialOption = {
    ...getBaseHookOption<TData, TParams>(),
    ...option,
  }

  // 用于保存传递进来的请求参数
  let localHookOption: Recordable = {
    ...initialOption,
  }

  const current2 = initialOption.queryParams?.page?.current || 1
  const size2 = initialOption.queryParams?.page?.size || 10

  const tableRef = ref<TableInstance>()
  const currentSelectedRecord = ref<TData>()
  const tdata: UseQueryTableResult<TData> = reactive({
    loading: false,
    tableHeight: 500,
    total: 0,
    current: current2,
    size: size2,
    hasSelectedRow: false,
    tableData: [],
    columns: [],
    tableColumns: [],
    allExcelData: [],
    allSelectedData: [],
  })

  const fetchTableList = async <
    TData2 extends object = TData,
    TParams2 extends Recordable = TParams
  >(
    hookQueryOption: HookOption<TData2, TParams2> = {},
    additionalOption: AdditionalOption = {
      downloadTable: false,
      deepmerge: true,
    }
  ) => {
    const { onDecodeDict } = useDecodeDict()
    if (assertType<UseQueryTableResult<TData2>>(tdata)) {
      const { downloadTable, deepmerge } = additionalOption
      const initialOption2 = {
        ...hookQueryOption,
      }
      let saveXlxsHookOption: Recordable = {}

      if (!downloadTable) {
        deepmerge
          ? (localHookOption = deepmerge2(localHookOption, initialOption2, {
              arrayMerge: (_destinationArray, sourceArray, _options) =>
                sourceArray,
            }))
          : ((localHookOption = {
              ...localHookOption,
              ...initialOption2,
            }) as HookOption<TData2, TParams2>)
      } else {
        saveXlxsHookOption = deepmerge2(localHookOption, initialOption2, {
          arrayMerge: (_destinationArray, sourceArray, _options) => sourceArray,
        })
      }

      const {
        expectOrderColumnNames,
        expectOmitedColumnNames,
        expectPickedColumnNames,
        customColumns,
        baseOffsetWidth,
        insertColumns,
        appendColumns,
        requestUrl,
        requestOpt,
        onTransformColumns,
        onBefore,
        onSuccess,
      } = {
        ...getBaseHookOption<TData2>(),
        ...(!downloadTable ? localHookOption : saveXlxsHookOption),
      } as Omit<
        Required<HookOption<TData, TParams>>,
        | 'queryParams'
        | 'requestUrl'
        | 'requestOpt'
        | 'onBefore'
        | 'onSuccess'
        | 'onTransformColumns'
      > &
        HookOption<TData2, TParams2>

      const tmpQueryParams = downloadTable
        ? saveXlxsHookOption?.queryParams || {}
        : localHookOption?.queryParams || {}

      if (tmpQueryParams.hasOwnProperty('data')) {
        tmpQueryParams['data'] = judgeWord(tmpQueryParams['data'])
      }

      const tmpRequestOption = deepmerge2<any>(
        {
          page: {
            current: tdata.current,
            size: tdata.size,
          },
        },
        tmpQueryParams
      )
      !downloadTable && (tdata.loading = true)

      onBefore && onBefore(tmpRequestOption)
      try {
        let { result, columns } = (await service(
          tmpRequestOption,
          requestUrl,
          requestOpt
        )) as unknown as {
          result: ResultPagingData<TData2>
          columns: ResultColumnsData<keyof TData2>[]
        }
        onSuccess && onSuccess(result.records)
        onTransformColumns && onTransformColumns(columns)
        if (!downloadTable) {
          ;(tdata as UseQueryTableResult<TData2>).tableData = result.records

          currentSelectedRecord.value = tdata.tableData[0]

          if (columns) {
            // 对整个columns的元素设置常用属性的初始值
            columns = columns.map(v => {
              v.minWidth =
                v.minWidth ??
                (v.title ? textSize(v.title).width + baseOffsetWidth + '' : '')

              v.fixed = false
              v.checked = true
              v.headerAlign = 'left'
              v.align = 'left'

              const tmpColumn = (
                customColumns as ResultColumnsData<keyof TData2>[]
              ).find(column => column.name === v.name)
              return tmpColumn
                ? {
                    ...v,
                    ...tmpColumn,
                  }
                : v
            })

            columns.forEach(v => {
              const r = v.notes?.match(/[A-Z](_*[A-Z]*)+[A-Z]/g) // 匹配字典的名称
              if (r) {
                v.dictName = r[r.length - 1]
                v.component = 'select'
                v.trigger = 'change'
                v.message = `请选择${v.title}`
              } else {
                v.dictName = (v.name as string).toUpperCase() // 转成大写字符串
              }

              // 设置字典表中存在字段的selectOption
              v.selectOption = useGlobal.dicts[v.dictName as string] || []
              v.formatter = row =>
                onDecodeDict(row, v.name, v.dictName) as string
            })

            /**
             * 以下从第1步到第4步，生成的是页面中展示的table字段
             */

            // 1、首先过滤不需要出现在页面中的table字段
            let columns2 = columns.filter(v => !v.hidden)

            // 2、新增加的列
            // @ts-ignore
            insertColumns && (columns2 = insertColumns.concat(columns2))
            // @ts-ignore
            appendColumns && (columns2 = columns2.concat(appendColumns))

            // 3、初始的列的名称组成的数组
            const column2Names = columns2.map(v => v.name)

            // 4、重新排序并过滤需要忽略的列
            const orderedColumnNames = Array.from(
              new Set([
                ...(expectOrderColumnNames as (keyof TData2)[]), // 因为deepmerge合并数组默认是将source添加到target的后面，所以这里倒序执行
                ...column2Names,
              ])
            ).filter(colName => column2Names.includes(colName))
            // 最后再翻转

            expectOmitedColumnNames.forEach(columnName => {
              if (expectPickedColumnNames.indexOf(columnName) === -1) {
                // @ts-ignore
                const tmpIndex = orderedColumnNames.indexOf(columnName)
                if (tmpIndex > -1) {
                  orderedColumnNames.splice(tmpIndex, 1)
                }
              }
            })

            // 生成排序并过滤过的 列的对象数组
            const orderedColumns = orderedColumnNames
              .map<ResultColumnsData<keyof TData2> | undefined>(columnName => {
                return columns2.find(column => column.name === columnName)
              })
              .filter(v => v) as ResultColumnsData<keyof TData2>[]

            ;(tdata as UseQueryTableResult<TData2>).columns = columns
            ;(tdata as UseQueryTableResult<TData2>).tableColumns =
              orderedColumns
          }

          tdata.total = result.total
        } else {
          tdata.allExcelData = result.records as TData[] & TData2[]
        }
      } catch (err) {
        console.error(err)
      } finally {
        tdata.loading = false
      }
    }
  }

  watch([() => tdata.current, () => tdata.size], () => {
    fetchTableList({
      queryParams: localHookOption.queryParams,
    })
  })

  // 当不是懒加载的时候
  if (!initialOption.lazy) {
    onMounted(fetchTableList)
  }

  // table高度的默认设置
  const setDetaultTableHeight = (tableRef: MaybeComputedElementRef) => {
    const { top } = useElementBounding(tableRef)
    /**
     *  上面返回的top等属性是相对于页面视图左上角来计算的
     *  32是分页组件的高度，3个20分别表示table与分页的距离，分页距离页面边缘的padding距离，以及右侧的padding
     */
    tdata.tableHeight = window.innerHeight - top.value - (32 + 20 + 20 + 20)
  }

  const handleSetTableHeight = () => {
    const { onSetTableHeight } = option
    if (onSetTableHeight) {
      onSetTableHeight(tableRef.value as MaybeComputedElementRef)
    } else {
      setDetaultTableHeight(tableRef.value?.['tableRef2'] || tableRef.value)
    }
  }

  // 监听table高度的变化
  // onMounted(() => {
  //   nextTick(handleSetTableHeight)
  // })
  const clearUp = useEventListener('resize', handleSetTableHeight)
  onUnmounted(() => {
    clearUp()
  })

  /**
   * 生成分页列表的序号
   * table的第一条数据的index是从0开始的，所以index要加上1
   * @param index scope.$index
   */
  const onTableIndex = (index: number) =>
    index + 1 + (tdata.current - 1) * tdata.size

  // 当前选中的行记录
  const onCurrentSelectRecord = <T>(row: T) => {
    if (assertType<Ref<T>>(currentSelectedRecord)) {
      ;(currentSelectedRecord as Ref<T>).value = row
    }
  }

  /**
   * 当el-table是selection的时候，判断当前行是否可选
   * @param row 行
   * @param index
   * @param callback
   * @example
   * 在type=selection的列上，添加属性
   * :selectable="(row,index)=>onDecideIfCanSelect(row,index,callback)"
   * 其中的callback为传递的回调函数
   */
  const onDecideThisRowCanSelect = <T>(
    row: T,
    index: number,
    callback: (row: T, index: number) => boolean
  ) => callback(row, index)

  /**
   * 当选择项发生变化时
   * @param _selection
   * @example
   * el-table上监听@selection-change="onSelectChange"
   */
  const onSelectChange = <T extends any[]>(selections: T) => {
    const { onSelectionChange } = option
    if (onSelectionChange) {
      onSelectionChange(selections)
    } else {
      tdata.hasSelectedRow = selections.length > 0
    }
    tdata.allSelectedData = selections
  }

  /**
   * 当用户手动勾选全选 Checkbox 时
   * @param selection
   * @example
   * el-table上监听@select-all="onSelectAll"
   */
  const onSelectAll = <T extends any[]>(selections: T) => {
    const { onSelectionAll } = option
    if (onSelectionAll) {
      onSelectionAll(selections)
    } else {
      tdata.hasSelectedRow = selections.length > 0
    }
    tdata.allSelectedData = selections
  }

  /**
   * 导出excel表格
   * @param fileName 文件的名称（可以带后缀名，也可以不带）
   */
  const onExportTable = async (
    fileName: string,
    exportOption = {
      data: {},
    }
  ) => {
    let tmpData: TData[] = []
    tdata.loading = true
    const { onDecodeDict } = useDecodeDict()
    if (tdata.allSelectedData.length === 0) {
      // 表示全部下载
      await fetchTableList(
        {
          queryParams: Object.assign(
            {
              page: {
                current: 1,
                size: tdata.total,
              },
            },
            exportOption
          ),
        },
        {
          downloadTable: true,
        }
      )
      tmpData = cloneDeep(tdata.allExcelData)
    } else {
      // 表示选中下载
      tmpData = tdata.allSelectedData
    }

    tmpData.forEach(row => {
      tdata.tableColumns.forEach(col => {
        // @ts-ignore
        row[col.name] = onDecodeDict(row, col.name, col.dictName)
      })
    })
    downloadByJson(tmpData, fileName, {
      onDownloaded: () => {
        tdata.loading = false
      },
      onBefore: data => {
        return data.map(row =>
          omit(
            row,
            Object.keys(data[0]).filter(
              // @ts-ignore
              v => !tdata.tableColumns.map(v => v.name).includes(v)
            )
          )
        ) as TData[]
      },
      onSetTableHeader: jsonSheet1 => {
        tdata.tableColumns.forEach(v => {
          // 因为sheet1中是包含键值对（键是英文），所以这一步是将英文转成中文
          jsonSheet1 = jsonSheet1.replace(v.name as string, v.title || '')
        })
        return jsonSheet1
      },
    })
  }

  // const handleDeleteRow = <T>(row: T) => {
  //   if (assertType<Ref<T>>(currentSelectedRecord)) {
  //     ;(currentSelectedRecord as Ref<T>).value = row
  //   }
  // }

  return {
    tableRef,
    currentSelectedRecord,
    ...toRefs(tdata),
    fetchTableList,
    onCurrentSelectRecord,
    onTableIndex,
    onExportTable,
    onDecideThisRowCanSelect,
    onSelectChange,
    onSelectAll,
  }
}
