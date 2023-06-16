<template>
  <img class="header-bg" :src="headerBg" alt="" />
  <img class="header-title" :src="headerTitle" alt="" />
  <p absolute>{{ time }}</p>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { PollingAction } from '@nrzt/core'
import headerBg from '@/assets/header-bg.svg'
import headerTitle from '@/assets/header-title.svg'

const time = ref('')

const polling = new PollingAction(
  () => {
    time.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
  1000,
  true
)
polling.start()
</script>

<style scoped lang="scss">
img.header-bg {
  position: absolute;
  transform: translateY(-15px);

  width: 2304px;
  height: 101px;
}
img.header-title {
  position: absolute;
  margin-left: 50%;
  transform: translateX(-50%);
  top: 18px;
}
p {
  font-family: DS-Digital;
  color: #fff;
  font-size: 20px;
  line-height: 13.37px;
  top: 22px;
  right: 166px;
}
</style>
