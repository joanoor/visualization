<template>
  <el-icon
      v-if="getShowRedo"
      :size="14"
      :class="loading ? 'animate-spin' : ''"
      cursor-pointer
      @click="handleRedo"
    >
      <i-ant-design-redo-outline></i-ant-design-redo-outline>
    </el-icon>
</template>
<script lang="ts" setup>
import useMultiTabs from '@/hooks/web/useMultiTabs'

const loading = ref(false)

const { getShowRedo } = useMultipleTabSetting()
const { refreshPage } = useMultiTabs()

async function handleRedo() {
  loading.value = true
  await refreshPage()
  loading.value = false
}
</script>
