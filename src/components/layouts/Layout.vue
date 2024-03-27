<template>
  <!--    <img src="./assets/logo.png">-->
  <!--    <router-view/>-->
  <div id="dw-layout" >
    <el-container style="padding: 0px;">
      <el-header height="80" style="padding: 0px;" >
        <dw-header></dw-header>
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
  </div>
</template>

<script>

import DwHeader from '@/components/layouts/DwHeader.vue'
import DwHeaderLogin from '@/components/layouts/DwHeaderLogin.vue'
import DwNavMenu from '@/components/layouts/DwNavMenu.vue'
import DwFooter from '@/components/layouts/DwFooter.vue'

export default {
  name: 'Layout',
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
      if (fullPath.indexOf('login') >= 0) {
        this.currentHeader = 'dw-header-login'
      } else {
        this.currentHeader = 'dw-header'
      }
    }
  }
}
</script>
