<template>
  <div v-if="getShowLayoutFooter" ref="footerRef">
    <p text-center class="text-#86909c" mb-2.5>
      Copyright 2009-{{ year }} 安徽南瑞中天电力电子有限公司. All Rights
      Reserved.
      <a target="_blank" color="#86909c" href="https://beian.miit.gov.cn/#/Integrated/index">
        皖ICP备09009966号
      </a>
    </p>
    <p text-center class="text-#86909c" mb-2.5>
      电话：0551-63353090｜传真：0551-63356200｜邮编：230051｜地址：合肥市高新区创新大道2800号合肥创新产业园二期G1楼
    </p>
    <p text-center class="text-#86909c">
      技术支持：安徽南瑞中天电力电子有限公司｜技术电话：0551-65336307
    </p>
  </div>
</template>

<script setup lang="ts" name="LayoutFooter">
import { formatToDate } from '@nrzt/core'
const { getShowFooter } = useRootSetting()
const { currentRoute } = useRouter()

const year = computed(() => formatToDate(undefined, 'YYYY'))
const footerRef = ref<HTMLElement>()
const getShowLayoutFooter = computed(() => {
  return unref(getShowFooter) && !unref(currentRoute).meta?.hiddenFooter
})
</script>
