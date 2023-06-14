<template>
  <div p-5>
    <el-row :gutter="24">
      <el-col :span="4.5" class="flex!" items-center v-for="item in exhibits">
        <slot>
          <el-icon :size="item.iconSize ?? 40" mr-3>
            <template v-if="item.icon === 'blueArchive'">
              <i-iemp-blue-archive></i-iemp-blue-archive>
            </template>
            <template v-else-if="item.icon === 'greenArchive'">
              <i-iemp-green-archive></i-iemp-green-archive>
            </template>
            <template v-else-if="item.icon === 'blueArchive2'">
              <i-iemp-blue-archive2></i-iemp-blue-archive2>
            </template>
            <template v-else-if="item.icon === 'goldArchive'">
              <i-iemp-gold-archive></i-iemp-gold-archive>
            </template>
            <template v-else>
              <i-iemp-red-archive></i-iemp-red-archive>
            </template>
          </el-icon>
          <div flex-col justify-between>
            <div mb-3>{{ item.label }}</div>
            <div heavier numeric>{{ item.count }}</div>
          </div>
        </slot>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ShowCaseStruct } from '@/types'

const props = defineProps<{
  exhibits: ShowCaseStruct[]
}>()

const spanNum = computed(() => 24 / props.exhibits.length)
</script>

<style scoped lang="scss">
div[p-5] {
  border-bottom: solid 1px #e5e6eb;
}

div[heavier] {
  &::after {
    content: '个';
    color: #4e5969;
    font-size: 12px;
    font-weight: 400;
    margin-left: 8px;
  }
}
.el-col {
  // padding-left: 20px !important;
  &:not(:last-child) {
    border-right: solid 1px #f2f3f5;
  }
}
</style>
