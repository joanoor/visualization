<template>
  <div class="assets" relative p-5>
    <Back absolute right-0 top-0></Back>

    <div class="show-case" flex justify-between items-center mb-5>
      <div class="btn-area">合肥</div>
      <div class="btn-area">肥东</div>
      <div class="btn-area">肥西</div>
      <div class="btn-area">长丰</div>
      <div class="btn-area">巢湖</div>
      <div class="btn-area">庐江</div>
    </div>

    <div flex pt-6 class="assets-row">
      <p class="flag">单相表</p>
      <div flex-1 flex justify-between items-center mt-7 pr-5>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
      </div>
    </div>
    <div flex pt-6 class="assets-row">
      <p class="flag">三相表</p>
      <div flex-1 flex justify-between items-center mt-7 pr-5>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
      </div>
    </div>
    <div flex pt-6 class="assets-row">
      <p class="flag">集中器</p>
      <div flex-1 flex justify-between items-center mt-7 pr-5>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
      </div>
    </div>
    <div flex pt-6 class="assets-row">
      <p class="flag">专变终端</p>
      <div flex-1 flex justify-between items-center mt-7 pr-5>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
        <AssetsBlock></AssetsBlock>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Back from './components/Back.vue'
import AssetsBlock from './components/AssetsBlock.vue'
</script>

<style scoped lang="scss">
.assets {
  width: 2260px;
  height: 967px;
  margin: 0 auto;
  padding-top: 69px;
  background-image: url('@/assets/table-border.svg');
  background-size: cover;
  background-position: center center;
  transform: translateY(87px);

  .show-case {
    width: 2220px;
    height: 80px;
    background-color: rgba(122, 207, 232, 0.06);
    padding-left: 150px;
    padding-right: 53px;
    .btn-area {
      width: 249px;
      height: 50px;
      text-align: center;
      cursor: pointer;
      line-height: 50px;
      background-image: url('@/assets/button-bg.svg');
      background-size: cover;
      background-position: center center;
      font-family: Source Han Sans CN;
      font-weight: 700;
      color: #27e2da;
      font-size: 24px;
    }
  }

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

  .assets-row:not(:last-child) {
    padding-bottom: 43.49px;
    padding-right: 15px;
    border-bottom: dashed 1px #23848d;
  }
}
</style>
