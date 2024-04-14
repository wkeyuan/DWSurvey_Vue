<template>
  <div>
    <div>
      <el-row class="dw-header-row" style="" >
        <el-col :span="20" :offset="2">
          <div class="dw-header-main" >
            <el-row type="flex" justify="space-between" align="middle">
              <el-col :span="4" >
                <dw-header-logo></dw-header-logo>
              </el-col>
              <el-col :span="14">
                <div style="padding-left: 60px;"><dw-nav-menu></dw-nav-menu></div>
              </el-col>
              <el-col :span="6" style="text-align: right;" >
                <div class="dw-display-flex-right">
                  <div style="color: #c2a20c;padding-right: 20px;font-size: 14px;cursor: pointer;" @click="openSwitchLayoutDialog">
                    <i class="fa-solid fa-toggle-on"></i> 切换布局
                  </div>
                  <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link" >
                      {{ userName }} <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="myAccount">我的账号</el-dropdown-item>
                      <el-dropdown-item command="updatePwd">修改密码</el-dropdown-item>
                      <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <switch-layout-dialog ref="switchLayoutDialog"></switch-layout-dialog>
    </div>
  </div>
</template>

<script>
import DwNavMenu from '@/components/layouts/DwNavMenu.vue'
import DwAuthorized from '@/utils/dw-authorized'
import {logout} from '@/api/dw-login'
import DwHeaderLogin from './DwHeaderLogin.vue'
import DwHeaderLogo from './DwHeaderLogo.vue'
import SwitchLayoutDialog from './components/SwitchLayoutDialog.vue'

export default {
  name: 'DwHeader',
  components: {
    SwitchLayoutDialog,
    DwHeaderLogo,
    DwHeaderLogin,
    'dw-nav-menu': DwNavMenu
  },
  data () {
    return {
      userName: 'dwsurvey',
      prevPath: '/v6'
    }
  },
  mounted () {
    this.userName = DwAuthorized.getUserName()
    /*
    const routePath = this.$route.path
    if (routePath.indexOf('/v6/lr') >= 0) {
      this.layout = 'lr'
    }*/
    const routePath = this.$route.path
    if (routePath.indexOf('/v6/lr') >= 0) {
      this.prevPath = '/v6/lr'
    }
  },
  methods: {
    handleCommand: function (command) {
      if (command === 'logout') {
        logout().then(() => {
          this.$router.push('/login')
        })
      } else if (command === 'myAccount') {
        this.$router.push(`${this.prevPath}/dw/user`)
      } else if (command === 'updatePwd') {
        this.$router.push(`${this.prevPath}/dw/user/pwd`)
      }
    },
    openSwitchLayoutDialog () {
      this.$refs.switchLayoutDialog.openDialog()
    }
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
