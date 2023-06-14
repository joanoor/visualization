import { withInstall } from '@/utils'

import nrztChart from './src/NrztChart.vue'
import nrztSankeyChart from './src/NrztSankeyChart.vue'
import mapChart from './src/Map/index.vue'

export const NrztChart = withInstall(nrztChart)
export const NrztSankeyChart = withInstall(nrztSankeyChart)
export const MapChart = withInstall(mapChart)
