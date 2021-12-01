<template>
  <!--    <img src="./assets/logo.png">-->
  <!--    <router-view/>-->
  <div id="app" >
    <router-view/>
  </div>
<!--  <div id="app" >
    <el-container style="padding: 0px;">
      <el-header height="80" style="padding: 0px;" >
        <component :is="currentHeader"></component>
      </el-header>
      <el-container style="z-index: 1;">
        <el-container>
          <el-main style="padding: 20px 0px;" >
            <router-view></router-view>
          </el-main>
          <el-footer><dw-footer></dw-footer></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>-->
</template>

<script>

import DwHeader from '@/components/layouts/DwHeader.vue'
import DwHeaderLogin from '@/components/layouts/DwHeaderLogin.vue'
import DwNavMenu from '@/components/layouts/DwNavMenu.vue'
import DwFooter from '@/components/layouts/DwFooter.vue'

export default {
  name: 'App',
  components: {
    'dw-nav-menu': DwNavMenu,
    'dw-header': DwHeader,
    'dw-header-login': DwHeaderLogin,
    'dw-footer': DwFooter
  },
  data () {
    return {
      currentHeader: 'dw-header'
    }
  },
  mounted () {
    this.loginStatus()
  },
  methods: {
    loginStatus: function () {
      const fullPath = this.$route.fullPath
      if(fullPath.indexOf("login")>=0){
        this.currentHeader = 'dw-header-login'
      }else{
        this.currentHeader = 'dw-header'
      }
    }
  }
}
</script>
<style>
body{
  background-color: #F1F1F1;
  /*#ffb25c*/
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-header{
  background-color: #25292E;
}
.el-footer {
  /*background-color: #B3C0D1;*/
  line-height: 60px;
  color: #7c7c7c;
}
.el-aside {
}
</style>
