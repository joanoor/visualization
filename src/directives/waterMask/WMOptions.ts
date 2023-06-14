export class WMOptions {
  constructor(init?: WMOptions) {
    if (init) {
      Object.assign(this, init)
    }
  }
  textArr: Array<string> = ['test', '自定义水印'] // 需要展示的文字，多行就多个元素【必填】
  font?: string = '16px "微软雅黑"' // 字体样式
  fillStyle?: string = 'rgba(170,170,170,0.4)' // 描边样式
  maxWidth?: number = 200 // 文字水平时最大宽度
  minWidth?: number = 120 // 文字水平时最小宽度
  lineHeight?: number = 24 // 文字行高
  deg?: number = -45 // 旋转的角度 0至-90之间
  marginRight?: number = 120 // 每个水印的右间隔
  marginBottom?: number = 40 // 每个水印的下间隔
  left?: number = 20 // 整体背景距左边的距离
  top?: number = 20 // 整体背景距上边的距离
  opacity?: string = '.75' // 文字透明度
  position?: 'fixed' | 'absolute' = 'fixed' // 容器定位方式（值为absolute时，需要指定一个父元素非static定位）
}
