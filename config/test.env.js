'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  DW_API_URL: '"http://localhost:8081"',
  DW_WEB_URL: '"http://localhost:8081"',
})
