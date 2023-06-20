<template>
  <dw-answer-default-layout v-model="survey" ></dw-answer-default-layout>
</template>

<script>
import DwAnswerSurveyBody from './dw-answer-survey-body/DwAnswerSurveyBody.vue'
import {querySurveyAll} from '../dw-design-comp/dw-design-survey-comp/api/dw-design-survey-api'
import {parseSurvey} from '../dw-utils/dw-survey-parse'
import DwAnswerDefaultLayout from './dw-anaswer-survey-layouts/dw-answer-default-layout/DwAnswerDefaultLayout.vue'
import {buildAnswerSurveyObj} from "../dw-utils/dw-survey-answer";
import {getSurveyJsonBySurveyId} from "../dw-utils/dw-survey-common";

export default {
  name: 'DwAnswerSurveyMain',
  components: {DwAnswerDefaultLayout, DwAnswerSurveyBody},
  data () {
    return {
      survey: {
        surveyNameObj: {dwHtml: '', dwText: ''},
        surveyDetail: {
          surveyNodeObj: {dwHtml: '', dwText: ''}
        },
        answer: {questions: []},
        surveyStyle: {
          themeColor: 'none'
        }
      }
    }
  },
  mounted () {
    this.loadSurvey()
  },
  methods: {
    loadSurvey () {
      const surveyId = this.$route.params.id
      const params = {surveyId}
      /*
      querySurveyAll(params).then((response) => {
        console.debug('querySurveyAll', response)
        const httpResult = response.data
        if (httpResult.resultCode === 200) {
          // this.survey = httpResult.data
          console.debug('httpResult.data', httpResult.data)
          const surveyData = parseSurvey(httpResult.data)
          console.debug('parseResultData', surveyData)
          // quRadios
          // surveyData.answer = buildAnswerSurveyObj(surveyData)
          surveyData.surveyStyle.themeColor = '#3f9eff'
          surveyData.dwDebug = false
          this.survey = surveyData
        }
      })
      */
      getSurveyJsonBySurveyId(params, (survey) => {
        survey.surveyStyle.themeColor = '#3f9eff'
        survey.dwDebug = false
        this.survey = survey
      })
    }
  }
}
</script>

<style scoped>

</style>
