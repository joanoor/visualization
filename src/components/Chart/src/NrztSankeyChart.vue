<template>
  <div w-full h-280 class="chart-container" v-loading="loading" :element-loading-text="loadingText">
    <div ref="chartRef" w-full h-full></div>
  </div>
</template>

<script setup lang="ts">
import {
  default as echarts,
  createChart,
  getDefaultChartOpt,
  IChart,
} from '@nrzt/chart'
import { renderChartNoData } from '@/utils'

interface ChartProps {
  option?: echarts.EChartsOption
  loading: boolean
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
    getDefaultChartOpt(props.option, 'sankey')
  )
  // @ts-ignore
  if (props.option.series.data.length === 0) {
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

const resize = () => {
  chart?.resizeChart()
}

const getImage = () => {
  return chart?.getChartInstance().getDataURL({
    type: 'png',
    pixelRatio: 1, //放大2倍
    backgroundColor: '#fff',
  })
}

defineExpose({
  resize,
  getImage,
})
</script>

<style scoped></style>
