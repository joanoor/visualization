<template>
  <el-popover
    placement="bottom"
    :width="width"
    trigger="click"
    :show-arrow="false"
    :hide-after="0"
  >
    <template #reference>
      <slot></slot>
    </template>
    <div fcol-c-c>
      <div
        w-full
        text-left
        cursor-pointer
        hover:text-primary
        v-for="(item, index) in operates"
        :class="index + 1 !== operates.length ? 'mb-3' : ''"
        @click="item.callback && item.callback(row)"
      >
        {{ item.showLabel(row) }}
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { OperateStruct } from '@/types'

withDefaults(
  defineProps<{
    operates: OperateStruct[]
    row?: Recordable
    width?: number
  }>(),
  {
    width: 100,
  }
)
</script>

<style scoped></style>
