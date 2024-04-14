<template>
  <div>
    <el-row>
      <el-col :span="24" :offset="0">
        <div class="dw-user-body">
          <el-row>
            <el-col :span="4" style="height: 600px;">
              <dw-user-menu></dw-user-menu>
            </el-col>
            <el-col :span="20">
              <div style="padding: 30px;">
                <el-descriptions title="账号信息" column="1" border >
                  <el-descriptions-item label="账号">{{ userInfo.loginName }}</el-descriptions-item>
                  <el-descriptions-item label="状态">
                    <el-tag
                      v-if="userInfo.status === 0"
                      type="danger" >不可用</el-tag>
                    <el-tag
                      v-else-if="userInfo.status === 1"
                      type="info" >未激活</el-tag>
                    <el-tag
                      v-else-if="userInfo.status === 2"
                      type="success" >激活</el-tag>
                    <el-tag v-else disable-transitions style="margin-left: 10px" >未知</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="创建时间">{{ userInfo.createTime }}</el-descriptions-item>
                  <el-descriptions-item label="登录时间">{{ userInfo.lastLoginTime }}</el-descriptions-item>
                </el-descriptions>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import DwUserMenu from './DwUserMenu'
import {dwUserInfo} from '../../api/dw-user'

export default {
  name: 'DwUser',
  components: {
    DwUserMenu
  },
  data () {
    return {
      userInfo: {}
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      dwUserInfo().then((response) => {
        const resultData = response.data.data
        this.userInfo = resultData
      })
    }
  }
}
</script>

<style scoped>
.dw-user-body{
  background-color: white;
  min-height: 600px;
}
</style>
