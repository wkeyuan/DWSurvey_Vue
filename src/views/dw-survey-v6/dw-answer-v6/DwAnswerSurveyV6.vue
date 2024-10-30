<template>
  <div>
    <el-row>
      <el-col>
        <dw-answer-survey :answer-props="answerProps"></dw-answer-survey>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DwAnswerSurveyMain from '../../../components/dw-survey-comp/dw-answer-comp/DwAnswerSurveyMain.vue'
import DwAnswerSurvey from '../../../components/dw-survey-comp/dw-answer-comp/DwAnswerSurvey.vue'

export default {
  name: 'DwAnswerSurveyV6',
  components: {DwAnswerSurvey, DwAnswerSurveyMain},
  data () {
    return {
      answerProps: {sid: null, answerId: null, anPwd: ''}
    }
  },
  watch: {
    '$route' (to, from) {
      console.debug('parent to', to)
      this.answerProps.sid = this.$route.params.sid
      this.answerProps.answerId = this.$route.params.answerId
      // console.debug('answerProps:', this.answerProps)
    }
  },
  mounted () {
    this.answerProps.sid = this.$route.params.sid
    this.answerProps.answerId = this.$route.params.answerId
  }
}
</script>
