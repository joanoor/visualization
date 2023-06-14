import { useEventListener, useElementBounding, MaybeComputedElementRef } from '@vueuse/core'

export default function (el: MaybeComputedElementRef) {
  const getElementBound = () => {
    return useElementBounding(el)
  }

  onMounted(() => {
    nextTick(() => {
      getElementBound()
    })
  })

  const clearUp = useEventListener('resize', getElementBound)
  onUnmounted(() => {
    clearUp()
  })
  return {
    getElementBound
  }
}