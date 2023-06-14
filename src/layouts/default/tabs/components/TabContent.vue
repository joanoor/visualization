<template>
  <DropDown
    :dropMenuList="getDropMenuList"
    :trigger="getTrigger"
    placement="bottom"
    :class="prefixCls"
    @menu-event="handleMenuEvent"
  >
    <div
      :class="`${prefixCls}__info`"
      @contextmenu="handleContext"
      v-if="getIsTabs"
    >
      <span class="ml-1" hover:color-primary>{{ getTitle }}</span>
    </div>
  </DropDown>
</template>
<script lang="ts" setup>
import type { RouteLocationNormalized } from 'vue-router'
import { DropDown } from '@/components/DropDown'
// import Icon from '@/components/Icon/Icon.vue'
import { TabContentProps } from '@/types'
import { useTabDropdown } from '../useTabDropdown'

const props = withDefaults(
  defineProps<{
    tabItem: RouteLocationNormalized
    isExtra?: boolean
  }>(),
  {
    isExtra: false,
  }
)

const { prefixCls } = useDesign('multiple-tabs-content')
const { t } = useI18n()

const getTitle = computed(() => {
  const { tabItem: { meta } = {} } = props
  return meta && t(meta.title as string)
})

const getIsTabs = computed(() => !props.isExtra)
const getTrigger = computed<'contextmenu' | 'click' | 'hover'>(() =>
  unref(getIsTabs) ? 'contextmenu' : 'click'
)

const { getDropMenuList, handleMenuEvent, handleContextMenu } = useTabDropdown(
  props as TabContentProps,
  getIsTabs
)

function handleContext(e) {
  props.tabItem && handleContextMenu(props.tabItem)(e)
}
</script>

<style lang="scss">
$prefixCls: #{$namespace}-multiple-tabs-content;
.#{$prefixCls} {
  line-height: unset;
  color: inherit;
  &__info {
    color: inherit;
  }
}
</style>
