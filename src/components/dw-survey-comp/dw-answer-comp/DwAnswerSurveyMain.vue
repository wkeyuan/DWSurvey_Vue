<template>
  <dw-answer-default-layout v-model="survey" ></dw-answer-default-layout>
</template>

<script>
import DwAnswerSurveyBody from './dw-answer-survey-body/DwAnswerSurveyBody.vue'
import {querySurveyAll} from '../dw-design-comp/dw-design-survey-comp/api/dw-design-survey-api'
import {parseSurvey} from '../dw-utils/dw-parse-survey'
import DwAnswerDefaultLayout from './dw-anaswer-survey-layouts/dw-answer-default-layout/DwAnswerDefaultLayout.vue'

export default {
  name: 'DwAnswerSurveyMain',
  components: {DwAnswerDefaultLayout, DwAnswerSurveyBody},
  data () {
    return {
      survey: {}
    }
  },
  mounted () {
    this.loadSurvey()
  },
  methods: {
    loadSurvey () {
      const surveyId = this.$route.params.id
      const params = {surveyId}
      querySurveyAll(params).then((response) => {
        console.debug('querySurveyAll', response)
        const httpResult = response.data
        if (httpResult.resultCode === 200) {
          // this.survey = httpResult.data
          console.debug('httpResult.data', httpResult.data)
          const surveyData = parseSurvey(httpResult.data)
          console.debug('parseResultData', surveyData)
          this.survey = surveyData
          // quRadios
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
