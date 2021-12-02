<template>
  <el-menu
    :default-active="defActive"
    mode="horizontal"
    background-color="#34495e"
    text-color="#fff"
    active-text-color="#409eff"
    class="dw-menu-height dw-menu"
    router
    @select="handleSelect">
    <el-menu-item index="/dw/survey" >我的问卷</el-menu-item>
    <el-menu-item index="/dw/user" >个人中心</el-menu-item>
    <el-menu-item index="/dw/admin/user" v-has-dw-role="'DWSURVEY_SUPER_ADMIN'" >用户管理</el-menu-item>
<!--    <el-menu-item index="/#" >帮助文档</el-menu-item>-->
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
      console.debug("fullPath:"+fullPath)
      if (fullPath.indexOf('/dw/survey') >= 0) {
        this.defActive = '/dw/survey'
      } else if (fullPath.indexOf('/dw/admin/user') >= 0) {
        this.defActive = '/dw/admin/user'
      } else if (fullPath.indexOf('/dw/user') >= 0){
        this.defActive = '/dw/user'
      }
    }
  },
  watch: {
    $route: function (to, from) {
      this.setDefActive()
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
</style>
