import type { Alias } from 'vite'
import { pathResolve } from '../utils'

export function configAlias(): Alias[] {
  return [
    {
      find: '@',
      replacement: pathResolve('src'),
    },
    {
      find: '@views',
      replacement: pathResolve('src/views'),
    },
    {
      find: '@utils',
      replacement: pathResolve('src/utils'),
    },
  ]
}
