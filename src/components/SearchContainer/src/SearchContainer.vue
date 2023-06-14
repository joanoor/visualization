<template>
  <div
    flex
    items-center
    ref="searchRef"
    :class="mode === 'vertical' ? 'vertical' : 'horizontal'"
  >
    <slot></slot>
    <div
      v-if="!nobutton"
      :class="mode === 'vertical' ? 'flex-col' : 'flex items-center'"
      class="buttons"
      ref="buttonsRef"
      pl-5
      ml-5
    >
      <el-button type="primary" :icon="Search" @click="$emit('search')">
        查询
      </el-button>
      <el-button btn-info :icon="RefreshRight" @click="$emit('reset')">
        重置
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, RefreshRight } from '@element-plus/icons-vue'

defineEmits(['search', 'reset'])

withDefaults(
  defineProps<{ mode?: 'vertical' | 'horizontal'; nobutton?: boolean }>(),
  {
    mode: 'vertical', // 默认是垂直的
    nobutton: false,
  }
)

const searchRef = ref<HTMLElement>()
const buttonsRef = ref<HTMLElement>()
</script>

<style scoped lang="scss">
.bline {
  border-bottom: solid 1px #e5e6eb;
}
.line {
  .buttons {
    border-left: solid 1px $c-line-2;
  }
}
</style>
<style lang="scss">
.vertical {
  .buttons {
    .el-button {
      margin-bottom: 18px;
    }
    .el-button:last-child {
      margin: 0 !important;
    }
  }

  .el-row {
    &:last-child {
      .el-form-item {
        margin-bottom: 0px !important;
      }
    }
  }
}

.horizontal {
  .el-row {
    &:last-child {
      .el-form-item {
        margin-bottom: 0px !important;
      }
    }
  }
  .el-form-item {
    margin-bottom: 0px !important;
  }
}
</style>
