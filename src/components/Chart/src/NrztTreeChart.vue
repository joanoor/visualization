<template>
  <div
    w-full
    h-full
    class="chart-container"
    v-loading="loading"
    element-loading-text="图表数据载入中"
  >
    <el-empty
      v-if="chartData?.length === 0"
      w-full
      h-full
      :image-size="100"
      description="暂无图表"
    />
    <div ref="chartRef" w-full h-full v-else></div>
  </div>
</template>

<script setup lang="ts">
import { createChart, ChartType, IChart } from '@nrzt/chart'
import { EChartsOption } from 'echarts'
interface ChartProps<T = any> {
  chartData?: T[]
  dimensions?: string[]
  chartType: ChartType
  chartOption?: EChartsOption
  loading: boolean
  callback?: (chart: IChart) => void
}

const props = withDefaults(defineProps<ChartProps>(), {
  chartData: () => [],
  chartOption: () => ({}),
})

const chartRef = ref<HTMLElement | null>(null)

let chart: IChart | null = null

const renderChart = () => {
  chart = createChart(unref(chartRef as Ref<HTMLElement>), props.chartOption)
  props.callback && chart && props.callback(chart)
}

watch(() => props.chartData, renderChart, {
  immediate: true,
  flush: 'post',
  deep: true,
})

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
