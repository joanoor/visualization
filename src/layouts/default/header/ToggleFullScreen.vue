<template>
  <el-tooltip effect="dark" :content="tip" :hide-after="0" placement="bottom">
    <div circle-8 f-c-c cursor-pointer class="bg-#f2f3f5" @click="toggle">
      <el-icon :size="14" cursor-pointer>
        <IAntDesignFullscreenOutlined v-if="!isFullscreen" />
        <IAntDesignFullscreenExitOutlined v-else />
      </el-icon>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen(document.body)
const tip = computed(() => (isFullscreen.value ? '退出全屏' : '全屏'))
</script>

<style scoped></style>
