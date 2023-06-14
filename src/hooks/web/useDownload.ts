import { ResultColumnsData } from '@/types'
import { read, utils, WorkBook, write } from 'xlsx'
import { omit } from '@nrzt/core'
import { UploadFile } from 'element-plus'

const s2ab = (s: string) => {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}

const workbook2blob = (workbook: WorkBook) => {
  const wbout = write(workbook, {
    // 要生成的文件类型
    bookType: 'xlsx',
    // // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    bookSST: false,
    type: 'binary',
  })
  // 将字符串转ArrayBuffer
  const blob = new Blob([s2ab(wbout)], {
    type: 'application/octet-stream',
  })
  return blob
}

export const download = (ablob: any, fileName: string, callback?: Fn) => {
  let blob = ''
  if (typeof ablob == 'object' && ablob instanceof Blob) {
    blob = URL.createObjectURL(ablob) // 创建blob地址
  }
  const aLink = document.createElement('a')
  aLink.href = blob
  // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
  aLink.download = fileName || ''
  let event
  if (window.MouseEvent) event = new MouseEvent('click')
  //   移动端
  else {
    event = document.createEvent('MouseEvents')
    event.initMouseEvent(
      'click',
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    )
  }
  aLink.dispatchEvent(event)
  callback && callback()
}

export default function () {
  // 借助xlsx下载excel
  const downloadExcel = <T extends object>(
    data: T[],
    tableHeaders: ResultColumnsData<keyof T>[],
    tableName: string,
    callback?: Fn
  ) => {
    if (!data || data.length === 0) return
    const data2 = data.map(row =>
      omit<T>(
        row,
        Object.keys(data[0]).filter(
          // @ts-ignore
          v => !tableHeaders.map(v => v.name).includes(v)
        )
      )
    )

    let sheet1 = utils.json_to_sheet(data2)
    let jsonSheet1 = JSON.stringify(sheet1)
    tableHeaders.forEach(v => {
      // 因为sheet1中是包含键值对（键是英文），所以这一步是将英文转成中文
      jsonSheet1 = jsonSheet1.replace(v.name as string, v.title || '')
    })
    sheet1 = JSON.parse(jsonSheet1)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, sheet1, 'sheet1')
    const workbookBlob = workbook2blob(wb)
    let fileName = `${tableName}.xlsx`
    if (tableName.includes('.')) {
      fileName = fileName.split('.')[0] + '.xlsx'
    }
    download(workbookBlob, fileName, callback)
  }

  const uploadExcel = (
    rawFile: UploadFile,
    transform?: (data: Recordable[]) => Recordable[],
    callback?: (data: Recordable[]) => void,
    diy?: (data: WorkBook) => void
  ) => {
    const fileReader = new FileReader()
    fileReader.readAsBinaryString(rawFile.raw as Blob)
    fileReader.onload = async ev => {
      const blobData = ev?.target?.result
      const workbook = read(blobData, {
        type: 'binary',
      })
      if (!diy) {
        const wsname = workbook.SheetNames[0] //取第一张表
        const excelToJsonRes =
          (transform &&
            transform(
              utils
                .sheet_to_json(workbook.Sheets[wsname], {
                  defval: '',
                })
                .slice(1) as Recordable[]
            )) ||
          []

        callback && callback(excelToJsonRes)
      } else {
        diy(workbook)
      }
    }
  }

  return {
    downloadExcel,
    uploadExcel,
  }
}
