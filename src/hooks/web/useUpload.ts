import {
  ElMessage,
  ElMessageBox,
  UploadFile,
  UploadFiles,
  UploadUserFile,
  UploadInstance,
} from 'element-plus'

const checkFileType = (
  rawFile: UploadFile,
  callback?: Fn<UploadFile, boolean>
) => {
  if (callback) {
    return callback(rawFile)
  }
  const file = rawFile.raw
  if (file) {
    const isLt2M = file.size / 1024 / 1024 < 10
    if (!isLt2M) {
      ElMessage.error('请上传小于10M的文件')
      return false
    }
    const type = file?.type
    if (
      !type?.includes('image') &&
      !type?.includes('pdf') &&
      !type?.includes('word') &&
      !type?.includes('excel') &&
      !type?.includes('vnd.openxmlformats-officedocument') &&
      !file.name.includes('rar') &&
      !file.name.includes('zip')
    ) {
      ElMessage.error('仅支持上传图片、pdf、word、excel、压缩包文件类型')
      return false
    }
    return true
  }
  return false
}

export default function (option?: {
  onCheck?: Fn<UploadFile, boolean>
  onRemove?: Fn<UploadFile, void>
  onChange?: Fn<UploadFile, void>
}) {
  const uploadRef = ref<UploadInstance>()

  const data = reactive({
    fileList: [] as UploadUserFile[],
    acceptType:
      '.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP,.pdf,.xls,.xlsx,.doc,.docx,.rar,.zip',
    myUploadClass: {
      hideUpload: false,
      customClass: true,
    },
    limit: 1,
  })

  const handlePreview = (file: UploadFile) => {
    console.log('预览文件', file)
  }

  const handleRemove = (file: UploadFile, files: UploadFiles) => {
    option?.onRemove && option.onRemove(file, ...files)
    data.myUploadClass.hideUpload = files.length >= data.limit
  }

  const handleChange = (file: UploadFile, files: UploadFiles) => {
    if (!checkFileType(file, option?.onCheck)) return
    option?.onChange && option.onChange(file, ...files)

    data.fileList = files
  }

  const handleExceed = (files, uploadFiles) => {
    ElMessage.warning(
      `The limit is 3, you selected ${
        files.length
      } files this time, add up to ${files.length + uploadFiles.length} totally`
    )
  }

  const handleBeforeRemove = (file: UploadFile) => {
    return ElMessageBox.confirm(`Cancel the transfert of ${file.name} ?`).then(
      () => true,
      () => false
    )
  }

  watch(
    () => data.fileList,
    list => {
      data.myUploadClass.hideUpload = list.length >= data.limit
    }
  )

  return {
    ...toRefs(data),
    uploadRef,
    handleRemove,
    handlePreview,
    handleExceed,
    handleBeforeRemove,
    handleChange,
  }
}
