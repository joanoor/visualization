<template>
  <div
    fixed
    z-10
    class="top-1/2"
    flex-col
    transform
    style="--un-translate-y: -50%"
    right--15
    :class="prefixCls"
    v-if="getShowShortCuts"
  >
    <div class="item" flex-col justify-center items-center mb-.5>1</div>
    <div class="item" flex-col justify-center items-center mb-.5>2</div>
    <div class="item" flex-col justify-center items-center mb-.5>3</div>
    <div class="item" flex-col justify-center items-center>4</div>
  </div>
</template>

<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign'
const { prefixCls } = useDesign('short-cuts')
const { getShowShortCuts } = useRootSetting()
</script>

<style lang="scss" scoped>
$prefix-cls: #{$namespace}-short-cuts;

.#{$prefix-cls} {
  width: 70px;
  transition: right 0.3s;
  &:hover {
    right: 0;
  }
}
.item {
  background-color: red;
  border: solid 1px black;
  height: 70px;
}
</style>
