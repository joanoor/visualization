/**
 * 与弹框相关的操作
 * 包括打开dialog、关闭弹框，重置表单
 */

const updateWords = ['编辑']
const otherWords = ['详情']

/**
 * @param callbackOnOpened 弹框打开的时候执行的回调
 * @param callbackOnClosed 弹窗关闭时执行的回调
 */
export default function (callbackOnOpened?: Fn, callbackOnClosed?: Fn) {
  const data = reactive({
    dialogVisible: false, // 弹框是否打开
    dialogTitle: '', // 弹框的标题
    confirmWord: '创建',
    cancelWord: '取消',
    disabled: false,
  })

  watchEffect(() => {
    if (updateWords.some(word => data.dialogTitle.includes(word))) {
      data.confirmWord = '更新'
      data.disabled = false
    } else if (otherWords.some(word => data.dialogTitle.includes(word))) {
      data.confirmWord = '确定'
      data.disabled = true
    } else {
      data.confirmWord = '创建'
      data.disabled = false
    }
  })

  const onCallbackDialog = (callback?: () => void) => {
    callback && callback()
  }

  watch(
    () => data.dialogVisible,
    newValue => {
      if (newValue) {
        callbackOnOpened && nextTick(callbackOnOpened)
      } else {
        callbackOnClosed && nextTick(callbackOnClosed)
      }
    }
  )

  return {
    ...toRefs(data),
    onCallbackDialog,
  }
}
