<template>
  <div class="requirement" relative p-5>
    <Back absolute right-0 top-0></Back>
    <SearchContainer mode="horizontal" :nobutton="true" mb-3.75>
      <el-form
        :model="form"
        ref="formRef"
        label-width="120px"
        flex
        flex-wrap
        flex-1
      >
        <el-form-item label="资产类别：">
          <el-select v-model="form.type"></el-select>
        </el-form-item>
        <el-form-item label="管理单位：">
          <el-select v-model="form.unit"></el-select>
        </el-form-item>
      </el-form>
    </SearchContainer>
    <NrztTable
      :table-columns="tableColumns"
      :table-data="tableData"
      :loading="loading"
      :total="total"
      v-model:current="current"
      v-model:size="size"
      stripe
      highlight
      :border="false"
      :show-operator="false"
    ></NrztTable>
  </div>
</template>

<script setup lang="ts">
import { getDossierTable } from '@/api'
import { NrztTable } from '@/components/Table'
import { SearchContainer } from '@/components/SearchContainer'
import Back from './components/Back.vue'

const { form, formRef, handleResetForm, handleSubmitForm } = useForm([
  'type',
  'unit',
])

const { tableColumns, tableData, loading, total, size, current } =
  useQueryTable(getDossierTable, {
    queryParams: {
      data: {},
      page: {
        size: 19,
      },
    },
  })
</script>

<style scoped lang="scss">
.requirement {
  width: 2260px;
  height: 967px;
  margin: 0 auto;
  padding-top: 69px;
  background-image: url('@/assets/table-border.svg');
  background-size: cover;
  background-position: center center;
  transform: translateY(87px);
}
</style>
