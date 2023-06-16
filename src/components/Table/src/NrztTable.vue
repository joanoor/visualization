<template>
  <el-table
    :data="tableData"
    :stripe="stripe"
    :border="border"
    :highlight-current-row="highlight"
    v-loading="loading"
    header-row-class-name="iemp-table-header"
    row-class-name="iemp-table-row"
    cell-class-name="iemp-table-cell"
    @select-all="val => $emit('selectionAll', val)"
    @selection-change="val => $emit('selection', val)"
    ref="tableRef"
  >
    <template #empty>
      <el-empty w-full h-full description="暂无数据" />
    </template>
    <el-table-column
      type="selection"
      width="50"
      :selectable="canSelectThisRow"
      v-if="showSelection"
    />
    <el-table-column v-if="onTableIndex" label="序号">
      <template #default="{ $index }">
        {{ onTableIndex && onTableIndex($index) }}
      </template>
    </el-table-column>
    <template v-for="col in tableColumns" :key="col.name">
      <el-table-column
        v-if="!col.hidden && col.checked"
        :type="col.type"
        :prop="col.name"
        :label="col.title"
        :width="col.width"
        :min-width="col.minWidth"
        :index="col.index"
        :fixed="col.fixed"
        :align="col.align"
        :header-align="col.headerAlign"
        :formatter="col.formatter"
        show-overflow-tooltip
      >
        <template #default="{ row, $index }">
          <template v-if="col.type === 'expand'">
            <slot name="expand" :row="row" :index="$index"></slot>
          </template>
          <template v-if="col.name === 'noticeStatus'">
            <el-tag
              :class="row[col.name] === '1' ? 'tag-warning' : 'tag-default'"
            >
              {{ onDecodeDict(row, col.name, col.dictName) }}
            </el-tag>
          </template>
          <template v-else-if="col.name === 'requestType'">
            <el-tag
              :class="row[col.name] === '1' ? 'tag-success' : 'tag-primary'"
            >
              {{ onDecodeDict(row, col.name, col.dictName) }}
            </el-tag>
          </template>
          <template v-else-if="col.name === 'status'">
            <div flex items-center>
              <div
                circle-2
                mr-2
                :class="
                  row[col.name] === '0'
                    ? 'bg-#F53F3F!'
                    : row[col.name] === '1'
                    ? 'bg-#00B42A!'
                    : 'bg-#C9CDD4!'
                "
              ></div>
              {{ onDecodeDict(row, col.name, col.dictName) }}
            </div>
          </template>
        </template>
      </el-table-column>
    </template>
    <el-table-column v-if="showOperator" label="操作" width="180" fixed="right">
      <template #default="scope">
        <slot name="operate" :row="scope.row" :index="scope.$index">
          <div flex items-center>
            <el-button
              link
              type="primary"
              size="default"
              @click="$emit('editRecord', scope.row)"
            >
              修改
            </el-button>
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              :icon="InfoFilled"
              icon-color="#FF7D00"
              title="确认删除此记录？"
              width="300"
              @confirm="$emit('deleteRecord', scope.row)"
            >
              <template #reference>
                <el-button link type="primary" size="default">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </slot>
      </template>
    </el-table-column>
  </el-table>

  <Pagination
    mt-6
    v-if="showPagination"
    v-model:current="currentPage"
    v-model:size="pageSize"
    :total="total"
  ></Pagination>
</template>

<script setup lang="ts">
import { ResultColumnsData } from '@/types'
import { InfoFilled, Download } from '@element-plus/icons-vue'
import Pagination from '@/components/Pagination/src/Pagination.vue'

const { onDecodeDict } = useDecodeDict()

const tableRef = ref<HTMLElement>()

const emit = defineEmits([
  'update:current',
  'update:size',
  'editRecord',
  'deleteRecord',
  'selection',
  'selectionAll',
  'batchExport',
])

const props = withDefaults(
  defineProps<{
    loading: boolean
    tableColumns?: ResultColumnsData<any>[]
    tableData?: Recordable[]
    stripe?: boolean
    border?: boolean
    highlight?: boolean
    total?: number
    current?: number
    size?: number
    tableHeight?: number
    showPagination?: boolean
    showOperator?: boolean
    showSelection?: boolean
    updateColumns?: AnyFunction
    hasSelectedRow?: boolean
    canSelectThisRow?: (row, index) => boolean
    onTableIndex?: (index: number) => number
  }>(),
  {
    tableColumns: () => [],
    tableData: () => [],
    stripe: false,
    border: true,
    highlight: false,
    showPagination: true,
    tableHeight: 500,
    hasSelectedRow: true,
    showOperator: true,
    showSelection: false,
    canSelectThisRow: () => true,
  }
)

const currentPage = computed({
  get: () => props.current,
  set: value => {
    emit('update:current', value)
  },
})

const pageSize = computed({
  get: () => props.size,
  set: value => {
    emit('update:size', value)
  },
})

defineExpose({
  tableRef,
})
</script>

<style lang="scss" scoped></style>
