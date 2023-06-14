import { createHtmlPlugin } from 'vite-plugin-html'

export function configHtmlPlugin(_env: ViteEnv, isBuild: boolean) {
  return createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: {
        script: `     
        <!-- 1. 引入nprogress -->
        <script src="./js/nprogress.min.js"></script>
        <link href="./js/nprogress.min.css" rel="stylesheet" />
           
        <!-- 2. 引入打印 -->
        <script type="text/javascript">
          console.log('我看下现在的环境', window)
        </script>
        <script src="./js/print.js"></script>

        <!-- 3. 引入配置 -->
        <script src="./js/env.config.js"></script>
      
        <!-- 4. 其他配置 -->
        <script type="text/javascript">
          window._AMapSecurityConfig = {
            securityJsCode:'e87715e5b85a473b2db99033f9a63b84',
          }
          document.title = window.__NRZT_TEMPLATE__.projectName
        </script>
        `,
      },
    },
  })
}
