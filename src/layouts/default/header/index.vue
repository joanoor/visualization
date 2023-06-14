<template>
  <div flex justify-between h-full :class="getHeaderClass">
    <div class="w-70%" flex style="--menu-width: auto">
      <AppAvatar mr-16></AppAvatar>
      <LayoutMenu
        v-if="getShowTopMenu"
        mode="horizontal"
        :is-router="getShowTopMenu"
      ></LayoutMenu>
    </div>
    <div flex items-center :class="`${prefixCls}-action`">
      <AppSearch v-if="getShowSearch"></AppSearch>
      <AppDarkModeToggle v-if="getShowThemeToggle"></AppDarkModeToggle>
      <ToggleFullScreen v-if="getShowFullScreen"></ToggleFullScreen>
      <NoticeDropDown v-if="getShowNotice"></NoticeDropDown>
      <UserDropDown v-if="getShowUser"></UserDropDown>
    </div>
  </div>
</template>

<script lang="ts" setup name="LayoutHeader">
import UserDropDown from './UserDropDown.vue'
import {
  AppAvatar,
  AppSearch,
  AppDarkModeToggle,
} from '@/components/Application'
import ToggleFullScreen from './ToggleFullScreen.vue'
import NoticeDropDown from './NoticeDropDown.vue'
import LayoutMenu from '../menu/index.vue'

const {
  getShowFullScreen,
  getShowNotice,
  getShowSearch,
  getShowUser,
  getShowThemeToggle,
} = useHeaderSetting()
const { getTheme, getShowTopMenu } = useRootSetting()

const { prefixCls } = useDesign('layout-header')
const getHeaderClass = computed(() => {
  return [
    prefixCls,
    {
      [`${prefixCls}--${getTheme.value}`]: getTheme.value,
    },
  ]
})
</script>

<style lang="scss">
$prefixCls: #{$namespace}-layout-header;

.#{$prefixCls} {
  &-action {
    > div:not(:last-child) {
      margin-right: 1rem;
    }
  }

  // &--dark {
  //   background-color: $header-dark-bg-color !important;
  //   // border-bottom: 1px solid @border-color-base;
  //   border-left: 1px solid $border-color-base;
  //   .#{$header-prefix-cls}-logo {
  //     &:hover {
  //       background-color: $header-dark-bg-hover-color;
  //     }
  //   }

  //   .#{$header-prefix-cls}-action {
  //     &__item {
  //       .app-iconify {
  //         padding: 0 10px;
  //         font-size: 16px !important;
  //       }

  //       .ant-badge {
  //         span {
  //           color: $white;
  //         }
  //       }

  //       &:hover {
  //         background-color: $header-dark-bg-hover-color;
  //       }
  //     }
  //   }
  // }
}
</style>
