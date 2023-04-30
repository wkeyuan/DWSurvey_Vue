<template>
  <div id="loginPage"></div>
</template>
<script>
import DwAuthorized from '../utils/dw-authorized'
import {msgError} from '../utils/dw-msg'
import {casdoorCallback} from '@/api/dw-login'

export default {
  name: 'CasdoorCallback',
  data () {
    return {}
  },
  async mounted () {
    this.pageH = window.height
    const q = this.$route.query
    this.login(q.code, q.state)
  },
  methods: {
    login (code, state) {
      // 进行登录验证
      const params = {
        code: code,
        state: state
      }
      casdoorCallback(params).then(response => {
        const resultData = response.data
        if (resultData.status === 'ok') {
          DwAuthorized.setAuthority(resultData.currentAuthority)
          DwAuthorized.setUserName(resultData.username)
          this.$router.push('/dw/survey/')
        } else {
          if (
            resultData.hasOwnProperty('httpResult') &&
            resultData.httpResult != null &&
            resultData.httpResult.hasOwnProperty('resultMsg')
          ) {
            msgError(resultData.httpResult.resultMsg)
          } else {
            msgError('登录失败，请确认！')
          }
        }
      })
    }
  }
}
</script>
