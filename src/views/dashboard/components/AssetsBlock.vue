<template>
  <div flex>
    <div
      :style="{
        width: '106px',
        height: '106px',
      }"
      mr-8
    >
      <Progress />
    </div>

    <div>
      <div class="show" mb-4>
        <span class="desc">采购总量</span>
        <span class="count">{{ convertToThousands(440000) }}</span>
      </div>
      <div class="show">
        <span class="desc">需求余量</span>
        <span class="count">{{ convertToThousands(440000) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertToThousands } from '@nrzt/core'
import Progress from './Progress.vue'
</script>

<style scoped lang="scss">
div.show {
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
  width: 132.75px;
  height: 41.51px;
  background-image: url('@/assets/show-bg.svg');
  background-size: cover;
  background-position: center center;

  .desc {
    font-family: Source Han Sans CN;
    color: #a7cdfa;
    font-size: 9px;
    // margin-right: 31.74px;
    transform: scale(0.75);
  }
  .count {
    font-family: DIN Alternate;
    font-weight: 700;
    color: #ffffff;
    font-size: 16px;
    text-align: right;
  }
}
</style>
