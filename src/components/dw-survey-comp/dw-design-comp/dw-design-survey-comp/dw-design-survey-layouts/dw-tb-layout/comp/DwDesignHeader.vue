<template>
  <el-row type="flex" justify="space-between" align="middle" >
    <el-col :span="16">
      <div class="header-content-left">
        <div class="logo">
          <router-link :to="`${prevPath}/dw/survey`" >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQzRDRFQ0Y5QjVFODExRUJCRENGOUE2Q0FGMTA3RTJEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQzRDRFQ0ZBQjVFODExRUJCRENGOUE2Q0FGMTA3RTJEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDNENEVDRjdCNUU4MTFFQkJEQ0Y5QTZDQUYxMDdFMkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDNENEVDRjhCNUU4MTFFQkJEQ0Y5QTZDQUYxMDdFMkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6GJisjAAAFMklEQVR42uzdTYhVZRjA8XNrSAqTIq0EqYSCCoQWgeFCHcJsEbVo1UARkbYIChdFbloFWosWQVAWhFBDmyJa1FhR46YPC0KkhCgzN9OXJH2JhdyeM3Mnq3veMJp5z3lnfj94mCLo3nPu/O97z51z7u31+/0qh9749I88NzbHd336jo8NbUuR2zMxOrM9CfX2/BRzIuboYL6KORxzMOZAzCcxv3dpmzavnL//90gFf3fuYJYP/n3dP/778ZgPYybr3mL2xZxcqDvjDL8P/Ednx6yPeTjm3ZipmKdiNsyutgKBU1bE3DNYUT6LeSDmPIHAsMtjHos5EvN4zEUCgebjmG0xh2J2xCwVCAw7J+ahwUuvO0o8RhEIOdRvxO6O2RNzmUCg2aaY/TFjAoFmy2JeiNkVs0Qg0GxLzN6q4+90CYQ2rY15L+ZKgUCz1YOV5BqBQLMLY96OWSMQaHZ+zGsxqwQCzVYNVpIVAoFmV8S8GnOWQKDZdTGPCgTS7o+5RSDQrD6x8bmYSwUCzep3tp6pWjwLWCB0XX2C4+0CgbT6gH2ZQKDZxTHbBQJp91UtnPkrEEoxe/muQCDh7irzRwoJhJIsHUQiEEjYWmX8u4hAKE19MuN6gUDabQKBtFtjzhQINKu/mmGtQCBts0AgbaNAIO3aKsNluQKhVPWpJ1cLBNLWCATSrhIIpK0WCKRdIhBIWy4QSLtAIJC2RCCQNu9fLz2SeYN6C+wBGtqeidGFtT2LnRUE/u0Zo9/v2wtzaM+UfZDb5pVWEPASC7om20F6b7zsHdUf88tiBQHaWUFmn4gL3EeL5q3PG98p7/GZGJ3fx8cKAgIBgYBAQCAgEBAICAQEAgIBBAICAYGAQEAgIBAQCAgEBAICAQQCAgGBgEBAICAQEAgIBAQCCAQEAgIBgYBAQCAgEBAICAQEAjTq9ft5vhq7Nz79o9jvSe+PLeBfgvE//7HIx2c+HxsrCAgEBAICgZxG2jjgpbsHvHaBFQRO/xkj19u8YAUBgYCD9Ll/LTde9o5aJH9J99hYQaCDK8hs7CU+wS6i3wePjxUEBAICAYHAIjpIX/BKf8sUKwgIBAQCAgGBgEBAICAQEAgIxC4AgYBAQCAgEBAICAQEAgIBgQACAYGAQEAgIBAQCAgEBAICAYEAAgGBgEBAICAQEAgIBAQCAgEEAqch9/ek9+zyTvP4WEGggytIf8zOxgoCAgEvseb66G+87B3115eIpW8LVhAoawWZfSIucB/1bE+x22MFYVH72UssSDshEEg7KhBI+14gkHZEIJB2WCCQ9qlAIO2AQKDZr1YQSPso5jeBQLPJHDciEEr1hkCgWf0HwvcFAs1eijkpEGj2Yq4bEgil+Txmr0Cg2dNVxgu7BEJJ6gukns15gwKhJHUcxwQCw+pTS3bmvlGBUIonYr4RCAz7OmZHGzcsEEqwPeZHgcCwN2N2t3XjAqHLfojZWrX4gXYCoavqKO6qMlx3LhBKVL9r9Urbd0IgdFF9KvuDXbgjAqFrDsXcXGW4nFYglOa7mJsGPyuBwCn1O1abYg526U4JhC74Nub6mP1du2MCoW1fxmyM+biLd04gtOmDmHVde1klELqgvrZjQzVzImJnjXicyKw+6fDemOdLuLMCIae3YrZULZ8+4iUWXTMVc2fMDSXFYQVhvtWXyT4Z80jV0vUcAqGLfhkchO/s+kG4QMjpi5hdgzm2EDZIIPxf9QdJv1zNfBzoZNXixU0CoQuOVzNfXlPH8HrMvirTB0m34Q8BBgDCrqxH8SRKpAAAAABJRU5ErkJggg==" alt="logo" height="32">
            <h1>{{ logoTitle }}</h1>
            <span style="font-size: 13px;color: #c7c7c7;">{{ logoTitleNote }}</span>
          </router-link>
        </div>
      </div>
    </el-col>
    <!--    <el-col>
      <el-button-group>
        <el-button type="primary" icon="el-icon-edit" >题目编辑</el-button>
        <el-button type="primary" icon="el-icon-share">问卷配置</el-button>
        <el-button type="primary" icon="el-icon-share">外观设置</el-button>
      </el-button-group>
    </el-col>-->
    <el-col :span="8">
      <div style="text-align: right;">
        <el-menu
          :default-active="defActive"
          router
          class="dw-design-survey-menu dw-menu-height"
          mode="horizontal"
          @select="handleSelect">
          <el-menu-item :index="`${prevPath}/dw/survey`">我的问卷</el-menu-item>
          <el-menu-item :index="`${prevPath}/dw/survey/d/chart/${$route.params.id}`">统计</el-menu-item>
          <el-menu-item :index="`${prevPath}/dw/survey/c/url/${$route.params.id}`">收集</el-menu-item>
          <el-menu-item :index="`/v6/diaowen/dw-design/survey/${$route.params.id}`">设计</el-menu-item>
        </el-menu>
      </div>
    </el-col>
  </el-row>
