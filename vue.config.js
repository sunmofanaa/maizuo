module.exports = {
  lintOnSave: false, // 暂时关闭代码格式检测

  // 配置反向代理
  devServer: {
    proxy: {
      // '/ajax': {
      //   target: 'https://m.maoyan.com',
      //   changeOrigin: true
      // }
      '/kerwin': {
        target: 'https://m.maoyan.com',
        changeOrigin: true,
        pathOrigin: {
          '^/kerwin': ''
        }
      }
    }
  }
}
