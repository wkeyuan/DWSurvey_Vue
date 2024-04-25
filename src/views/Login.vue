<template>
  <div id="loginPage" >
    <div class="dw-display-flex-center">
      <div style="background-color: white;">
      </div>
      <div class="loginFormContent" >
        <div style="text-align: center;">
          <h3>欢迎登录</h3>
          <div>
            <el-tag type="success">调问网</el-tag>
            <el-tag type="warning">全新的问卷平台</el-tag>
            <el-tag>使用纯VUE全部重写</el-tag>
          </div>
        </div>
        <div>
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon label-position="top" label-width="100px" class="demo-ruleForm" @submit.native.prevent >
            <el-form-item label="用户名" prop="email">
              <el-input v-model="ruleForm.email" autocomplete="on" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input v-model="ruleForm.pass" type="password" autocomplete="off" show-password ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" native-type="submit" style="width: 100%;" @click="submitForm('ruleForm')" >登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import DwAuthorized from '../utils/dw-authorized'
import {msgError} from '../utils/dw-msg'
import {dwLogin} from '@/api/dw-login'
import {dwFooterUtils} from '../components/dw-survey-comp/dw-utils/dw-common/dw-footer-util'

export default {
  name: 'Login',
  data () {
    return {
      ruleForm: {
        email: '',
        pass: ''
      },
      rules: {
        email: [
          {required: true, message: '请输入登录账号', trigger: 'blur'}
          // {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        pass: [
          {required: true, message: '请输入登录密码', trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.pageH = window.height
    this.loadDwFooter()
  },
  methods: {
    loadDwFooter () {
      dwFooterUtils.getNewDwFooterInfo(function () {
        dwFooterUtils.isDemo((footerInfo) => { this.showDefaultDemoPwd(footerInfo) })
      })
    },
    showDefaultDemoPwd (footerInfo) {
      this.ruleForm.email = 'service@diaowen.net'
      this.ruleForm.pass = '123456'
    },
    submitForm (formName) {
      // 进行登录验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          dwLogin(this.ruleForm.email, this.ruleForm.pass).then((response) => {
            const resultData = response.data
            if (resultData.status === 'ok') {
              DwAuthorized.setAuthority(resultData.currentAuthority)
              DwAuthorized.setUserName(this.ruleForm.email)
              // this.$router.push('/dw/survey/')
              this.$router.push('/v6')
            } else {
              if (resultData.hasOwnProperty('httpResult') && resultData.httpResult!=null && resultData.httpResult.hasOwnProperty('resultMsg')) {
                msgError(resultData.httpResult.resultMsg)
              } else {
                msgError('登录失败，请确认！')
              }
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
#loginPage{
  /*background-image: url("http://localhost:8181/diaowen/images/style-model/login_bg/1.jpg");*/
}
.loginFormContent{
  padding: 20px;
  margin-top: 50px;
  background-color: white;
  border: 1px solid gainsboro;
  border-radius: 3px;
}
.loginFormContent{
  min-width: 400px;
}
</style>
