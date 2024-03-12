/**
 * 注意：开发环境不需要修改这里
 * 只需要修改 index.js dev.proxyTable.target地址为后端地址
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 本地开发环境后端API地址不需要在这个文件配置，在config/index.js里面配置target
  DW_API_URL: '"http://192.168.3.32:8081"',//开发环境不需要修改，只需要 config/index.js target
  DW_WEB_URL: '"http://192.168.3.32:8081"',//开发环境不需要修改，只需要 config/index.js target
  DW_RESOURCE_URL: '"http://192.168.3.32:8080"'
})
