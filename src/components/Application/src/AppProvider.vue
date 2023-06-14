<script lang="ts">
import { createAppProviderContext } from './useAppContext'
import { useAppStore } from '@/store'

export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  setup(_, { slots }) {
    const useApp = useAppStore()
    const { prefixCls } = toRefs(useApp.getProjectConfig)
    createAppProviderContext({ prefixCls: prefixCls })
    return () => slots.default?.()
  },
})
</script>
