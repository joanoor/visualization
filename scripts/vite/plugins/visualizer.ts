import { visualizer } from 'rollup-plugin-visualizer'
import { PluginOption } from 'vite'
import { isReportMode } from '../../utils'

export function configVisualizerConfig() {
  if (isReportMode()) {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as unknown as PluginOption
  }
}
