<template>
  <div
    ref="divRef"
    flex-col
    justify-between
    :class="prefixCls"
    v-if="getShowMenu"
  >
    <LayoutMenu :is-collapse="isCollapse"></LayoutMenu>
    <div mb-4 mt-4 text-right pr-4 class="fold" v-if="getShowCollapsed">
      <el-icon
        cursor-pointer
        style="backgroundcolor: #f7f8fa"
        @click="toggleCollapse"
      >
        <IEpFold v-if="!isCollapse" />
        <IEpExpand v-else />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup name="LayoutSideBar">
import { useCssVar } from '@vueuse/core'
import LayoutMenu from '../menu/index.vue'
const { prefixCls } = useDesign('layout-sidebar')

const { getMenuWidth, getCollapsed, getShowCollapsed } = useMenuSetting()
const { getShowMenu } = useRootSetting()

const isCollapse = ref(getCollapsed.value)
const divRef = ref<HTMLElement>()
const width = useCssVar('--menu-width', divRef)
width.value = getMenuWidth.value + 'px'

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style lang="scss" scoped>
$prefixCls: #{$namespace}-layout-sidebar;

.#{$prefixCls} {
  height: 100%;
  background-color: var(--sider-bg-color);
}
</style>
