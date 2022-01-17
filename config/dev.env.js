'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DW_API_URL: '"http://localhost:8081"',
  DW_WEB_URL: '"http://localhost:8081"',
  DW_RESOURCE_URL: '"http://localhost:8080"'
})
