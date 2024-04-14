<template>
  <div>
    <el-menu
      v-show="!isLrLayout"
      :default-active="defActive"
      class="el-menu-vertical-demo"
      style="height: 600px;"
      router>
      <el-menu-item index="/v6/dw/user" >
        <i class="el-icon-user"></i>
        <span slot="title">我的账号</span>
      </el-menu-item>
      <el-menu-item index="/v6/dw/user/pwd">
        <i class="el-icon-key"></i>
        <span slot="title">修改密码</span>
      </el-menu-item>
    </el-menu>

    <el-menu
      v-show="isLrLayout"
      :default-active="defActive"
      class="el-menu-vertical-demo"
      style="height: 600px;"
      router>
      <el-menu-item index="/v6/lr/dw/user" >
        <i class="el-icon-user"></i>
        <span slot="title">我的账号</span>
      </el-menu-item>
      <el-menu-item index="/v6/lr/dw/user/pwd">
        <i class="el-icon-key"></i>
        <span slot="title">修改密码</span>
      </el-menu-item>
    </el-menu>

  </div>
</template>

<script>
export default {
  name: 'DwUserMenu',
  data () {
    return {
      defActive: '/v6/lr/dw/user',
      prevPath: '/v6',
      isLrLayout: false
    }
  },
  mounted () {
    const routePath = this.$route.path
    if (routePath.indexOf('/v6/lr') >= 0) {
      this.prevPath = '/v6/lr'
      this.isLrLayout = true
    }
    this.setDefActive()
  },
  methods: {
    setDefActive () {
      const fullPath = this.$route.fullPath
      if (fullPath.indexOf('/dw/user/pwd') >= 0) {
        this.defActive = `${this.prevPath}/dw/user/pwd`
      } else {
        this.defActive = `${this.prevPath}/dw/user`
      }
    }
  }
}
</script>

<style scoped>

</style>
