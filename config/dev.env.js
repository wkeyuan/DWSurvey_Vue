'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 本地开发环境后端API地址不需要在这个文件配置，在config/index.js里面配置target
  DW_API_URL: '"http://localhost:8081"',
  DW_WEB_URL: '"http://localhost:8081"',
  DW_RESOURCE_URL: '"http://localhost:8080"'
})
