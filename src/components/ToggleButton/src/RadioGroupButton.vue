<template>
  <div class="flex items-center">
    <el-radio-group class="mimesis" v-model="activeTab">
      <el-radio-button
        v-for="(item, index) in data"
        :key="index"
        class="line"
        :class="judgeHasSplitLine(item, index) ? 'noline' : ''"
        :label="item"
      >
        {{ item }}
      </el-radio-button>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:activeName'])

const props = withDefaults(
  defineProps<{
    data: string[]
    activeName: string
    name?: string
    type?: string
  }>(),
  {
    name: '',
    type: 'date',
  }
)

const activeTab = computed({
  get: () => props.activeName,
  set: value => {
    emit('update:activeName', value)
  },
})

const judgeHasSplitLine = (item: string, index: number) => {
  const length = props.data.length
  if (item === activeTab.value) return true

  // 获取当前选中的index
  const currentIndex = props.data.indexOf(activeTab.value)
  if (index < length - 1) {
    if (currentIndex === 0) {
      return false
    } else {
      if (item === props.data[currentIndex - 1]) return true
      else return false
    }
  } else {
    return true
  }
}
</script>

<style lang="scss" scoped>
.mimesis {
  :deep(.el-radio-button) {
    padding: 3px;
    background-color: #f2f3f5;
    border-radius: 2px;
  }

  .el-radio-button.line::after {
    content: '';
    display: inline-block;
    position: absolute;
    width: 2px;
    height: 60%;
    transform: translateY(-50%);
    top: 50%;
    background-color: #e5e6eb;
  }

  .el-radio-button.noline::after {
    content: '';
    display: none;
  }

  .el-radio-button.splitline.is-active::after {
    display: none;
  }

  :deep(.el-radio-button__inner) {
    border: none !important;
    font-size: 12px;
    border-radius: 0px !important;
    background-color: transparent;
  }

  :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
    color: $c-cyan-6 !important;
    background-color: #fff;
    box-shadow: none;
  }
}
</style>
