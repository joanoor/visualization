<template>
  <div :class="getClass" @click="toggleTheme">
    <div :class="`${prefixCls}-inner`"></div>
    <el-icon :size="14">
      <SvgIcon name="sun" />
    </el-icon>
    <el-icon :size="14">
      <SvgIcon name="moon" />
    </el-icon>
  </div>
</template>
<script lang="ts" setup>
import {
  updateHeaderTheme,
  updateSideBarTheme,
  updateDarkTheme,
} from '@/logics/theme'

const { prefixCls } = useDesign('dark-switch')
const { getTheme, setTheme } = useRootSetting()

const isDark = computed(() => getTheme.value === 'dark')

const getClass = computed(() => [
  prefixCls,
  {
    [`${prefixCls}--dark`]: unref(isDark),
  },
])

function toggleTheme() {
  const theme = getTheme.value === 'dark' ? 'light' : 'dark'
  setTheme(theme)
  updateDarkTheme(theme)
  updateHeaderTheme()
  updateSideBarTheme()
}
</script>
<style lang="scss" scoped>
$prefix-cls: #{$namespace}-dark-switch;

html[data-theme='dark'] {
  .#{$prefix-cls} {
    border: 1px solid rgb(196 188 188);
  }
}

.#{$prefix-cls} {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  width: 50px;
  height: 26px;
  margin-left: auto;
  padding: 0 6px;
  border-radius: 30px;
  background-color: #151515;
  cursor: pointer;

  &-inner {
    position: absolute;
    z-index: 1;
    width: 18px;
    height: 18px;
    transition: transform 0.5s, background-color 0.5s;
    border-radius: 50%;
    background-color: #fff;
    will-change: transform;
  }

  &--dark {
    .#{$prefix-cls}-inner {
      transform: translateX(calc(100% + 2px));
    }
  }
}
</style>
