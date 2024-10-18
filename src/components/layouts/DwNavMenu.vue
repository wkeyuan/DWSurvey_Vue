<template>
  <!--  <el-menu
    :default-active="defActive"
    mode="horizontal"
    text-color="#fff"
    class="dw-menu dw-menu-height"
    router
    @select="handleSelect">
    <el-menu-item index="/v6/dw/survey" >我的问卷</el-menu-item>
    <el-menu-item index="/v6/dw/user" >个人中心</el-menu-item>
    <el-menu-item v-has-dw-role="'DWSURVEY_SUPER_ADMIN'" index="/v6/dw/admin/user" >用户管理</el-menu-item>
  </el-menu>-->
  <div>
    <!--
    active-text-color="#efc605"
    background-color="#064b91"
    -->
    <el-menu
      :default-active="defActive"
      :unique-opened="true"
      :background-color="sysThemeStyle.dwPrimaryThemeColor"
      mode="horizontal"
      text-color="#fff"
      active-text-color="#efc605"
      style="border-right: none;"
      class="dw-menu"
      router
      @open="handleOpen"
      @close="handleClose"
    >
      <template v-for="item in dwMenus">
        <el-submenu v-if="item.children" :key="item.path" :index="prevPath+item.path">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
          <template v-for="itemChild in item.children">
            <el-menu-item v-if="itemChild.name" :key="itemChild.path" v-has-dw-role="itemChild.authority" :index="prevPath+itemChild.path">
              <span slot="title">{{ itemChild.name }}</span>
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item v-else :key="item.path" :index="prevPath+item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>

import {dwV6Menu} from '../../router/dw-v6-menu'
import {dwSurveyRootStyle} from '../../utils/dw-theme/dw-common-theme'

export default {
  name: 'DwNavMenu',
  data () {
    return {
      defActive: '/dw/survey',
      dwMenus: [],
      prevPath: '/v6',
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
    const routePath = this.$route.path
    if (routePath.indexOf('/v6/lr') >= 0) {
      this.prevPath = '/v6/lr'
    }
    this.dwMenus = dwV6Menu.dwMenus.concat(dwV6Menu.dwMenusAdmin)
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    setDefActive () {
      const fullPath = this.$route.fullPath
      if (fullPath.indexOf('/dw/survey') >= 0) {
        this.defActive = '/v6/dw/survey'
      } else if (fullPath.indexOf('/dw/admin/user') >= 0) {
        this.defActive = '/v6/dw/admin/user'
      } else if (fullPath.indexOf('/dw/user') >= 0) {
        this.defActive = '/v6/dw/user'
      }
    }
  }
}
</script>

<style scoped>
.dw-menu-height,.dw-menu-height>.el-menu-item,.dw-menu-height>.el-submenu /deep/ .el-submenu__title{
  height: 80px;
  line-height: 80px;
  font-weight: 400;
  font-size: 16px;
}
.el-menu-item i,.el-submenu__title i{
  vertical-align: text-top;
  color: inherit;
}
/*
.dw-menu{
  border-bottom: none;
}
.dw-menu{
  background-color: var(--dw-primary-bg-color);
}
.dw-menu .el-menu-item.is-active{
  background-color: var(--dw-primary-bg-color-active);
  color: white;
  border-bottom: 2px solid var(--dw-primary-bg-color-active);
}
.dw-menu .el-menu-item:hover, .dw-menu .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
  background-color: var(--dw-primary-bg-color-hover)!important;
  border-bottom: 2px solid var(--dw-primary-bg-color-hover)!important;
}
.el-menu.el-menu--horizontal{
  border-bottom: none!important;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover{
  color: white!important;
}
 */
</style>
