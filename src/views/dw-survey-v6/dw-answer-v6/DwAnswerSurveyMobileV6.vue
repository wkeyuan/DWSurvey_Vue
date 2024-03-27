<template>
  <div style="height: 100vh;">
    <el-row>
      <el-col>
        <div style="font-size: 18px;text-align: center;padding: 30px;">加载中...</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'DwAnswerSurveyV6',
  data () {
    return {
      answerProps: {sid: null, answerId: null, anPwd: ''}
    }
  },
  mounted () {
    this.autoPush()
  },
  methods: {
    autoPush () {
      const sid = this.$route.params.sid
      const answerId = this.$route.params.answerId
      this.$router.push('/dw-v6/diaowen/'+sid)
    }
  }
}
</script>

<style scoped>

</style>
