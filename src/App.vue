<template>
  <ElConfigProvider :locale="zhCn">
    <AppProvider>
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </AppProvider>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { AppProvider } from './components/Application'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>