</template>

<script>

import {dwFooterUtils} from '../../../../../dw-utils/dw-common/dw-footer-util'

export default {
  name: 'DwDesignHeader',
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    survey: {type: Object, default: () => {}}
  },
  data () {
    return {
      logoTitle: '调问网-全新问卷编辑器',
      logoTitleNote: '纯VUE全部重写，易于二开上手',
      switchValue: '上下',
      defActive: `/v6/diaowen/dw-design/survey/${this.$route.params.id}`,
      prevPath: '/v6'
    }
  },
  mounted () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      dwFooterUtils.getDwFooterInfoAuto((footerInfo) => {
        // demo显示
        dwFooterUtils.isDemo((footerInfo) => { this.logoTitleNote = '纯VUE全部重写，易于二开上手' }, (footerInfo) => { this.logoTitleNote = '' })
        // 左右布局
        dwFooterUtils.isLayoutLr((footerInfo) => { this.prevPath = '/v6/lr' })
      })
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>

@import '../../../../../../../assets/css/font-dwsurvey-1.4/iconfont.css';
@import '../../../../../../../assets/css/design-survey.css';

.header .header-content-left{
  display: flex;
}
.header .header-content-left .logo{
  min-width: 300px;
  text-align: left;
  line-height: 60px;
  vertical-align: middle;
}
.header .header-content-left img{
  vertical-align: middle;
}
.header .header-content-left .logo h1{
  display: inline-block;
  margin: 0 0 0 12px;
  color: #fff;
  font-weight: 400;
  font-size: 16px;
  vertical-align: top;
}

/*.dw-menu-height,.dw-menu-height>.el-menu-item,.dw-menu-height>.el-submenu /deep/ .el-submenu__title{
  height: 60px;
  line-height: 60px;
  font-weight: 400;
  font-size: 16px;
}*/
.dw-menu-height,.dw-menu-height>.el-menu-item,.dw-menu-height>.el-submenu /deep/ .el-submenu__title{
  font-size: 14px;
}
.el-menu--horizontal>.el-menu-item,.el-menu--horizontal>.el-submenu{
  float: right;
}
.dw-design-survey-menu{
  /*background-color: #25292E;*/
  background-color: var(--dw-primary-bg-color);
}
.dw-design-survey-menu .el-menu-item.is-active{
  background-color: var(--dw-primary-bg-color-active);
  color: white;
  border-bottom: 2px solid var(--dw-primary-bg-color-active);
}
.dw-design-survey-menu .el-menu-item:hover, .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
  /*background: #131313;*/
  background: var(--dw-primary-bg-color-hover)!important;
  color: white;
  border-bottom: 2px solid var(--dw-primary-bg-color-hover)!important;
}
</style>
