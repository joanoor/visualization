<template>
  <ScaleScreen
    :width="2304"
    :wrapper-style="wrapperStyle"
    :box-style="boxStyle"
  >
    <div flex-1 class="pagewrapper" relative>
      <Header></Header>
      <slot></slot>
    </div>
  </ScaleScreen>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue'
import { ScaleScreen } from '@/components/ScaleScreen'
import Header from '@/views/dashboard/components/Header.vue'

const wrapperStyle = ref<CSSProperties>({})
const boxStyle = ref<CSSProperties>({
  backgroundImage: 'linear-gradient(180deg, #0d3681 0%, #03143b 100%)',
  overflow: 'hidden',
})
</script>

<style scoped lang="scss"></style>
