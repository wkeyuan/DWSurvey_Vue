<template>
  <div>
    <dw-answer-default-layout v-model="survey" ></dw-answer-default-layout>
  </div>
</template>

<script>
import DwAnswerSurveyBody from './dw-answer-survey-body/DwAnswerSurveyBody.vue'
import DwAnswerDefaultLayout from './dw-anaswer-survey-layouts/dw-answer-default-layout/DwAnswerDefaultLayout.vue'
import {getSurveyJsonBySurveyId} from '../dw-utils/dw-survey-common'
import {Loading} from 'element-ui'
import {dwSurveyAnswerById} from './api/dw-survey-answer'

export default {
  name: 'DwAnswerSurveyMain',
  components: {DwAnswerDefaultLayout, DwAnswerSurveyBody},
  data () {
    return {
      /*
      survey: {
        surveyNameObj: {dwHtml: '', dwText: ''},
        surveyDetail: {
          surveyNodeObj: {dwHtml: '', dwText: ''}
        },
        answer: {questions: []},
        surveyStyle: {
          themeColor: 'none'
        }
      },
      */
      uuidList: [],
      survey: null,
      loading: true,
      answerData: null
    }
  },
  mounted () {
    console.debug('first id', this.$route.params.id)
    console.debug('first answerId', this.$route.params.answerId)
    this.loadSurvey()
  },
  methods: {
    loadSurvey () {
      const loadingInstance = Loading.service({
        fullscreen: true,
        spinner: 'fa-solid fa-spinner fa-spin-pulse',
        background: '#00000091',
        customClass: 'dw-loading',
        text: '问卷数据加载中'
      })
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
        survey.surveyStyle.themeColor = '#025bb7'
        survey.dwDebug = true
        // this.survey = survey
        this.loadAnswerData(survey)
        // 以服务的方式调用的 Loading 需要异步关闭
        this.$nextTick(() => { loadingInstance.close() })
      }, () => {
        this.$message.error('未找到最新的问卷JSON数据！')
      })
    },
    loadAnswerData (survey) {
      if (this.$route.params.hasOwnProperty('answerId') && this.$route.params.answerId!=null) {
        const answerId = this.$route.params.answerId
        dwSurveyAnswerById({answerId}).then((response) => {
          console.debug('loadAnswer response', response)
          const httpResult = response.data
          if (httpResult.resultCode === 200) {
            this.answerData = httpResult.data
          } else {
            this.$message.warning('未找到对应的答卷记录！')
          }
          this.answerData2Survey(survey)
        })
      } else {
        this.answerData2Survey(survey)
      }
    },
    answerData2Survey (survey) {
      if (this.answerData!=null) {
        // parseAnswerData(survey, this.answerData)
      }
      this.survey = survey
    }
  }
}
</script>

<style scoped>

</style>
<style>
.dw-loading .el-loading-spinner *{
  font-size: 20px!important;
  color: #023e79;
}
</style>
