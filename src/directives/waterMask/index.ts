/**
 * 水印
 */

import { DirectiveBinding, ObjectDirective } from 'vue'
import { WMOptions } from './WMOptions'
import { isArray, isNullOrUnDef } from '@nrzt/core'

let defaultSettings = new WMOptions()

const observerTemp = ref<MutationObserver | null>(null)

const waterMask = function (element: HTMLElement, binding: DirectiveBinding) {
  // 合并默认值和传参配置
  defaultSettings = Object.assign({}, defaultSettings, binding.value || {})
  defaultSettings.minWidth = Math.min(
    defaultSettings.maxWidth!,
    defaultSettings.minWidth!
  ) // 重置最小宽度
  const textArr = defaultSettings.textArr
  if (!isArray(textArr)) {
    throw Error('水印文本必须放在数组中！')
  }
  const c = createCanvas() // 动态创建隐藏的canvas
  draw(c, defaultSettings) // 绘制文本
  convertCanvasToImage(c, element) // 转化图像
}

function createCanvas() {
  const c = document.createElement('canvas')
  c.style.display = 'none'
  document.body.appendChild(c)
  return c
}

function draw(c: any, settings: WMOptions) {
  const ctx = c.getContext('2d')
  // 切割超过最大宽度的文本并获取最大宽度
  const textArr = settings.textArr || [] // 水印文本数组
  let wordBreakTextArr: Array<any> = []
  const maxWidthArr: Array<number> = []
  // 遍历水印文本数组，判断每个元素的长度
  textArr.forEach(text => {
    const result = breakLinesForCanvas(
      ctx,
      text + '',
      settings.maxWidth!,
      settings.font!
    )
    // 合并超出最大宽度的分割数组
    wordBreakTextArr = wordBreakTextArr.concat(result.textArr)
    // 最大宽度
    maxWidthArr.push(result.maxWidth)
  })
  // 最大宽度排序，最后取最大的最大宽度maxWidthArr[0]
  maxWidthArr.sort((a, b) => {
    return b - a
  })
  // 根据需要切割结果，动态改变canvas的宽和高
  const maxWidth = Math.max(maxWidthArr[0], defaultSettings.minWidth!)
  const lineHeight = settings.lineHeight!
  const height = wordBreakTextArr.length * lineHeight
  const degToPI = (Math.PI * settings.deg!) / 180
  const absDeg = Math.abs(degToPI)
  // 根据旋转后的矩形计算最小画布的宽高
  const hSinDeg = height * Math.sin(absDeg)
  const hCosDeg = height * Math.cos(absDeg)
  const wSinDeg = maxWidth * Math.sin(absDeg)
  const wCosDeg = maxWidth * Math.cos(absDeg)
  c.width = parseInt(hSinDeg + wCosDeg + settings.marginRight! + '', 10)
  c.height = parseInt(wSinDeg + hCosDeg + settings.marginBottom! + '', 10)
  // 宽高重置后，样式也需重置
  ctx.font = settings.font
  ctx.fillStyle = settings.fillStyle
  ctx.textBaseline = 'hanging' // 默认是alphabetic,需改基准线为贴着线的方式
  // 移动并旋转画布
  ctx.translate(0, wSinDeg)
  ctx.rotate(degToPI)
  // 绘制文本
  wordBreakTextArr.forEach((text, index) => {
    ctx.fillText(text, 0, lineHeight * index)
  })
}

// 根据最大宽度切割文字
function breakLinesForCanvas(
  context: any,
  text: string,
  width: number,
  font: string
) {
  const result: string[] = []
  let maxWidth = 0
  if (font) {
    context.font = font
  }
  // 查找切割点
  let breakPoint = findBreakPoint(text, width, context)
  while (breakPoint !== -1) {
    // 切割点前的元素入栈
    result.push(text.substring(0, breakPoint))
    // 切割点后的元素
    text = text.substring(breakPoint)
    maxWidth = width
    // 查找切割点后的元素是否还有切割点
    breakPoint = findBreakPoint(text, width, context)
  }
  // 如果切割的最后文本还有文本就push
  if (text) {
    result.push(text)
    const lastTextWidth = context.measureText(text).width
    maxWidth = maxWidth !== 0 ? maxWidth : lastTextWidth
  }
  return {
    textArr: result,
    maxWidth: maxWidth,
  }
}

// 寻找切换断点
function findBreakPoint(text: string, width: number, context: any) {
  let min = 0
  let max = text.length - 1
  while (min <= max) {
    // 二分字符串中点
    const middle = Math.floor((min + max) / 2)
    // measureText()方法是基于当前字型来计算字符串宽度的
    const middleWidth = context.measureText(text.substring(0, middle)).width
    const oneCharWiderThanMiddleWidth = context.measureText(
      text.substring(0, middle + 1)
    ).width
    // 判断当前文本切割是否超了的临界点
    if (middleWidth <= width && oneCharWiderThanMiddleWidth > width) {
      return middle
    }
    // 如果没超继续遍历查找
    if (middleWidth < width) {
      min = middle + 1
    } else {
      max = middle - 1
    }
  }
  return -1
}

// 将绘制好的canvas转成图片
function convertCanvasToImage(canvas: any, el: HTMLElement) {
  // 判断是否为空渲染器
  if (isNullOrUnDef(el)) {
    console.error('请绑定渲染容器')
  } else {
    // 转化为图形数据的url
    const imgData = canvas.toDataURL('image/png')
    const divMask = el
    divMask.style.cssText = `position: ${defaultSettings.position}; left:0; top:0; right:0; bottom:0; z-index:9999; pointer-events:none;opacity:${defaultSettings.opacity}`
    divMask.style.backgroundImage = 'url(' + imgData + ')'
    divMask.style.backgroundPosition =
      defaultSettings.left + 'px ' + defaultSettings.top + 'px'
  }
}

function disablePatchWaterMask(el: HTMLElement) {
  // 观察器的配置（需要观察什么变动）
  const config = {
    attributes: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
  }
  /* MutationObserver 是一个可以监听DOM结构变化的接口。 */

  const MutationObserver =
    // @ts-ignore
    window.MutationObserver || window.WebKitMutationObserver
  // 当观察到变动时执行的回调函数
  const callback = function (mutationsList: any, observer: any) {
    console.log(mutationsList)
    for (const mutation of mutationsList) {
      const type = mutation.type
      switch (type) {
        case 'childList':
          if (mutation.removedNodes.length > 0) {
            // 删除节点，直接从删除的节点数组中添加回来
            mutation.target.append(mutation.removedNodes[0])
          }
          break
        case 'attributes':
          // 为什么是这样处理，我们看一下下面两幅图
          mutation.target.setAttribute('style', mutation.target.oldValue)
          break
        default:
          break
      }
    }
  }
  // 创建一个观察器实例并传入回调函数
  const observer = new MutationObserver(callback)
  // 以上述配置开始观察目标节点
  observer.observe(el, config)
  observerTemp.value = observer
}

const WaterMask: ObjectDirective = {
  // el为当前元素
  // bind是当前绑定的属性，注意地，由于是vue3实现，这个值是一个ref类型
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    // 实现水印的核心方法
    waterMask(el, binding)
  },
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    nextTick(() => {
      // 禁止修改水印
      disablePatchWaterMask(el)
    })
  },
  beforeUnmount() {
    // 清除监听DOM节点的监听器
    if (observerTemp.value) {
      observerTemp.value.disconnect()
      observerTemp.value = null
    }
  },
}
export default WaterMask
