import { ResultMenuStruct } from '@/types'

/**
 * 当不是动态路由的时候，则使用这里的菜单配置
 */
export type Menu = Pick<ResultMenuStruct, 'perms' | 'icon' | 'menuName'> & {
  children: Menu[]
}

export const menuList: Menu[] = [
  {
    perms: 'control',
    icon: 'control',
    menuName: '空调柔性调控',
    children: [
      {
        perms: 'payloadData',
        menuName: '负荷数据',
        children: [],
      },
      {
        perms: 'policyExec',
        menuName: '策略执行',
        children: [],
      },
      {
        perms: 'confDebug',
        menuName: '配置调试',
        children: [],
      },
      {
        perms: 'deviceMonitor',
        menuName: '设备监控',
        children: [],
      },
      {
        perms: 'dossierManage',
        menuName: '档案管理',
        children: [],
      },
    ],
  },
  {
    perms: 'system',
    menuName: '系统管理',
    icon: 'system',
    children: [
      {
        perms: 'fields',
        menuName: '字段管理',
        children: [],
      },
    ],
  },
]
