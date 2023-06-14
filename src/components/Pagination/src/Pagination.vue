<template>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="pageSizes"
    :layout="layout"
    :total="total"
    flex justify-end pr-4
  ></el-pagination>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const emit = defineEmits(['update:current', 'update:size'])

const props = withDefaults(
  defineProps<{
    total: number
    pageSizes?: number[]
    size: number
    current: number
    layout?: string
  }>(),
  {
    total: 0,
    pageSizes: () => [10, 30, 50, 100],
    current: 1,
    size: 10,
    layout: 'total, prev, pager, next, sizes',
  }
)

const currentPage = computed({
  get: () => props.current,
  set: value => {
    emit('update:current', value)
  },
})

const pageSize = computed({
  get: () => props.size,
  set: value => {
    emit('update:size', value)
  },
})
</script>
