import { ElTree } from 'element-plus'
import Node from 'element-plus/es/components/tree/src/model/node'
import { cloneDeep, deepmerge } from '@nrzt/core'
import type { WatchSource } from 'vue'

interface TreeHook<TData> {
  treeData: TData[]
  activeIndex: number
  treeKeywords: string
}

interface TreeHookOption<TData> {
  props?: TreeInstance['props']
  onFilterNodeMethod?: TreeInstance['filterNodeMethod']
  onTransform?: (data: TData[]) => void //转换treedata
  onNodeClick?: (data: TData) => void
  onDefault?: (data: TData[]) => void
  onCheckChange?: (data: TData[], nodeData: TData) => void
}

type TreeInstance = InstanceType<typeof ElTree>

/**
 *
 * @param requestPromiseFunc
 * @param aUrl
 * @param data
 * @returns
 */
export default function <TData>(
  data: WatchSource<TData[]>,
  option: TreeHookOption<TData> = {}
) {
  const treeRef = ref<TreeInstance>()
  const activeSelectNode = ref<TData>()
  const tdata: TreeHook<TData> = reactive({
    activeIndex: 0,
    treeData: [],
    treeKeywords: '',
  })

  const { onTransform, onNodeClick, onDefault, onCheckChange } = option

  watch(
    data,
    newValue => {
      if (newValue.length === 0) return
      const data2 = cloneDeep(newValue)
      onTransform && onTransform(data2)
      tdata.treeData = data2

      if (onDefault) {
        onDefault(tdata.treeData)
        onNodeClick &&
          activeSelectNode.value &&
          onNodeClick(activeSelectNode.value)
      }
    },
    {
      immediate: true,
    }
  )

  const defaultProps: TreeInstance['props'] = {
    label: 'label',
    children: 'children',
  }

  const { props: treeProps, onFilterNodeMethod } = deepmerge<
    TreeHookOption<TData>
  >({ props: defaultProps }, option)

  // 采用回调的形式进行自定义处理
  const onFilterTreeNode = (value: string, record: Recordable, child: Node) => {
    if (!value) return true
    return onFilterNodeMethod ? onFilterNodeMethod(value, record, child) : true
  }

  const handleNodeClick = (nodeData: TData) => {
    onNodeClick && onNodeClick(nodeData)
  }

  const handleCheckChange = (nodeData: TData, ...args: any[]) => {
    console.log('传递的参数', args)
    console.log(treeRef.value?.getCheckedKeys())
    onCheckChange && onCheckChange(tdata.treeData, nodeData)
  }

  watch(
    () => tdata.treeKeywords,
    val => {
      treeRef.value?.filter(val)
    }
  )

  return {
    ...toRefs(tdata),
    activeSelectNode,
    treeProps,
    treeRef,
    onFilterTreeNode,
    handleNodeClick,
    handleCheckChange,
  }
}
