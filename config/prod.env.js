/**
 * 发布时修改的配置，开发环境不需要修改
 * 发布环境
  一、如果前后分端部署，前端放在nginx里，有两处需要注意：
  1、DW_API_URL: 为前端地址（通过下一步配置的后端代理实现访问接口）
    DW_WEB_URL: 为前端地址
  2、 如下nginx配置： http://localhost:8080 为后端服务地址。
  location /api {
      rewrite ^/api/(.*) /$1 break;
      proxy_pass http://localhost:8080;
  }
  二、如果是将前后文件放在后端spring boot static 打到jar包中一起发布。
  此时前后端地址是一样的，所以下面的配置统一配置为实际访问的前后地址就可以
 则 DW_API_URL: 为实际访问网站地址（通过下一步配置的后端代理实现访问接口）
   DW_WEB_URL: 为实际访问网站地址
 */
'use strict'
module.exports = {
  NODE_ENV: '"production"',
  DW_API_URL: '"https://bus.surveyform.cn"',
  DW_WEB_URL: '"https://bus.surveyform.cn"',
  DW_RESOURCE_URL: '"https://bus.surveyform.cn"'
}
