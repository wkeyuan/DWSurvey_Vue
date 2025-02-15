<template>
  <div style="background: white;padding: 30px;min-height: 200px;margin-bottom: 30px;">
    <el-skeleton />
  </div>
</template>

<script>
import DwAuthorized from '../../utils/dw-authorized'

export default {
  name: 'DwAutoLogin',
  data () {
    return {
      loading: false
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      const query = this.$route.query
      console.log('query', query)
      if (query != null) {
        if (query.hasOwnProperty('token')) {
          const token = query.token
          console.log('token', token)
          DwAuthorized.setToken(token)
        }
        if (query.hasOwnProperty('authed')) {
          const authed = query.authed
          console.log('authed', authed)
          DwAuthorized.setAuthorityStr(authed)
        }
        if (query.hasOwnProperty('userName')) {
          const userName = query.userName
          console.log('userName', userName)
          DwAuthorized.setUserName(userName)
        }
        if (query.hasOwnProperty('to')) {
          const to = query.to
          // this.$router.push(to)
          window.location.href = to
        } else {
          this.$router.push('/')
        }
      }
      this.loading = true
    }
  }
}
</script>
