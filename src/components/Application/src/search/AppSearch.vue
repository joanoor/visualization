<template>
  <el-tooltip content="搜索" :hide-after="0" placement="bottom" effect="dark">
    <div
      circle-8
      f-c-c
      cursor-pointer
      class="bg-#f2f3f5"
      @click="changeModal(true)"
    >
      <el-icon :size="14">
        <IAntDesignSearchOutlined />
      </el-icon>
    </div>
  </el-tooltip>
  <AppSearchModal @close="changeModal(false)" :visible="showModal" />
</template>
<script setup lang="ts" name="AppSearch">
import AppSearchModal from './AppSearchModal.vue'

const showModal = ref(false)
const changeModal = (show: boolean) => {
  showModal.value = show
}
</script>
