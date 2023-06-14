<template>
  <el-menu
    :default-active="activeIndex"
    overflow-y-auto
    :mode="mode"
    :class="`el-menu-${mode}`"
    :collapse="isCollapse"
    :default-openeds="openedIndexs"
    @select="handleSelectMenu"
    :router="isRouter"
  >
    <template v-for="menu in menuList">
      <template v-if="menu.children && menu.children.length > 0">
        <el-sub-menu :key="menu.perms" :index="'/' + menu.perms">
          <template #title>
            <el-icon mr-3 :size="16">
              <SvgIcon :name="menu.icon"></SvgIcon>
            </el-icon>
            <span>{{ menu.menuName }}</span>
          </template>
          <template v-if="menu.children">
            <LayoutMenuItem :menu-items="menu.children"></LayoutMenuItem>
          </template>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="'/' + menu.perms">
          <el-icon mr-3 :size="16">
            <SvgIcon :name="menu.icon"></SvgIcon>
          </el-icon>
          <template #title>
            <span>{{ menu?.menuName }}</span>
          </template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script lang="ts" setup name="LayoutMenu">
import { ElMenu } from 'element-plus'
import LayoutMenuItem from './MenuItem.vue'
// import { usePermissionStore } from '@/store'
import { menuList } from '@/settings/menuSetting'

const router = useRouter()
const route = useRoute()
const { getSplitMenu } = useMenuSetting()

const activeIndex = ref('overview')
const openedIndexs = ref<string[]>([])
const props = withDefaults(
  defineProps<{
    isCollapse?: boolean
    mode?: 'horizontal' | 'vertical'
    isRouter?: boolean
  }>(),
  {
    isCollapse: false,
    mode: 'vertical',
    isRouter: false,
  }
)

const handleSelectMenu = (_index: string, indexPath: string[], a, b) => {
  if (!props.isRouter) {
    router.push(indexPath.join(''))
  }
}

// 当前激活的菜单
watchEffect(() => {
  if (route.matched && route.matched.length > 0) {
    const paths = route.path.split('/')
    if (route.meta.activeMenu) {
      activeIndex.value = '/' + route.meta.activeMenu
    } else {
      activeIndex.value = '/' + paths[paths.length - 1]
    }
    paths.length > 2 && (openedIndexs.value = ['/' + paths[1]])
  }
})

// 是否要切割菜单
watchEffect(() => {
  if (getSplitMenu.value) {
    // 当切割菜单的时候
    if (props.mode === 'horizontal') {
      // 如果菜单是水平的，则只展示一级菜单
    } else {
    }
  } else {
    // 当不是切割菜单的时候
    if (props.mode === 'horizontal') {
      // 如果菜单是水平的，则展示全部菜单
    } else {
    }
  }
})
</script>

<style lang="scss" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: var(--menu-width, 200px);
}

.el-menu-horizontal {
  width: var(--menu-width, 200px);
}
</style>
