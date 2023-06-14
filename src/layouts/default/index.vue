<template>
  <ElContainer :class="getClass">
    <ElHeader :class="`${prefixCls}-header`" border-b-1 border-b-solid ref="headerRef"
      :style="'--el-header-height: ' + headerHeight" v-if="getShowHeader">
      <LayoutHeader></LayoutHeader>
    </ElHeader>
    <ElContainer :class="`${prefixCls}-container`" ref="containerRef">
      <LayoutSideBar></LayoutSideBar>
      <ElContainer direction="vertical">
        <LayoutMultiTabs></LayoutMultiTabs>
        <ElContainer :class="getContainerCls" direction="vertical">
          <LayoutBreadCrumb mb-4 v-if="getShowBreadCrumb"></LayoutBreadCrumb>
          <LayoutContent></LayoutContent>
          <LayoutFooter mt-6></LayoutFooter>
          <ElBacktop v-if="getShowBackToTop" :target="`.${getContainerCls}`"></ElBacktop>
        </ElContainer>
      </ElContainer>
    </ElContainer>
    <AppShortCuts />
  </ElContainer>
</template>

<script lang="ts" setup name="default">
import LayoutHeader from './header/index.vue'
import LayoutMultiTabs from './tabs/index.vue'
import LayoutSideBar from './sideBar/index.vue'
import LayoutBreadCrumb from './breadCrumb/index.vue'
import LayoutContent from './content/index.vue'
import LayoutFooter from './footer/index.vue'
import { AppShortCuts } from '@/components/Application'
import { useCssVar } from '@vueuse/core'

const { prefixCls } = useDesign('default-layout')
const { getHeaderHeight } = useHeaderSetting()
const { getShowBackToTop, getTheme, getShowHeader, getShowBreadCrumb } = useRootSetting()
const getClass = computed(() => {
  return [
    [prefixCls],
    {
      [`${prefixCls}--${unref(getTheme)}`]: !!unref(getTheme),
    },
  ]
})

// 如果是微前端的主应用，则需要特殊处理样式
const getContainerCls = computed(() => {
  return window.__MICRO_APP_BASE_APPLICATION__
    ? `${prefixCls}-container-main-micro-base`
    : window.__MICRO_APP_ENVIRONMENT__
      ? `${prefixCls}-container-main-micro-child`
      : `${prefixCls}-container-main`
})

const containerRef = ref<HTMLElement>()
const headerRef = ref<HTMLElement>()
const headerHeight = useCssVar('--el-header-height', headerRef)
headerHeight.value = getHeaderHeight.value + 'px'

const containerHeight = useCssVar('--container-height', containerRef)
containerHeight.value = getShowHeader.value ? `calc(100% - ${headerHeight.value})` : '100%'

</script>

<style lang="scss" scoped>
$prefixCls: #{$namespace}-default-layout;

.#{$prefixCls} {
  height: 100%;
  background-color: $bg-color-base-body;

  &--dark {
    background-color: darken($bg-color-base-body, 60%);
  }
}

.#{$prefixCls}-header {
  background-color: var(--header-bg-color);
  border-bottom-color: var(--header-border-color);
}

.#{$prefixCls}-container {
  height: var(--container-height, '100%');

  &-main,
  &-main-micro-base {
    padding: 0px;
    overflow-y: auto;
  }

  &-main-micro-child {
    padding: 0px;
  }
}
</style>
