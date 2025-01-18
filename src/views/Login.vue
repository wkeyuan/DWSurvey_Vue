<template>
  <div id="loginPage" :style="{height: pageH, backgroundImage: pageBackgroundImage}" >
    <el-row :gutter="0">
      <el-col :span="24" >
        <div class="loginFormContent" >
          <div style="text-align: center;">
            <div v-if="surveyStyle.anLoginTitle === null">
              <h3>欢迎登录</h3>
            </div>
            <div v-else>
              <h3>{{ surveyStyle.anLoginTitle }}</h3>
              <div>
                <el-tag v-if="surveyStyle.anLoginTitleNote === null" type="success">请登录再作答此问卷</el-tag>
                <div v-else style="font-size: 14px;color: #a1a2a2;">{{ surveyStyle.anLoginTitleNote }}</div>
              </div>
            </div>
          </div>
          <div style="padding: 10px;" class="dw-tabs-login">
            <el-tabs v-model="tabType" @tab-click="handleClick">
              <el-tab-pane v-if="loginProp.loginPwd" label="账户密码登录" name="pwd">
                <dw-login-pwd @login="login" ></dw-login-pwd>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import DwAuthorized from '../utils/dw-authorized'
import {msgError} from '../utils/dw-msg'
import {answerLoginSurveyInfo, dwLogin} from '../api/dw-login'
import DwLoginPwd from '../components/common/dw-login/dwLoginPwd'
import {getBrowser} from '../utils/dw-common'
import {dwFooterUtils} from '../components/dw-survey-comp/dw-utils/dw-common/dw-footer-util'
export default {
  name: 'Login',
  components: {DwLoginPwd},
  data () {
    return {
      tabType: 'pwd',
      loading: false,
      surveyName: '',
      pageH: '600px',
      pageBackgroundImage: '',
      surveyStyle: {
        surveyId: null,
        anLoginTitle: null,
        anLoginTitleNote: null,
        anLoginBgImg: null
      },
      // surveyName: '',
      // tabType: 'wx',
      loginProp: {
        loginWx: true,
        loginPhone: true,
        loginPwd: true,
        register: true
      }
    }
  },
  mounted () {
    this.pageH = window.height
    this.load()
  },
  methods: {
    load () {
      const query = this.$route.query
      if (query.hasOwnProperty('sid')) {
        answerLoginSurveyInfo(query.sid).then((response) => {
          console.debug('answerLoginSurveyInfo',response)
          const httpResult = response.data
          if (httpResult.resultCode === 200) {
            const resultData = httpResult.data
            if (resultData.hasOwnProperty('surveyStyle')){
              const surveyStyle = httpResult.data.surveyStyle
              if (surveyStyle!==null) {
                this.surveyStyle = surveyStyle
                const anLoginBgImg = this.surveyStyle.anLoginBgImg
                if (anLoginBgImg !== null && anLoginBgImg !== '') {
                  this.pageBackgroundImage = `url(${process.env.DW_RESOURCE_URL}${anLoginBgImg})`
                }
              }
            } else {
              this.surveyStyle.anLoginTitle = httpResult.data.surveyNameText
            }
          }
        })
        this.pageH = `${window.innerHeight}px`
      }
      const browser = getBrowser()
      console.debug('browser', browser)
    },
    handleClick (tab, event) {
    },
    login (params) {
      const query = this.$route.query
      const {type} = params
      dwLogin(params).then((response) => {
        const resultData = response.data
        console.log('resultData', resultData)
        if (resultData.status === 'ok') {
          DwAuthorized.setAuthority(resultData.currentAuthority)
          DwAuthorized.setToken(resultData.token)
          if (resultData !== null && resultData.hasOwnProperty('httpResult')) {
            const httpResult = resultData.httpResult
            if (httpResult !== null && httpResult.hasOwnProperty('data')) {
              if (httpResult.data !== null) {
                DwAuthorized.setUserName(httpResult.data.loginName)
                DwAuthorized.setLoginCount(httpResult.data.loginCount)
              }
            }
          }
          if (query.hasOwnProperty('sid')) {
            this.$router.push(`/diaowen/${query.sid}`)
          } else {
            dwFooterUtils.setLayout('lr')
            this.$router.push('/')
          }
        } else {
          if (type !== 'weixin') {
            if (resultData.hasOwnProperty('httpResult') && resultData.httpResult!=null && resultData.httpResult.hasOwnProperty('resultMsg')) {
              const resultMsg = resultData.httpResult.resultMsg
              if (resultMsg === 'ExcessiveAttemptsException') {
                msgError('密码错误超过限定次数，请联系管理员')
              } else if (resultMsg === 'IncorrectCredentialsException' || resultMsg === 'AuthenticationException' || resultMsg==='') {
                msgError('用户名或密码错误或被禁用，请确认')
              } else {
                msgError(resultMsg)
              }
            } else {
              msgError('登录失败，请确认！')
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped>
#loginPage{
  /*background-image: url("/survey/images/style-model/login_bg/1.jpg");*/
  -moz-background-size: cover;
  background-size: cover;
  background-repeat: no-repeat;
}
.loginFormContent{
  width: 350px;
  margin: 0px auto;
}
.loginFormContent{
  padding: 20px;
  margin-top: 50px;
  background-color: white;
  border: 1px solid gainsboro;
  border-radius: 3px;
}
.dw-tabs-login /deep/
.el-tabs__nav-wrap
.el-tabs__nav-scroll{
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
