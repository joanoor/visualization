<template>
  <div flex justify-between>
    <div class="feature-title" relative>
      <i-iemp-arrow absolute class="top-1/2"></i-iemp-arrow>
      {{ title }}
    </div>
    {{ title }}
  </div>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  title?: string
}>(), {
  title: '需求提报'
})

</script>

<style scoped lang="scss">
.feature-title {
  width: 211px;
  height: 40px;
  background-image: linear-gradient(270deg, rgba(4, 18, 44, 0) 0%, rgba(32, 128, 198, 0.7) 61.58%, rgba(1, 19, 43, 0.1) 100%)
}
</style>