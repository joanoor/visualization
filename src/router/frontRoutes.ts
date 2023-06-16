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
        title: '大屏',
        icon: 'example',
      },
    },
    {
      name: 'requirement',
      path: '/requirement',
      component: () => import('@/views/dashboard/requirement.vue'),
      meta: {
        title: '需求提报',
        icon: 'example',
      },
    },
    {
      name: 'assets',
      path: '/assets',
      component: () => import('@/views/dashboard/assets.vue'),
      meta: {
        title: '高库龄资产详情',
        icon: 'example',
      },
    },
  ],
} as RouteRecordRaw
