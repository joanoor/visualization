import { cloneDeep, isNullOrUnDef } from '@nrzt/core'
import type { App, Component } from 'vue'
import { ElMessageBox, type ElMessageBoxOptions } from 'element-plus'
import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'
import { IChart } from '@nrzt/chart'

// const files=import.meta.glob('./*.ts',{eager:true})
export const autoImport = (files: Record<string, unknown>) => {
  const modules: Recordable = {}
  for (const key in files) {
    if (Object.prototype.hasOwnProperty.call(files, key)) {
      modules[key.replace(/(\.\/|\.ts)/g, '')] = files[key]
    }
  }
  return modules
}

// https://github.com/vant-ui/vant/issues/8302
type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void
    }
  }
}
export type WithInstall<T> = T & {
  install(app: App): void
} & EventShim

export type CustomComponent = Component & { displayName?: string }

export const withInstall = <T extends CustomComponent>(
  component: T,
  alias?: string
) => {
  ;(component as Record<string, unknown>).install = (app: App) => {
    const compName = component.name || component.displayName
    if (!compName) return
    app.component(compName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as WithInstall<T>
}

/*****************************我是分割线*****************************/

export const judgeWord = (aform: Recordable) => {
  const form = cloneDeep(aform)
  Object.keys(form).forEach(v => {
    if (isNullOrUnDef(form[v]) || form[v] === '') {
      Reflect.deleteProperty(form, v)
    }
  })
  return form
}

export const handleMessageBox = (
  {
    message,
    confirmButtonText = '确定',
    cancelButtonText = '取消',
    customClass = 'nrzt-messagebox',
    showCancelButton = true,
    type = 'warning',
  }: ElMessageBoxOptions,
  confirmCallback: Fn
) => {
  ElMessageBox({
    message,
    confirmButtonText,
    cancelButtonText,
    customClass,
    showCancelButton,
    type,
  }).then(confirmCallback)
}

export function getRawRoute(
  route: RouteLocationNormalized
): RouteLocationNormalized {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map(item => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  }
}

export const renderChartNoData = (chart: IChart, subtext = '暂无数据') => {
  const option: echarts.EChartsOption = {
    title: {
      text: ' {a|}',
      left: 'center',
      top: 'center',
      subtext,
      itemGap: -20,
      textStyle: {
        rich: {
          a: {
            color: '#000',
            fontSize: '16',
            height: 80,
            width: 160,
            backgroundColor: {
              image:
                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA2NCA0MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbFJ1bGU9ImV2ZW5vZGQiPg0KICAgIDxlbGxpcHNlIGZpbGw9IiNkZGQiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3IiAvPg0KICAgIDxnIGZpbGxSdWxlPSJub256ZXJvIiBzdHJva2U9IiM5OTkiPg0KICAgICAgPHBhdGgNCiAgICAgICAgZD0iTTU1IDEyLjc2TDQ0Ljg1NCAxLjI1OEM0NC4zNjcuNDc0IDQzLjY1NiAwIDQyLjkwNyAwSDIxLjA5M2MtLjc0OSAwLTEuNDYuNDc0LTEuOTQ3IDEuMjU3TDkgMTIuNzYxVjIyaDQ2di05LjI0eiIgLz4NCiAgICAgIDxwYXRoDQogICAgICAgIGQ9Ik00MS42MTMgMTUuOTMxYzAtMS42MDUuOTk0LTIuOTMgMi4yMjctMi45MzFINTV2MTguMTM3QzU1IDMzLjI2IDUzLjY4IDM1IDUyLjA1IDM1aC00MC4xQzEwLjMyIDM1IDkgMzMuMjU5IDkgMzEuMTM3VjEzaDExLjE2YzEuMjMzIDAgMi4yMjcgMS4zMjMgMi4yMjcgMi45Mjh2LjAyMmMwIDEuNjA1IDEuMDA1IDIuOTAxIDIuMjM3IDIuOTAxaDE0Ljc1MmMxLjIzMiAwIDIuMjM3LTEuMzA4IDIuMjM3LTIuOTEzdi0uMDA3eiINCiAgICAgICAgZmlsbD0iI2UxZTFlMSIgLz4NCiAgICA8L2c+DQogIDwvZz4NCjwvc3ZnPg==',
            },
          },
        },
      },
      subtextStyle: {
        fontSize: 16,
      },
    },
  }
  chart.setOption(option)
}
