import type { ObjectDirective } from 'vue'

export const dragbar: ObjectDirective = {
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el: HTMLElement, binding, vnode, prevVnode) {
    if (['top', 'right', 'bottom', 'left'].includes(binding.value)) {
      el.style.position = 'relative'
      const $child = document.createElement('div')
      const $body = document.querySelector('body')
      $child.style.position = 'absolute'
      $child.style.width = '5px'
      $child.style.height = '100%'
      $child.style.top = '0px'
      $child.style.right = '-3px'
      $child.style.transition = '0.1s ease 0.5s'

      el.appendChild($child)

      const toggleClass = () => {
        if (!$child.classList.contains('inpointer')) {
          $child.classList.add('inpointer')
          $child.style.cursor = ['left', 'right'].includes('right')
            ? 'ew-resize'
            : 'ns-resize'
          $child.style.backgroundColor = 'rgba(123,192,252,1)'
        } else {
          $child.classList.remove('inpointer')
          $child.style.cursor = 'auto'
          $child.style.backgroundColor = 'inherit'
        }
      }

      // 添加与删除样式
      $child.addEventListener('mouseenter', toggleClass)
      $child.addEventListener('mouseleave', toggleClass)

      // 拖动边框
      const start = {
        x: 0,
      }

      let startWidth = 0
      $child.addEventListener(
        'mousedown',
        (e: MouseEvent) => {
          startWidth = el.offsetWidth
          start.x = e.clientX
          $body!.addEventListener('mousemove', moveX, false)
        },
        false
      )
      $body!.addEventListener('mouseup', () => {
        startWidth = el.offsetWidth
        start.x = 0
        $body!.removeEventListener('mousemove', moveX)
      })

      function moveX(e: MouseEvent) {
        el.style.width = startWidth + e.clientX - start.x + 'px'
        console.log(`startWidth`, startWidth)
      }
    }
  },
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {},
}
