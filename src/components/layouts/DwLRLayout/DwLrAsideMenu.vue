<template>
  <el-aside width="initial" class="dw-lr-aside" >
    <div>
      <el-menu
        :default-active="defActive"
        :collapse="isCollapse"
        :unique-opened="true"
        text-color="#fff"
        active-text-color="#efc605"
        background-color="#064b91"
        style="border-right: none;"
        class="dw-menu"
        router
        @open="handleOpen"
        @close="handleClose">
        <template v-for="item in dwMenus" >
          <el-submenu v-if="item.children" :key="item.path" :index="prevPath+item.path" >
            <template slot="title" >
              <i :class="item.icon" ></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <template v-for="itemChild in item.children" >
              <el-menu-item v-has-dw-role="itemChild.authority" v-if="itemChild.name" :key="itemChild.path" :index="prevPath+itemChild.path" >
                <span slot="title">{{ itemChild.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else :key="item.path" :index="prevPath+item.path" >
            <i :class="item.icon" ></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
      <div
        :class="isCollapseActive ? 'mouseEnter' : 'mouseLeave'"
        class="dw-menu-collapse"
        style="display:none;"
        @click="isCollapse = !isCollapse"
        @mouseenter="mouseEnterIsCollapse"
        @mouseleave="mouseLeaveIsCollapse">
        <span style="width:24px;text-align: center;" > <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i> </span>
      </div>
    </div>
  </el-aside>
</template>

<script>

import {dwV6Menu} from '../../../router/dw-v6-menu'

export default {
  name: 'DwLrAsideMenu',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // isCollapse: false,
      isCollapseActive: false,
      defActive: '/v6/lr/dw/survey',
      dwMenus: dwV6Menu.dwMenus,
      prevPath: '/v6'
    }
  },
  watch: {
    $route: function (to, from) {
      this.setActiveMenu()
    }
  },
  mounted () {
    this.setActiveMenu()
    const routePath = this.$route.path
    if (routePath.indexOf('/v6/lr') >= 0) {
      this.prevPath = '/v6/lr'
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    mouseEnterIsCollapse () {

    },
    mouseLeaveIsCollapse () {

    },
    setActiveMenu () {
      /*
      const fullPath = this.$route.fullPath
      if (fullPath.indexOf('/dw/survey') >= 0) {
        this.defActive = '/v6/lr/dw/survey'
      } else if (fullPath.indexOf('/dw/admin/user') >= 0) {
        this.defActive = '/v6/lr/dw/admin/user'
      } else if (fullPath.indexOf('/dw/user') >= 0) {
        this.defActive = '/v6/lr/dw/user'
      }*/
    }
  }
}
</script>

<style scoped>
.dw-lr-aside{
  /*background-color: var(--dw-primary-bg-color);*/
}
.dw-menu {
  /*height: 100vh;*/
  height: 100vh;
}
.dw-menu:not(.el-menu--collapse) {
  width: 210px;
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
  bottom: 0px;
}
.mouseEnter{
  color: #eeeded
}
.mouseLeave{
  color: white;
}

/*
background-color="#34495e"
active-text-color="#409eff"
*/
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
  border-bottom: none!important;
}
.el-menu-item{
  transition: none!important;
}
*/

</style>
