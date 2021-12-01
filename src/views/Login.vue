<template>
  <div id="loginPage" >
    <el-row :gutter="0">
      <el-col :span="10" :offset="7">
        <div class="loginFormContent" >
          <div style="text-align: center;">
            <h3>欢迎登录</h3>
            <div>
              <el-tag type="success">调问</el-tag>
              <el-tag type="warning">专业</el-tag>
              <el-tag>开源</el-tag>
              <el-tag type="success">实用的</el-tag>
              <el-tag type="warning">调查问卷系统</el-tag>
            </div>
          </div>
          <div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="top" label-width="100px" class="demo-ruleForm" @submit.native.prevent >
              <el-form-item label="用户名" prop="email">
                <el-input v-model="ruleForm.email" autocomplete="on" ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" native-type="submit" @click="submitForm('ruleForm')" style="width: 100%;">登录</el-button>
<!--                <el-button @click="resetForm('ruleForm')">重置</el-button>-->
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import API from '@/api/index.js'
import DwAuthorized from '../utils/dw-authorized'
import {msgError} from '../utils/dw-msg'
import { dwLogin } from "@/api/dw-login";


export default {
  name: 'Login.vue',
  data() {
    return {
      ruleForm: {
        email: '',
        pass: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        pass: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  mounted () {
    this.pageH = window.height
  },
  methods: {
    submitForm(formName) {
      // 进行登录验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          dwLogin(this.ruleForm.email,this.ruleForm.pass).then((response) => {
            const resultData = response.data
            console.log('login-begin')
            console.log(resultData)
            if(resultData.status==="ok"){
              DwAuthorized.setAuthority(resultData.currentAuthority)
              DwAuthorized.setUserName(this.ruleForm.email)
              this.$router.push('/dw/survey/')
            }else{
              if(resultData.hasOwnProperty('httpResult') && resultData.httpResult!=null && resultData.httpResult.hasOwnProperty('resultMsg')){
                msgError(resultData.httpResult.resultMsg)
              }else{
                msgError('登录失败，请确认！')
              }
            }
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
</style>
