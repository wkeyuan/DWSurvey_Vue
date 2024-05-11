<template>
  <!--    <img src="./assets/logo.png">-->
  <!--    <router-view/>-->
  <div id="dw-layout" >
    <el-container style="padding: 0;">
      <el-header style="padding: 0;position: fixed;z-index: 20;width: 100%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);" >
        <dw-lr-header></dw-lr-header>
      </el-header>
      <el-container style="z-index: 1;" class="dw-admin-container">
        <div style="position: fixed;z-index: 10;top:60px;">
          <dw-lr-aside-menu :is-collapse="isCollapse"></dw-lr-aside-menu>
        </div>
        <el-container :style="`padding-left: ${containerPaddingLeft}px;`" style="padding-top: 60px;">
          <el-main style="padding: 0;">
            <el-main style="padding: 20px;" >
              <router-view></router-view>
            </el-main>
            <el-footer style="height: auto;"><dw-footer></dw-footer></el-footer>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <div
      :class="isCollapseActive ? 'mouseEnter' : 'mouseLeave'"
      class="dw-menu-collapse"
      @click="collapseClick"
      @mouseenter="mouseEnterIsCollapse"
      @mouseleave="mouseLeaveIsCollapse">
      <span style="width:24px;text-align: center;" > <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i> </span>
    </div>
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
      currentHeader: 'dw-header',
      isCollapse: false,
      isCollapseActive: false,
      containerPaddingLeft: 210
    }
  },
  mounted () {
    this.loginStatus()
  },
  created () {

  },
  methods: {
    mouseEnterIsCollapse () {

    },
    mouseLeaveIsCollapse () {

    },
    collapseClick () {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.containerPaddingLeft = 64
      } else {
        this.containerPaddingLeft = 210
      }
    },
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
.dw-menu-collapse{
  /*background: #213242;*/
  /*background: #34495e;*/
  /*background: #233c54;*/
  line-height: 40px;
  padding-left: 22px;
  font-size: 18px;
  position: fixed;
  cursor: pointer;
  bottom: 0;
  z-index: 100;
}
.mouseEnter{
  color: #eeeded
}
.mouseLeave{
  color: white;
}
</style>
