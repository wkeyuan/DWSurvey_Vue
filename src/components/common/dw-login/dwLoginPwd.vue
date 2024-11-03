<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon label-position="top" label-width="100px" class="demo-ruleForm" @submit.native.prevent >
      <el-form-item label="账号" prop="email">
        <el-input v-model="ruleForm.email" autocomplete="on" placeholder="请输入登录账号" ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" show-password placeholder="请输入登录账号密码" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" style="width: 100%;" @click="submitForm" >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import DwJsencrypt from '../../../utils/dw-jsencrypt'

export default {
  name: 'DwLoginPwd',
  data () {
    return {
      ruleForm: {
        email: '',
        pass: ''
      },
      rules: {
        email: [
          {required: true, message: '请输入登录账号', trigger: 'blur'},
          // {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        pass: [
          {required: true, message: '请输入账号密码', trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      const passcode = DwJsencrypt.dwGetCode(this.ruleForm.pass+'')
      console.log('passcode',passcode)
      this.$emit('login', {type: 'account', userName: this.ruleForm.email, password: passcode})
    },
    submitForm () {
      // 进行登录验证
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.handleSubmit()
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

</style>
