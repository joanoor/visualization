<template>
  <div
    :class="getWrapClass"
    v-if="getShowMultiTabs"
    flex
    justify-between
    items-center
    pr-4
  >
    <el-tabs
      type="card"
      closable
      v-model="activeKeyRef"
      size="small"
      @tab-remove="removeTab"
      @tab-change="handleChange"
    >
      <template
        v-for="item in getTabsState"
        :key="item.query ? item.fullPath : item.path"
      >
        <el-tab-pane
          :closable="!(item && item.meta && item.meta.affix)"
          :name="item.path"
        >
          <template #label>
            <TabContent :tabItem="item" />
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>

    <TabRedo></TabRedo>
  </div>
</template>
<script lang="ts" setup name="LayoutMultiTabs">
import type { RouteLocationNormalized, RouteMeta } from 'vue-router'
import TabContent from './components/TabContent.vue'
import TabRedo from './components/TabRedo.vue'
import { useGo } from '@/hooks/web/usePage'
import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { initAffixTabs, useTabsDrag } from './useMultipleTabs'
import { REDIRECT_NAME } from '@/router/constant'
import { listenerRouteChange } from '@/logics/mitt/routeChange'

const { getShowMultiTabs } = useRootSetting()

const affixTextList = initAffixTabs()
const activeKeyRef = ref('')
useTabsDrag(affixTextList)

const tabStore = useMultipleTabStore()
const router = useRouter()
const { prefixCls } = useDesign('multiple-tabs')

const go = useGo()

const getTabsState = computed(() => {
  return tabStore.getTabList.filter(item => !item.meta?.hideTab)
})

const unClose = computed(() => unref(getTabsState).length === 1)

const getWrapClass = computed(() => {
  return [
    prefixCls,
    {
      [`${prefixCls}--hide-close`]: unref(unClose),
    },
  ]
})

listenerRouteChange(route => {
  const { name } = route
  if (name === REDIRECT_NAME || !route) {
    return
  }

  const { path, fullPath, meta = {} } = route
  const { currentActiveMenu, hideTab } = meta as RouteMeta
  const isHide = !hideTab ? null : currentActiveMenu
  const p = isHide || fullPath || path
  if (activeKeyRef.value !== p) {
    activeKeyRef.value = p as string
  }
  if (isHide) {
    const findParentRoute = router
      .getRoutes()
      .find(item => item.path === currentActiveMenu)

    findParentRoute &&
      tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized)
  } else {
    tabStore.addTab(unref(route))
  }
})

function handleChange(activeKey: any) {
  activeKeyRef.value = activeKey
  go(activeKey, false)
}

const removeTab = (targetKey: any) => {
  if (unref(unClose)) {
    return
  }

  tabStore.closeTabByKey(targetKey, router)
}
</script>
<style lang="scss" scoped>
$prefixCls: #{$namespace}-multiple-tabs;
.#{$prefixCls} {
  background-color: #fff;
}
</style>
