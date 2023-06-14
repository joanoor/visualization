import type { MockMethod } from 'vite-plugin-mock'
// import { mock } from 'mockjs'

// 启动mock数据
export default [
  {
    url: '/api/chargingqs',
    method: 'get',
    // timeout: 1000,
    response: () => {
      return {
        code: 200,
        message: 'success',
        result: [
          {
            address: '合肥',
            num: 435,
          },
          {
            address: '淮南',
            num: 390,
          },
          {
            address: '六安',
            num: 176,
          },
          {
            address: '亳州',
            num: 12,
          },
          {
            address: '阜阳',
            num: 360,
          },
          {
            address: '淮北',
            num: 340,
          },
          {
            address: '滁州',
            num: 380,
          },
          {
            address: '宣城',
            num: 320,
          },
          {
            address: '黄山',
            num: 190,
          },
          {
            address: '池州',
            num: 200,
          },
          {
            address: '铜陵',
            num: 100,
          },
          {
            address: '宿州',
            num: 130,
          },
        ],
      }
    },
  },
  {
    url: '/api/statistics',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        result: [
          {
            company: '青岛特锐德电气股份有限公司',
            num: 5372,
            percent: '36%',
          },
          {
            company: '江苏万帮德和新能源股份有限公司',
            num: 3506,
            percent: '27%',
          },
          {
            company: '珠海泰坦新动力电子有限公司',
            num: 1993,
            percent: '15%',
          },
          {
            company: '科大智能科技股份有限公司',
            num: 1551,
            percent: '12%',
          },
          {
            company: '普天新能源有限责任公司',
            num: 1372,
            percent: '9%',
          },
          {
            company: '特斯拉（上海）有限公司',
            num: 1087,
            percent: '7%',
          },
        ],
      }
    },
  },
  {
    url: '/api/equipnum',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        result: [
          {
            address: '合肥市',
            num: 4350,
          },
          {
            address: '淮南市',
            num: 4200,
          },
          {
            address: '蚌埠市',
            num: 3987,
          },
          {
            address: '安庆市',
            num: 3675,
          },
          {
            address: '马鞍山市',
            num: 2897,
          },
          {
            address: '芜湖市',
            num: 2431,
          },
          {
            address: '六安市',
            num: 1976,
          },
          {
            address: '亳州市',
            num: 1752,
          },
          {
            address: '阜阳市',
            num: 1160,
          },
          {
            address: '淮北市',
            num: 980,
          },
          {
            address: '滁州市',
            num: 680,
          },
          {
            address: '宣城市',
            num: 320,
          },
          {
            address: '黄山市',
            num: 190,
          },
          {
            address: '池州市',
            num: 200,
          },
          {
            address: '铜陵市',
            num: 100,
          },
          {
            address: '宿州市',
            num: 130,
          },
        ],
      }
    },
  },
] as MockMethod[]
