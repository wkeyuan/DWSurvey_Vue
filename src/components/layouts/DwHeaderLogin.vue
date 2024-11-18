<template>
  <div>
    <div>
      <div class="m-logbg"></div>
    </div>
    <div>
      <el-row class="dw-header-row" >
        <el-col :span="20" :offset="2">
          <div class="dw-header-main" >
            <el-row type="flex" justify="space-between" align="middle">
              <el-col :span="4" >
                <dw-header-logo></dw-header-logo>
              </el-col>
              <el-col :span="16">
                <div style="padding-left: 60px;color: white;">DWSurvey Bus - 全新的商业版，简单、稳定、实用</div>
              </el-col>
              <el-col :span="4" style="text-align: right;" >
                <div>
                  <div style="height: 80px;line-height: 80px;">
                    <!--                    <el-button type="primary">登录</el-button>-->
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import DwNavMenu from '@/components/layouts/DwNavMenu.vue'
import DwHeaderLogo from './DwHeaderLogo.vue'

export default {
  name: 'DwHeaderLogin',
  components: {
    DwHeaderLogo,
    'dw-nav-menu': DwNavMenu
  }
}
</script>

<style scoped>
.dw-header-row{
  background-color: var(--dw-primary-bg-color);
  /*opacity:0.85;*/
}
.dw-header-main{
  padding: 0px;
}
.el-dropdown-link{
  color: white;
}
.m-logbg {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
