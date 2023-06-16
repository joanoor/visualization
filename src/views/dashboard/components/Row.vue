<template>
  <div flex mt-5 relative class="row">
    <p class="flag">{{ type }}</p>
    <div flex>
      <div class="cell">
        <p class="count" cursor-pointer @click="handleRequirement">
          {{ firstCount }}
        </p>
        <p class="desc">年初下达数量</p>
      </div>
      <div class="cell">
        <p class="count" cursor-pointer @click="handleRequirement">
          {{ secoundCount }}
        </p>
        <p class="desc">需求剩余数量</p>
      </div>
      <div class="cell">
        <p class="count" cursor-pointer @click="handleRequirement">
          {{ percent }}
        </p>
        <p class="desc">下达进度</p>
      </div>
      <img :src="rowBg" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import rowBg from '@/assets/row-bg.svg'

const router = useRouter()

defineProps<{
  type: string
  firstCount: number | string
  secoundCount: number | string
  percent: string | number
}>()

const handleRequirement = () => {
  router.push({
    path: '/requirement',
    query: {},
  })
}
</script>

<style scoped lang="scss">
.row {
  p.flag {
    width: 100px;
    height: 32px;
    font-family: Source Han Sans CN;
    color: #ffffff;
    font-size: 16px;
    line-height: 32px;
    padding-left: 7px;
    margin-right: 51px;
    background-image: url('@/assets/icons/arrow-flag.svg');
    background-size: cover;
    background-position: center center;
  }

  .cell:not(:last-child) {
    margin-right: 60px;
    .count {
      font-family: 'DIN Alternate';
      font-weight: 700;
      color: #fff;
      font-size: 28px;
      height: 32px;
      line-height: 32px;
      width: 100px;
      text-align: left;
      margin-bottom: 12px;
    }
    .desc {
      font-family: Source Han Sans CN;
      color: #a7cdfa;
      font-size: 16px;
    }
  }
  img {
    position: absolute;
    width: 574px;
    height: 41.75px;
    top: 45%;
    transform: translateX(-80px);
  }
}
</style>
