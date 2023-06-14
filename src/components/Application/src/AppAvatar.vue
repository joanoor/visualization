<template>
  <div flex items-center h-full>
    <!-- <img src="/sc.svg" mr-2 class="banner" /> -->
    <el-icon :size="40" color="var(--el-color-primary)">
      <SvgIcon name="sc" mr-2></SvgIcon>
    </el-icon>
    <div ml-2 heaviest>{{ projectName }}</div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
const useApp = useAppStore()

const projectName = computed(() => useApp.getProjectConfig.projectName)
</script>

<style scoped></style>
