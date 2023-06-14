<template>
  <el-input
    class="search-input"
    placeholder=" 关键词搜索（选填）"
    v-model="value"
    @keyup.enter.native="$emit('search', value)"
    @clear="$emit('search', value)"
    clearable
    :size="size"
  >
    <template #append>
      <slot>
        <el-button
          :icon="Search"
          class="search-button"
          :size="size"
          @click="$emit('search', value)"
          type="primary"
        ></el-button>
      </slot>
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'

withDefaults(
  defineProps<{
    size?: '' | 'default' | 'small' | 'large'
  }>(),
  {
    size: 'default',
  }
)

defineEmits(['search'])
const value = ref('')
</script>

<style lang="scss" scoped>
.search-button {
  :deep(i.el-icon) {
    color: #1d2129;
  }
}
</style>
