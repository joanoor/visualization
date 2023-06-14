import { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from './constant'

// 下面是基础的网页
export default {
  component: LAYOUT,
  path: '/',
  redirect: '/dashboard',
  children: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: {
        title: '负荷数据',
        icon: 'example',
      },
    },
  ],
} as RouteRecordRaw
