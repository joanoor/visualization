import type { MockMethod } from 'vite-plugin-mock'
import { mock } from 'mockjs'

// 启动mock数据
export default [
  {
    url: '/api/idleList',
    method: 'get',
    // timeout: 1000,
    response: () => {
      return {
        code: 200,
        message: 'success',
        result: [
          {
            company: '肥东政务服务中心',
            percent: 85.87,
          },
          {
            company: '肥东政务服务中心2',
            percent: 65.87,
          },
          {
            company: '肥东政务服务中心3',
            percent: 65.87,
          },
          {
            company: '肥东政务服务中心4',
            percent: 65.87,
          },
          {
            company: '肥东政务服务中心5',
            percent: 35.87,
          },
        ],
      }
    },
  },
  {
    url: '/api/stationinfo',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        result: {
          ...mock({
            'list|12': [
              {
                time: '@time(mm:ss)',
                chargingValue: '@float(3000,6000,2,2)',
                idleValue: '@float(3000,6000,2,2)',
                offlineValue: '@float(3000,6000,2,2)',
              },
            ],
          }),
        },
      }
    },
  },
] as MockMethod[]
