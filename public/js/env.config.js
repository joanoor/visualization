window.__NRZT_TEMPLATE__ = {
  projectName: '资产全寿命可视化监控系统', // 项目名称
  appId: 'Hw7Q1nXYrYzGmoI51sBIz0AfGoVA5AHF', // 项目的appId
  loginOutUrl: 'http://192.168.20.154:8848/sso/login', // 退出登录之后，跳转链接
  whiteList: [ "login" ],  // "路由切换的白名单（没有权限也可以查看的页面）"
  prefixCls: 'nrzt',  // bem前缀（如果此处修改的话，那么styles/modules/_variables.scss中的$namespace也要修改）
  showBreadCrumb: false,  // 展示面包屑
  showBreadCrumbIcon: false,  // 展示面包屑的icon
  showFooter: false, // 展示底部footer
  showShortCuts: false,  // 展示快捷操作
  showBackToTop: true,  // 展示backToTop
  theme: 'light', // 初始主题模式：'dark' | 'light'
  grayMode: false, // 网站灰色模式
  colorWeak: false,  // 网站色弱模式
  showMenu: false, // 展示左侧菜单
  showTopMenu: false, // 展示顶部菜单
  showHeader: false, // 展示header
  showMultiTabs: false, // 展示多标签
  openKeepAlive: false, // keepAlive
  useErrorHandle: true,  // 错误处理

  permissionCacheType: '1',  // '0' | '1'： 0 表示session，1 表示local
  removeAllHttpPending: false,
  closeMessageOnSwitch: true,
  headerSetting: {  // header设置
    headerHeight: 60,
    bgColor: '#fff', // #ffffff
    borderColor: '#e5e6eb',
    showSearch: false,
    showThemeToggle:false,
    showFullScreen: true,
    showNotice: false,
    showUser: true,
  },
  menuSetting: {  // 菜单设置
    menuWidth: 220,
    menuCollapsedWidth: 50,
    collapsed: false,
    showCollapsed: true,
    splitMenu: true,  // 当为水平菜单时，是否需要分割菜单
    bgColor: '#fff',
    fixed: true,
    theme: 'light',
    closeMixSidebarOnChange: false
  },
  multiTabsSetting: { // 多tab设置
    cache: false,
    canDrag:true,
    showRedo: true,
  },
  transitionSetting: {  // 过渡动画设置
    enable: true,
    openPageLoading: false,
    openNProgress: true,
    basicTransition: 'fade'
  }
} 