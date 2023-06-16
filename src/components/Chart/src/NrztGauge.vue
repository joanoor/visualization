<template>
  <div
    w-full
    h-full
    class="chart-container"
    v-loading="loading"
    :element-loading-text="loadingText"
  >
    <div ref="chartRef" w-full h-full></div>
  </div>
</template>

<script setup lang="ts">
import { renderChartNoData } from '@/utils'
import { createChart, getDefaultChartOpt, ChartType, IChart } from '@nrzt/chart'
import { EChartsOption } from 'echarts'

interface ChartProps {
  chartType?: ChartType
  option?: EChartsOption
  loading: boolean
  data?: any[]
  loadingText?: string
}

const props = withDefaults(defineProps<ChartProps>(), {
  option: () => ({
    series: {},
  }),
  loadingText: '图表数据载入中',
})

const chartRef = ref<HTMLElement | null>(null)

let chart: IChart | null = null

const renderChart = () => {
  chart = createChart(
    unref(chartRef as Ref<HTMLElement>),
    props.chartType
      ? getDefaultChartOpt(props.option, props.chartType)
      : props.option
  )

  if (
    // @ts-ignore
    props.option.series.data?.length === 0 ||
    // @ts-ignore
    props.option.dataset?.source?.length === 0
  ) {
    renderChartNoData(chart)
  }
}

onMounted(renderChart)

watch(
  () => props.option,
  source => {
    chart?.setOption({
      title: {
        show: false,
      },
      ...source,
    })
  },
  {
    deep: true,
  }
)

const getImage = () => {
  return chart?.getChartInstance().getDataURL({
    type: 'png',
    pixelRatio: 1, //放大2倍
    backgroundColor: '#fff',
  })
}

const resize = () => {
  chart?.resizeChart()
}

defineExpose({
  resize,
  getImage,
})
</script>

<style scoped></style>
