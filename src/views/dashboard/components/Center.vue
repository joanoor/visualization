<template>
  <div class="center" absolute>
    <div class="center-icon" absolute>
      <div class="title">需求提报</div>
    </div>
    <div class="center-icon" absolute></div>
    <div class="center-icon" absolute></div>
    <div class="center-icon" absolute></div>
    <div class="center-icon" absolute></div>
    <div class="center-icon" absolute></div>
    <!-- <img :src="requirement" alt="" class="center-icon" absolute />
    <img :src="warehousing" alt="" class="center-icon" absolute />
    <img :src="equipment" alt="" class="center-icon" absolute />
    <img :src="recycling" alt="" class="center-icon" absolute />
    <img :src="utilization" alt="" class="center-icon" absolute />
    <img :src="scrapping" alt="" class="center-icon" absolute /> -->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.center {
  background-image: url('@/assets/center-bg.svg');
  background-size: cover;
  background-position: center center;
  width: 719.47px;
  height: 513.6px;
  left: 811.26px;
  right: 772px;
  bottom: 209.37px;
  top: 217.03px;
  .center-icon {
    .title {
      position: absolute;
      width: 140px;
      height: 44px;
      font-family: Source Han Sans CN;
      font-weight: 700;
      color: #ecc832;
      font-size: 28px;
      line-height: 44px;
      text-align: center;
      background-image: linear-gradient(
        180deg,
        rgba(242, 209, 29, 0.42) 0%,
        rgba(3, 122, 196, 0) 100%
      );
      border: 1px solid;
      border-color: #e7b52c;
      border-radius: 30px;
    }
    &:first-child {
      width: 179.54px;
      height: 183.8px;
      left: -68.51px;
      top: 74.25px;
      background-image: url('@/assets/icons/requirement.svg');
      background-size: cover;
      background-position: center center;
    }
    &:nth-child(2) {
      width: 174.64px;
      height: 178.82px;
      top: -80.7px;
      left: 205.57px;
      background-image: url('@/assets/icons/warehousing.svg');
      background-size: cover;
      background-position: center center;
    }
    &:nth-child(3) {
      width: 174.26px;
      height: 178.43px;
      top: 5.04px;
      left: 525.72px;
      background-image: url('@/assets/icons/equipment.svg');
      background-size: cover;
      background-position: center center;
    }
    &:nth-child(4) {
      width: 178.03px;
      height: 182.26px;
      top: 240.42px;
      left: 583.92px;
      background-image: url('@/assets/icons/recycling.svg');
      background-size: cover;
      background-position: center center;
    }
    &:nth-child(5) {
      width: 178.03px;
      height: 182.26px;
      top: 387.94px;
      left: 348.7px;
      background-image: url('@/assets/icons/utilization.svg');
      background-size: cover;
      background-position: center center;
    }
    &:last-child {
      width: 186.66px;
      height: 191.04px;
      top: 331.89px;
      left: 24.62px;
      background-image: url('@/assets/icons/scrapping.svg');
      background-size: cover;
      background-position: center center;
    }
  }
}
</style>
