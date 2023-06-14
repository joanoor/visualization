<template>
  <div flex>
    <div
      v-for="(item, index) in buttonList"
      class="button"
      :class="item.border ? 'toogle-border ' : ''"
      flex
      items-center
      mr-3
      :style="
        activeIndex === index
          ? 'color:var(--el-color-primary)'
          : 'color:#4E5969'
      "
      @click="handleClick(item, index)"
    >
      <el-icon cursor-pointer inherit mr-1 :size="item.size ?? 18">
        <SvgIcon :name="item.icon"></SvgIcon>
      </el-icon>
      <span v-if="item.label" style="font-size: inherit">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ButtonStruct } from '@/types'

const emit = defineEmits(['update:active', 'toggle'])

const props = defineProps<{
  buttonList: ButtonStruct[]
  active: number | string
}>()

const activeIndex = computed({
  get: () => props.active,
  set: value => {
    emit('update:active', value)
  },
})

const handleClick = (item: ButtonStruct, index: number) => {
  activeIndex.value = index
  emit('toggle', item)
}
</script>

<style scoped lang="scss">
.toogle-border {
  border-right: solid 1px #d9d9d9;
  padding-right: 12px;
}
</style>
