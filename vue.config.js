const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    open:true,
    proxy:{
      '/api': {
        target: 'http://localhost:5050',//代理目标的基础路径
        pathRewrite: {  // 重命名
          '^/api': ''
        },
        // ws: true,//用于支持websocket
        // changeOrigin: true,//用于请求头中的host值
      },
      /* 匹配所有以'/demo'开头的请求路径 */
      '/uis': {
        target: 'https://uis.fudan.edu.cn/',//代理目标的基础路径
        ws: true,//用于支持websocket
        changeOrigin: true,//用于请求头中的host值
        pathRewrite: {  // 重命名
          '^/uis': ''
        },
      },
      '/img': {
        target: 'https://sm.ms/api/v2/',//代理目标的基础路径
        ws: true,//用于支持websocket
        changeOrigin: true,//用于请求头中的host值
        pathRewrite: {  // 重命名
          '^/img': ''
        },
      }
    },
  },
})
