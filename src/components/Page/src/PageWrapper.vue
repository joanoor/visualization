<template>
  <div flex-1 class="pagewrapper" absolute inset-0>
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.pagewrapper {
  width: 2304px;

  background-image: linear-gradient(180deg, #0d3681 0%, #03143b 100%);

}
</style>
