<template>
  <div
    class="treebox"
    flex-col
    justify-between
    :style="{ width: width, height: height }"
  >
    <div>
      <div class="treebox-title" w-full flex items-center font-500 truncate>
        <slot name="title">{{ title }}</slot>
      </div>
      <slot></slot>
    </div>
    <div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '100%',
    title: '',
  }
)
</script>

<style scoped lang="scss">
.treebox {
  border: solid 1px #e5e6eb;
  border-radius: 4px;
  .treebox-title {
    height: 40px;
    background: #f7f8fa;
    padding-left: 10px;
    padding-right: 10px;
  }
  .treebox-bottom {
    padding: 12px 8px;
  }
}
</style>
