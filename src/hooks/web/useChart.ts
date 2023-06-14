import { createChart } from 'ivy2'
import type { EChartsOption } from 'echarts'
import { ref, Ref, unref } from 'vue'

export default function (
  chartOption: EChartsOption,
  option: {
    lazy: false
  }
) {
  const chartRef = ref<HTMLElement | null>(null)

  const chart = createChart(unref(chartRef as Ref<HTMLElement>), chartOption)

  return {
    chart,
    chartRef,
  }
}
