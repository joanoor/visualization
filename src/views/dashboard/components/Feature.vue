<template>
  <div :style="{ ...featureStyle }">
    <div flex justify-between>
      <div class="feature-title" relative>
        <img :src="arrow" absolute class="top-1/2 -translate-y-1/2" left-1.5 />
        <p absolute class="top-1/2 -translate-y-1/2" left-8 whitespace-nowrap>
          <span class="color-#fff text-size-5">{{ title + ' / ' }}</span>
          <span class="color-#1f66b4 text-size-4">{{ desc }}</span>
        </p>
      </div>
      <div class="feature-operator">
        <slot name="operator"></slot>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import arrow from '@/assets/icons/arrow.svg'
import { CSSProperties } from 'vue'

withDefaults(
  defineProps<{
    title?: string
    desc?: string
    featureStyle: CSSProperties
  }>(),
  {
    title: '需求提报',
    desc: 'Requirement Submission',
  }
)
</script>

<style scoped lang="scss">
.feature-title {
  width: 211px;
  height: 40px;
  background-image: linear-gradient(
    270deg,
    rgba(4, 18, 44, 0) 0%,
    rgba(32, 128, 198, 0.7) 61.58%,
    rgba(1, 19, 43, 0.1) 100%
  );

  img {
    width: 21px;
    height: 16px;
  }
}

.tmnl {
  width: 574px;
  height: 36px;
  background-image: linear-gradient(
    180deg,
    rgba(54, 138, 211, 0) 0%,
    rgba(21, 61, 108, 0.5) 100%
  );
}
</style>
