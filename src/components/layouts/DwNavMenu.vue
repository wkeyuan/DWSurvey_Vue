<template>
  <el-menu
    :default-active="defActive"
    mode="horizontal"
    text-color="#fff"
    class="dw-menu dw-menu-height"
    router
    @select="handleSelect">
    <el-menu-item index="/v6/dw/survey" >我的问卷</el-menu-item>
    <el-menu-item index="/dw/user" >个人中心</el-menu-item>
    <el-menu-item v-has-dw-role="'DWSURVEY_SUPER_ADMIN'" index="/dw/admin/user" >用户管理</el-menu-item>
  </el-menu>
</template>
<script>

export default {
  name: 'DwNavMenu',
  data () {
    return {
      defActive: '/dw/survey'
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
        // this.defActive = '/dw/survey'
        this.defActive = '/v6/dw/survey'
      } else if (fullPath.indexOf('/dw/admin/user') >= 0) {
        this.defActive = '/dw/admin/user'
      } else if (fullPath.indexOf('/dw/user') >= 0) {
        this.defActive = '/dw/user'
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
</style>
