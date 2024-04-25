<template>
  <!--    <img src="./assets/logo.png">-->
  <!--    <router-view/>-->
  <div id="dw-layout" >
    <el-container style="padding: 0;">
      <el-header style="padding: 0;" >
        <dw-lr-header></dw-lr-header>
      </el-header>
      <el-container style="z-index: 1;" class="dw-admin-container">
        <dw-lr-aside-menu></dw-lr-aside-menu>
        <el-container style="">
          <el-main style="padding: 0px;">
            <el-main style="padding: 20px;" >
              <router-view></router-view>
            </el-main>
            <el-footer style="height: auto;"><dw-footer></dw-footer></el-footer>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import DwLrHeader from './DwLrHeader.vue'
import DwLrAsideMenu from './DwLrAsideMenu.vue'
import DwFooter from '../DwFooter.vue'

export default {
  name: 'DwLrLayout',
  components: {
    DwFooter,
    DwLrAsideMenu,
    DwLrHeader
  },
  data () {
    return {
      currentHeader: 'dw-header'
    }
  },
  mounted () {
    this.loginStatus()
  },
  created () {

  },
  methods: {
    loginStatus: function () {
      const fullPath = this.$route.fullPath
      if (fullPath.indexOf('login') >= 0) {
        this.currentHeader = 'dw-header-login'
      } else {
        this.currentHeader = 'dw-header'
      }
    }
  }
}
</script>
<style scoped>
body{
  background-color: #F1F1F1;
  /*#ffb25c*/
  background-image: none;
}
.dw-admin-container{
  /*height: calc(100vh - 60px);*/
}
</style>
