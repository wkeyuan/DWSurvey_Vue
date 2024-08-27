<template>
  <!--    background-color="#233c54"-->
  <el-menu
    :default-active="defActive"
    mode="horizontal"
    :background-color="sysThemeStyle.dwPrimaryThemeColor"
    text-color="#fff"
    active-text-color="#ffd04b"
    class="dw-menu-height dw-menu"
    router
    @select="handleSelect"
  >
    <el-menu-item index="/dw/survey">我的问卷</el-menu-item>
    <el-menu-item index="/dw/task">我的任务</el-menu-item>
    <el-menu-item v-has-dw-role="'DWSURVEY_SUPER_ADMIN'" index="/dw/template">模板中心</el-menu-item>
    <el-menu-item v-has-dw-role="'DWSURVEY_SUPER_ADMIN'" index="/dw/admin/survey/list">管理后台</el-menu-item>
  </el-menu>
</template>
<script>

import {dwSurveyRootStyle} from '../../../utils/dw-common-theme'

export default {
  name: 'DwLrNavMenu',
  data () {
    return {
      defActive: '/dw/admin/survey/list',
      sysThemeStyle: dwSurveyRootStyle.sysThemeStyle
    }
  },
  watch: {
    $route: function (to, from) {
      this.setDefActive()
    }
  },
  mounted () {
    this.setDefActive()
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    setDefActive () {
      const fullPath = this.$route.fullPath
      if (fullPath.indexOf('/dw/survey') >= 0) {
        this.defActive = '/dw/survey'
      } else if (fullPath.indexOf('/dw/admin') >= 0) {
        this.defActive = '/dw/admin/survey/list'
      } else if (fullPath.indexOf('/dw/user') >= 0) {
        this.defActive = '/dw/user'
      }
    }
  }
}
</script>

<style scoped>
.dw-menu-height,.dw-menu-height>.el-menu-item,.dw-menu-height>.el-submenu /deep/ .el-submenu__title{
  /*height: 80px;*/
  /*line-height: 80px;*/
  font-weight: 400;
  font-size: 16px;
}
.dw-menu{
  border-bottom: none;
}
</style>
