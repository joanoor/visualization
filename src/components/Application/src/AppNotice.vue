<template>
  <div class="notice-info">
    <div
      class="notice-type-container flex items-center justify-between pt-2 pb-2 pl-4 pr-4"
    >
      <div class="flex items-center">
        <div
          :class="activeType === notice.prop ? 'active-notice-type' : ''"
          class="flex notice-type pl-4 pr-4 cursor-pointer mr-2"
          v-for="notice in noticeType"
          :key="notice.prop"
          @click="handleClick(notice)"
        >
          {{ notice.label }}({{
            notice.prop === 'systemNotice'
              ? data.systemNoticeTotalNum
              : notice.prop === 'deviceNotice'
              ? data.deviceNoticeNum
              : data.noticeNum
          }})
        </div>
      </div>

      <el-button link size="default" type="primary">清空</el-button>
    </div>

    <div class="notice-container">
      <template v-if="data.showList.length === 0">
        <el-empty description="暂无内容" class="h-full">
          <template #image>
            <SvgIcon name="404" size="80"></SvgIcon>
          </template>
        </el-empty>
      </template>
      <template v-else>
        <div
          class="mynotice pl-5 pt-4 pr-5"
          v-for="item in data.showList"
          :key="item.desc"
        >
          <div class="flex items-center w-full mb-2">
            <TextEllipsis
              :message="item.title"
              class="announcement"
              height="auto"
            ></TextEllipsis>
            <el-tag class="mr-2" :type="item.type">
              {{ item.type === 'danger' ? '紧急' : '可疑' }}
            </el-tag>
          </div>
          <div v-html="item.desc"></div>
        </div>
      </template>
    </div>
    <div class="notice-button flex">
      <div class="flex flex-1 items-center justify-center h-full">
        <el-button link type="primary">全部已读</el-button>
      </div>
      <div class="flex flex-1 items-center justify-center h-full">
        <el-button link type="primary">查看更多</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import TextEllipsis from '@/components/TextEllipsis.vue'

interface Notice {
  title: string
  type: string
  desc: string
}

const data = reactive({
  systemNoticeTotalNum: 3,
  deviceNoticeNum: 2,
  noticeNum: 0,
  systemNoticeList: [] as Notice[],
  deviceNoticeList: [] as Notice[],
  noticeList: [] as Notice[],
  showList: [
    {
      title: '配电房高温异常',
      type: 'danger',
      desc: `1#配电房温度<span style="color:#F53F3F">92°C</span>，请尽快处理！！！`,
    },
    {
      title: '配电房疑似进水',
      type: 'warning',
      desc: `2#配电房湿度传感器湿度<span style="#FF7D00">90%</span>，请尽快处理！`,
    },
    {
      title: '配电房疑似进水',
      type: 'warning',
      desc: `2#配电房湿度传感器湿度<span style="#FF7D00">90%</span>，请尽快处理！`,
    },
  ] as Notice[],
})

interface NoticeType {
  label: string
  prop: string
}

const noticeType = reactive<NoticeType[]>([
  {
    label: '系统告警',
    prop: 'systemNotice',
  },
  {
    label: '设备告警',
    prop: 'deviceNotice',
  },
  {
    label: '通知',
    prop: 'notice',
  },
])
const activeType = ref('systemNotice')
const handleClick = (notice: NoticeType) => {
  activeType.value = notice.prop
  if (activeType.value === 'systemNotice') {
    data.showList = [
      {
        title: '配电房高温异常',
        type: 'danger',
        desc: `1#配电房温度<span style="color:#F53F3F">92°C</span>，请尽快处理！！！`,
      },
      {
        title: '配电房疑似进水',
        type: 'warning',
        desc: `2#配电房湿度传感器湿度<span style="#FF7D00">90%</span>，请尽快处理！`,
      },
      {
        title: '配电房疑似进水',
        type: 'warning',
        desc: `2#配电房湿度传感器湿度<span style="#FF7D00">90%</span>，请尽快处理！`,
      },
    ]
  } else if (activeType.value === 'deviceNotice') {
    data.showList = [
      {
        title: '配电房高温异常',
        type: 'danger',
        desc: `1#配电房温度<span style="color:#F53F3F">92°C</span>，请尽快处理！！！`,
      },
      {
        title: '配电房疑似进水',
        type: 'warning',
        desc: `2#配电房湿度传感器湿度<span style="#FF7D00">90%</span>，请尽快处理！`,
      },
    ]
  } else {
    data.showList = []
  }
}
</script>

<style lang="scss" scoped>
.notice-info {
  width: 396px;
  max-height: 350px;
  height: 350px;
}

.notice-type-container {
  height: 48px;
  border-bottom: 1px solid #e5e6eb;
}

.notice-type {
  height: 32px;
  line-height: 32px;
  transition: 0.1s;
}

.active-notice-type {
  background: #f2f3f5;
  border-radius: 100px;
  color: #165dff;
  font-weight: 600;
}

.notice-container {
  height: 246px;

  .mynotice {
    height: 82px;
    border-bottom: 1px solid #e5e6eb;

    &:nth-child(3) {
      border-bottom: none;
    }

    .announcement {
      width: 80%;
      height: 22px;
      font-size: 14px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      color: #4e5969;
      line-height: 22px;
    }
  }
}

.notice-button {
  border-top: 1px solid #e5e6eb;
  height: 56px;
  position: relative;

  &::after {
    content: '';
    height: 24px;
    width: 2px;
    background-color: #e5e6eb;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
}
</style>
