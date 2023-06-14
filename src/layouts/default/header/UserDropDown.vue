<template>
  <el-dropdown
    :popper-options="{
      modifiers: [{ name: 'arrow', options: { gpuAcceleration: false } }],
    }"
    :popper-class="prefixCls"
  >
    <el-icon :size="32">
      <SvgIcon name="avatar"></SvgIcon>
    </el-icon>
    <template #dropdown>
      <div
        px-4
        py-1.5
        truncate
        class="border-b-#E5E6EB"
        border-b-1
        border-b-solid
      >
        {{ timeSayHello + '，' + (useUser.userInfo.userName || '游客') }}
      </div>
      <el-dropdown-menu>
        <el-dropdown-item :icon="SwitchButton">
          <span class="ml-1" @click="useUser.loginOutByUser">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'
import { useDesign } from '@/hooks/web/useDesign'
import { SwitchButton } from '@element-plus/icons-vue'

const { prefixCls } = useDesign('app-user-dropdown')
const useUser = useUserStore()

const timeSayHello = computed(() => {
  let date = new Date().getHours()
  let hoursTip = ''
  if (date >= 0 && date < 12) {
    hoursTip = '上午好'
  } else if (date >= 12 && date < 18) {
    hoursTip = '下午好'
  } else {
    hoursTip = '晚上好'
  }
  return hoursTip
})
</script>
<style lang="scss">
$prefix-cls: #{$namespace}-app-user-dropdown;

.#{$prefix-cls} {
  .el-popper__arrow {
    display: none;
  }
}
</style>
