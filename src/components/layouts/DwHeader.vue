<template>
  <div>
    <div>
      <el-row style="background-color: #34495e;opacity:0.85;" >
        <el-col :span="20" :offset="2">
          <div class="dw-header-main" >
            <el-row type="flex" justify="space-between" align="middle">
              <el-col :span="4" >
                <a href="/#/">
                  <el-image src="https://www.diaowen.net/images/20181214_logo.png" ></el-image>
                  <span style="color: #ffa71d;font-size: 14px;position: absolute;margin-left: 10px;">OSS</span>
                </a>
              </el-col>
              <el-col :span="16">
                <div style="padding-left: 60px;"><dw-nav-menu></dw-nav-menu></div>
              </el-col>
              <el-col :span="4" style="text-align: right;" >
                <div>
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
    </div>
  </div>
</template>

<script>
import DwNavMenu from '@/components/layouts/DwNavMenu.vue'
import API from '@/api/index.js'
import DwAuthorized from '@/utils/dw-authorized'
import {logout} from '@/api/dw-login'

export default {
  name: 'DwHeader.vue',
  data () {
    return {
      userName: 'dwsurvey'
    }
  },
  components: {
    'dw-nav-menu': DwNavMenu
  },
  mounted () {
    this.userName = DwAuthorized.getUserName()
  },
  methods: {
    handleCommand: function(command){
      console.debug(command);
      if (command === 'logout') {
        logout().then((response) => {
          const resultData = response.data
          this.$router.push('/login')
        })
      } else if (command === 'myAccount'){
        this.$router.push('/dw/user')
      } else if (command === 'updatePwd'){
        this.$router.push('/dw/user/pwd')
      }
    }
  }
}
</script>

<style scoped>
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
