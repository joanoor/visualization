<template>
  <div flex items-center class="back" @click="handleBack">
    <div
      circle-4
      flex
      justify-center
      items-center
      border-solid
      class="border-#a7cdfa"
    >
      <el-icon :size="14" color="rgba(167, 205, 250, 1)">
        <ArrowLeft></ArrowLeft>
      </el-icon>
    </div>
    <span cursor-pointer ml-1>返回</span>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()
const handleBack = () => {
  router.go(-1)
}
</script>

<style scoped lang="scss">
.back {
  font-family: Source Han Sans CN;
  color: #a7cdfa;
  font-size: 16px;
}
</style>
