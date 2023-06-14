<template>
  <el-dropdown
    :trigger="trigger"
    v-bind="$attrs"
    :popper-options="{
      modifiers: [{ name: 'arrow', options: { gpuAcceleration: false } }],
    }"
    :popper-class="prefixCls"
  >
    <slot></slot>
    <template #dropdown>
      <slot name="append"></slot>
      <el-dropdown-menu>
        <template v-for="item in dropMenuList" :key="item.event">
          <el-dropdown-item
            @click="handleClickMenu(item)"
            :disabled="item.disabled"
            :divided="item.divider"
          >
            <el-popconfirm
              v-if="item.popConfirm"
              :title="item.popConfirm?.title"
            >
              <template #reference>
                <div flex items-center>
                  <Icon :icon="item.icon" mr-2 />
                  <span>{{ item.text }}</span>
                </div>
              </template>
            </el-popconfirm>
            <template v-else>
              <div flex items-center>
                <Icon :icon="item.icon" mr-2 />
                <span>{{ item.text }}</span>
              </div>
            </template>
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
const { prefixCls } = useDesign('app-dropdown')
import type { DropDownStruct } from '@/types'
import { Icon } from '@iconify/vue'

const props = withDefaults(
  defineProps<{
    trigger?: 'hover' | 'click' | 'contextmenu'
    dropMenuList?: DropDownStruct[]
    splitButton?: boolean
  }>(),
  {
    trigger: 'hover',
    dropMenuList: () => [],
    splitButton: false,
  }
)

const emit = defineEmits(['menuEvent'])

const handleClickMenu = (item: DropDownStruct) => {
  const { event } = item
  const menu = props.dropMenuList.find(item => `${item.event}` === `${event}`)
  emit('menuEvent', menu)
  item.handler?.()
}
</script>

<style lang="scss">
$prefix-cls: #{$namespace}-app-dropdown;

.#{$prefix-cls} {
  .el-popper__arrow {
    display: none;
  }
}
</style>
