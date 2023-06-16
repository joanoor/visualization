<template>
  <div w-full h-full>
    <div ref="chartRef" w-full h-full></div>
  </div>
</template>

<script setup lang="ts">
import { createChart, IChart } from '@nrzt/chart'
import type { EChartsOption } from 'echarts'

interface ChartProps {
  option?: EChartsOption
  loading?: boolean
  loadingText?: string
}

const gaugeData = [
  {
    value: 50,
    detail: {
      valueAnimation: true,
      offsetCenter: ['0%', '0%'],
    },
  },
]
const props = withDefaults(defineProps<ChartProps>(), {
  option: () => ({
    series: {},
  }),
  loadingText: '图表数据载入中',
})

const defaultOption: EChartsOption = {
  grid: { top: 0, left: 0, right: 0, bottom: 0 },
  series: {
    type: 'gauge',
    startAngle: 90,
    radius: '100%',
    endAngle: -270,
    pointer: {
      show: false,
    },
    progress: {
      show: true,
      overlap: false,
      clip: false,
      itemStyle: {
        borderWidth: 0,
        color: {
          type: 'linear',
          x: 0, // 左上角x
          y: 0, // 左上角y
          x2: 0, // 右下角x
          y2: 1, // 右下角y
          colorStops: [
            {
              offset: 0,
              color: '#1ecedd', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(21, 190, 192, 0)', // 100% 处的颜色
            },
          ],
        },
      },
    },
    axisLine: {
      lineStyle: {
        width: 8,
        color: [[1, '#273857']],
      },
    },
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    data: gaugeData,
    detail: {
      width: 50,
      height: 32,
      fontSize: 28,
      color: '#27e2da',
      formatter: '{value}%',
    },
  },
}
const chartRef = ref<HTMLElement | null>(null)
let chart: IChart | null = null
const renderChart = () => {
  chart = createChart(unref(chartRef as Ref<HTMLElement>), defaultOption)
}

onMounted(renderChart)

watchPostEffect(
  () => props.option,
  (source: EChartsOption) => {
    chart?.setOption({
      ...source,
    })
  }
)
</script>

<style scoped></style>
