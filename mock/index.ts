import type { MockMethod } from 'vite-plugin-mock'
// import { mock } from 'mockjs'

import overviewApi from './overview'
import jdmanagerApi from './jdmanager'
import runningApi from './running'

// 启动mock数据
export default [
  {
    url: '/api/login',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          name: 'xixi',
        },
      }
    },
  },
  ...overviewApi,
  ...jdmanagerApi,
  ...runningApi,
] as MockMethod[]
