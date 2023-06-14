<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition :name="getTransitionName({
        route,
        openCache,
        enableTransition: getEnableTransition,
        cacheTabs: getCaches,
        def: getBasicTransition,
      })
        " mode="out-in" appear>
        <keep-alive :include="getCaches">
          <PageWrapper :key="route.name">
            <component :is="Component" />
          </PageWrapper>
        </keep-alive>
      </transition>
    </template>
  </RouterView>
</template>

<script setup lang="ts" name="LayoutContent">
import type { FunctionalComponent } from 'vue'
import type { RouteLocation } from 'vue-router'
import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { PageWrapper } from '@/components/Page'

interface DefaultContext {
  Component: FunctionalComponent & { type: Recordable }
  route: RouteLocation
}

const { getOpenKeepAlive, getShowMultiTabs } = useRootSetting()
const { getBasicTransition, getEnableTransition } = useTransitionSetting()
const tabStore = useMultipleTabStore()

const openCache = computed(
  () => unref(getOpenKeepAlive) && unref(getShowMultiTabs)
)

const getCaches = computed((): string[] => {
  if (!unref(getOpenKeepAlive)) {
    return []
  }
  return tabStore.getCachedTabList
})

const getTransitionName = ({
  route,
  openCache,
  cacheTabs,
  enableTransition,
  def,
}: Pick<DefaultContext, 'route'> & {
  enableTransition: boolean
  openCache: boolean
  def: string
  cacheTabs: string[]
}): string | undefined => {
  if (!enableTransition) {
    return undefined
  }

  const isInCache = cacheTabs.includes(route.name as string)
  let name: string | undefined = ''

  if (openCache) {
    name = isInCache && route.meta.loaded ? def : undefined
  }
  return name || (route.meta.transitionName as string) || def
}
</script>
