import { ElMessage } from 'element-plus'
import useClipboard from 'vue-clipboard3'

export default function () {
  const { toClipboard } = useClipboard()
  const copy = (text: string) => {
    toClipboard(text)
      .then(() => {
        ElMessage.success('复制成功')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return { copy }
}
