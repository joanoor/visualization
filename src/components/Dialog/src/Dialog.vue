<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    @close="handleClose"
    align-center
  >
    <el-form
      :model="myForm"
      ref="formRef2"
      :rules="rules"
      :label-width="labelWidth"
      :inline="inline"
      size="default"
    >
      <el-form-item
        v-for="col in formColumns"
        :key="col.name"
        :prop="col.name"
        :label="col.title + '：'"
      >
        <template v-if="col.component === 'input'">
          <el-input
            v-if="limitNum.includes(col.name)"
            v-model="myForm[col.name]"
            :placeholder="'请输入' + col.title"
            oninput="value=value.replace(/[^0-9]/g,'')"
          ></el-input>
          <el-input
            v-else
            v-model="myForm[col.name]"
            :placeholder="col.message"
          ></el-input>
        </template>
        <template v-else-if="col.component === 'inputselect'"></template>
        <template v-else-if="col.component === 'select'">
          <el-select
            class="w-full"
            v-model="myForm[col.name]"
            :placeholder="col.message"
            clearable
            filterable
          >
            <el-option
              v-for="item in col.selectOption"
              :key="item.codeId"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="$emit('submit')">
        {{ confirmWord }}
      </el-button>
      <el-button @click="dialogVisible = false">{{ cancelWord }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ResultColumnsData } from '@/types'
import type { FormInstance } from 'element-plus'

const emit = defineEmits(['update:visible', 'update:form', 'submit'])

const props = withDefaults(
  defineProps<{
    visible: boolean
    title: string
    form: Recordable
    formColumns: ResultColumnsData[]
    rules?: Recordable
    limitNum?: string[]
    confirmWord?: string
    cancelWord?: string
    inline?: boolean
    width?: string
    labelWidth?: string
  }>(),
  {
    confirmWord: '创建',
    cancelWord: '取消',
    inline: false,
    width: '40%',
    labelWidth: '180px',
    limitNum: () => ['dispSn'],
    rules: () => ({}),
  }
)

const formRef2 = ref<FormInstance>()

const myForm = computed({
  get: () => props.form,
  set: value => {
    emit('update:form', value)
  },
})

const dialogVisible = computed({
  get: () => props.visible,
  set: value => {
    emit('update:visible', value)
  },
})

// 关闭弹框
const handleClose = () => {
  dialogVisible.value = false
}

defineExpose({
  formRef2,
})
</script>
