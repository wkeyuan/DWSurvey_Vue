<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="dw-user-body">
          <el-row>
            <el-col :span="4" style="height: 600px;">
              <dw-user-menu></dw-user-menu>
            </el-col>
            <el-col :span="20">
              <div style="padding: 30px;width: 400px;">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon label-width="100px" label-position="top">
                  <el-form-item label="原密码" prop="oldPass">
                    <el-input v-model="ruleForm.oldPass" autocomplete="off" show-password></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="pass">
                    <el-input v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="checkPass">
                    <el-input v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
                  </el-form-item>
                  <el-form-item style="padding-top: 20px;">
                    <el-button type="primary" @click="submitForm('ruleForm')">提交修改</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>
                </el-form>
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
import {dwUserPwd} from '../../api/dw-user'
export default {
  name: 'DwUserPwd',
  components: {
    DwUserMenu
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        oldPass: ''
      },
      rules: {
        pass: [
          {required: true, message: '请输入新登录密码', trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {required: true, message: '请再次输入新登录密码', trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'},
          {validator: validatePass2, trigger: 'blur'}
        ],
        oldPass: [
          {required: true, message: '请输入原登录密码', trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {

  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          dwUserPwd(this.ruleForm.oldPass, this.ruleForm.pass).then((response) => {
            const httpResult = response.data
            if (httpResult.resultCode === 200) {
              this.$message.success('密码修改成功')
            } else {
              this.$message.error('密码修改失败')
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
.dw-user-body{
  background-color: white;
  min-height: 600px;
}
</style>
