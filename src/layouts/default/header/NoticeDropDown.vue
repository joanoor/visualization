<template>
  <el-dropdown
    :popper-options="{
      modifiers: [{ name: 'arrow', options: { gpuAcceleration: false } }],
    }"
    :popper-class="prefixCls"
  >
    <div circle-8 f-c-c cursor-pointer class="bg-#f2f3f5">
      <el-icon :size="14">
        <el-badge is-dot :hidden="false">
          <IEpBell />
        </el-badge>
      </el-icon>
    </div>
    <template #dropdown>
      <el-empty description="暂无内容">
        <template #image>
          <el-icon :size="160">
            <SvgIcon name="404"></SvgIcon>
          </el-icon>
        </template>
      </el-empty>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign'

const { prefixCls } = useDesign('app-notice-dropdown')
</script>
<style lang="scss">
$prefix-cls: #{$namespace}-app-notice-dropdown;

.#{$prefix-cls} {
  .el-popper__arrow {
    display: none;
  }
}
</style>
