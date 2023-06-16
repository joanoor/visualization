<template>
  <div absolute inset-0 top-24.75 class="dashboard">
    <Feature
      :feature-style="{
        width: '666px',
        height: '288px',
      }"
      class="left-top"
      mb-28
    >
      <div pl-4>
        <Row
          :first-count="convertToThousands(731115)"
          :secound-count="convertToThousands(653115)"
          percent="10.67 %"
          type="单相表"
        ></Row>
        <Row
          :first-count="convertToThousands(731115)"
          :secound-count="convertToThousands(653115)"
          percent="10.67 %"
          type="三相表"
        ></Row>
        <Row
          :first-count="convertToThousands(731115)"
          :secound-count="convertToThousands(653115)"
          percent="10.67 %"
          type="集中器"
        ></Row>
        <Row
          :first-count="convertToThousands(731115)"
          :secound-count="convertToThousands(653115)"
          percent="10.67 %"
          type="专变终端"
        ></Row>
      </div>
    </Feature>

    <Feature
      :feature-style="{
        width: '666px',
        height: '215px',
      }"
      title="仓储配送"
      desc="Warehousing & Distribution"
      class="left-center"
      mb-5
    >
      <template #operator>
        <el-radio-group v-model="activeRadio" size="large">
          <el-radio-button v-for="item in radioList" :label="item.label" />
        </el-radio-group>
      </template>
      <div flex pl-5 justify-between mt-5>
        <div class="meter single-meter" flex-col items-center>
          <p class="count" @click="handleAssets">
            {{ convertToThousands(42976) }}
          </p>
          <p class="desc" mb-5>单相表</p>
          <img :src="singleMeter" alt="" />
        </div>
        <div class="meter three-meter" flex-col items-center>
          <p class="count">{{ convertToThousands(9578) }}</p>
          <p class="desc" mb-5>三相表</p>
          <img :src="threeMeter" alt="" />
        </div>
        <div class="meter hub-meter" flex-col items-center>
          <p class="count">{{ convertToThousands(3416) }}</p>
          <p class="desc" mb-4>集中器</p>
          <img :src="hubMeter" alt="" />
        </div>
        <div class="meter tmnl-meter" flex-col items-center>
          <p class="count">{{ convertToThousands(2873) }}</p>
          <p class="desc" mb-4>专变终端</p>
          <img :src="tmnlMeter" alt="" />
        </div>
      </div>
    </Feature>

    <Center></Center>
  </div>
</template>

<script setup lang="ts">
import Feature from './components/Feature.vue'
import Row from './components/Row.vue'
import Center from './components/Center.vue'
import { convertToThousands } from '@nrzt/core'
import singleMeter from '@/assets/icons/singleMeter.svg'
import threeMeter from '@/assets/icons/threeMeter.svg'
import hubMeter from '@/assets/icons/hubMeter.svg'
import tmnlMeter from '@/assets/icons/tmnlMeter.svg'

const router = useRouter()

const { radioList, activeRadio } = useRadioGroup(
  () => [
    {
      label: '合格在库数量',
    },
    {
      label: '高库龄资产数量',
    },
  ],
  {
    onDefault(data) {
      nextTick(() => {
        activeRadio.value = data[0].label
      })
    },
    onChange(value) {},
  }
)

const handleAssets = () => {
  router.push({
    path: '/assets',
    query: {},
  })
}
</script>

<style scoped lang="scss">
.dashboard {
  padding-left: 22px;
  padding-right: 10px;
  padding-bottom: 36px;
}

.left-center {
  .meter {
    width: 113.09px;
    height: 142px;
    background-image: url('@/assets/meter-bg.svg');
    background-size: cover;
    background-position: center center;
    .count {
      font-family: 'DIN Alternate';
      font-weight: 700;
      color: #fff;
      font-size: 28px;
      height: 32px;
      line-height: 32px;
      text-align: left;
      margin-bottom: 3px;
    }
    .desc {
      font-family: Source Han Sans CN;
      color: #a7cdfa;
      font-size: 16px;
    }
  }
  .single-meter {
    img {
      width: 34.17px;
      height: 48.84px;
    }
  }
  .three-meter {
    img {
      width: 29.55px;
      height: 48.84px;
    }
  }
  .hub-meter {
    img {
      width: 50.58px;
      height: 60.02px;
    }
  }
  .tmnl-meter {
    img {
      width: 50.58px;
      height: 60.02px;
    }
  }
}
</style>

<style lang="scss">
.el-radio-button {
  --el-radio-button-checked-bg-color: #10a5aa;
  --el-radio-button-checked-text-color: var(--el-color-white);
  --el-radio-button-checked-border-color: #10a5aa;
  --el-radio-button-disabled-checked-fill: var(--el-border-color-extra-light);
}
.is-active {
  .el-radio-button {
    --el-radio-button-checked-bg-color: #10a5aa;
    --el-radio-button-checked-text-color: var(--el-color-white);
    --el-radio-button-checked-border-color: #10a5aa;
    --el-radio-button-disabled-checked-fill: var(--el-border-color-extra-light);
  }
}
.el-radio-button__inner {
  background: rgba(0, 0, 0, 0);
  border-color: #275faf;
  color: #fff;
}
</style>
