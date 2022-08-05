const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({

  // lintOnSave: false,
  productionSourceMap: false,
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
        // pathRewrite: { '^/api': '' }
      }
    }
  }
})
