# 调问开源问卷系统（DWSurvey）

> 此代码仓库为基于 Spring Boot、Vue 实现的前端代码仓库


[![star](https://gitee.com/wkeyuan/DWSurvey/badge/star.svg?theme=dark)](https://gitee.com/wkeyuan/DWSurvey/stargazers)
[![fork](https://gitee.com/wkeyuan/DWSurvey/badge/fork.svg?theme=dark)](https://gitee.com/wkeyuan/DWSurvey/members)
![GitHub Repo stars](https://img.shields.io/github/stars/wkeyuan/DWSurvey?style=social)
![GitHub forks](https://img.shields.io/github/forks/wkeyuan/DWSurvey?style=social)

DWSurvey是一款简单、高效、成熟、稳定、专业的开源问卷系统，自2012年启动至今经过9年的积累，已经形成一套完善的基于 JAVA WEB 的开源问卷表单解决方案。

<div style="padding: 10px;border-left:solid 6px #278bee;background: #f3f5f7;font-size: 16px;color: #2c3e50;">
<div style="font-weight: 600;padding: 10px;"> 🎉🎉🎉  企业版 </div>
<div>
全新的 <strong>企业版</strong> 已经发布，前后端分别采用 React、Ant design、Spring Boot，详情可前往体验
<p>调问网官网地址：<a href="https://www.diaowen.net">https://www.diaowen.net</a></p>
<p><strong>企业版体验地址：<a href="https://ent.surveyform.cn">https://ent.surveyform.cn</a></strong></p>
</div>
</div>
<hr/>
<div style="padding: 10px;border-left:solid 6px #42b983;background: #f3f5f7;font-size: 16px;color: #2c3e50;">
<div style="font-weight: 600;padding: 10px;"> ☀️☀️☀️  社区版 </div>
<div>
️ 全新的 <strong>社区版</strong> 也已经发布，前后端分别采用Vue、ElementUI、Spring Boot，详情可前往体验。
<p>社区版文档地址：<a href="https://www.diaowen.net/docs">https://www.diaowen.net/docs</a></p>

[comment]: <> (<p>社区版体验地址：<a href="https://oss.surveyform.cn">https://oss.surveyform.cn</a></p>)
</div>
</div>

<p style="color: #333;">后续我们将持续迭代更新，<strong>并有专人维护</strong>，敬请关注，别忘了<a href="https://gitee.com/wkeyuan/DWSurvey">点下源码仓库</a> 右上角Star关注，便于下次查找。</p>

![输入图片说明](https://images.gitee.com/uploads/images/2021/0416/132431_5d99a296_1401416.gif "dwsurvey-2.gif")

### 社区版技术方案说明

<table>
<tr><th><strong>方案A</strong></th><th colspan="2" align="left"><strong>前后端分离，基于 Vue、Element ui、Spring Boot</strong></th></tr>
<tr><td colspan="3">方案特性：基于VUE、前后分离开发更容易，部署维护更简单</td></tr>
<tr><td rowspan="2">前端</td><td>Gitee</td><td><a href="https://gitee.com/wkeyuan/dwsurvey-vue">https://gitee.com/wkeyuan/dwsurvey-vue</a></td></tr>
<tr><td>GitHub</td><td><a href="https://github.com/wkeyuan/DWSurvey_Vue">https://github.com/wkeyuan/DWSurvey_Vue</a></td></tr>
<tr><td rowspan="2">后端</td><td>Gitee</td><td><a href="https://gitee.com/wkeyuan/DWSurvey">https://gitee.com/wkeyuan/DWSurvey</a></td></tr>
<tr><td>GitHub</td><td><a href="https://github.com/wkeyuan/DWSurvey">https://github.com/wkeyuan/DWSurvey</a></td></tr>

<tr><th><strong>方案B</strong></th><th colspan="2" align="left"><strong>Spring Boot + JSP</strong></th></tr>
<tr><td colspan="3">方案特性: 原生JS+HTML技术，支持更多浏览器，如IE6</td></tr>
<tr><td colspan="1">Gitee</td><td colspan="2"><a href="https://gitee.com/wkeyuan/dwsurvey-springboot-jsp">https://gitee.com/wkeyuan/dwsurvey-springboot-jsp</a></td></tr>

<tr><th><strong>方案C</strong></th><th colspan="2" align="left"><strong>Struts2 + JSP</strong></th></tr>
<tr><td colspan="3">方案特性: 原生JS+HTML技术，支持更多浏览器，如IE6 |</td></tr>
<tr><td colspan="1">Gitee</td><td colspan="2"><a href="https://gitee.com/wkeyuan/dwsurvey-struts2-jsp">https://gitee.com/wkeyuan/dwsurvey-struts2-jsp</a></td></tr>
</table>

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

![我的问卷](static/img/WX20211203-092339@2x.png)

![问卷编辑](static/img/WX20211203-092358@2x.png)

![问卷预览](static/img/WX20211203-092406@2x.png)

![答卷地址](static/img/WX20211203-092416@2x.png)

![答卷规则](static/img/WX20211203-092427@2x.png)

![数据统计](static/img/WX20211203-092439@2x.png)

![原始数据](static/img/WX20211203-092458@2x.png)

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
