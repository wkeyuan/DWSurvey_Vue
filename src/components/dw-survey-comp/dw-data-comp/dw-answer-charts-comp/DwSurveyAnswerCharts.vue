<template>
  <div>
    <div v-loading="loading">
      <dw-survey-charts-common v-for="(item,index) in questions" :id="item.id" :key="item.id" :index="index" :question="item"></dw-survey-charts-common>
    </div>
  </div>
</template>

<script>
import {dwSurveyAnswerStatsV6} from '../api/dw-survey-answer-data'
import {getDesignSurveyJsonBySurveyId} from '../../dw-utils/dw-survey-common'
import DwSurveyChartsCommon from './DwSurveyChartsCommon.vue'
import {dwAnswerChart} from './js/dw-answer-charts'

export default {
  name: 'DwSurveyAnswerCharts',
  components: {DwSurveyChartsCommon},
  data () {
    return {
      survey: null,
      surveyAggStats: null,
      questions: [],
      loading: true
    }
  },
  mounted () {
    this.surveyState()
  },
  methods: {
    initSurveyData () {
      const questions = this.survey.questions
      questions.map((question, index) => {
        const quType = question.quType
        if (quType === 'MATRIX_RADIO' || quType === 'MATRIX_CHECKBOX' || quType==='MATRIX_INPUT') {
          const quRows = question.quRows
          const quCols = question.quCols
          quRows.forEach((quOption, quOptionIndex) => {
            const rowCols = []
            quCols.forEach((quColOption) => {
              rowCols.push({dwId: quColOption.dwId, answerValue: null})
            })
            quOption.rowCols = rowCols
          })
        }
      })
    },
    surveyState () {
      const surveyId = this.$route.params.dwSurveyId
      const params = {surveyId}
      getDesignSurveyJsonBySurveyId(params, (survey) => {
        console.debug('design survey', survey)
        this.survey = survey
        dwSurveyAnswerStatsV6(params).then((response) => {
          console.debug('dwSurveyAnswerStatsV6 response', response)
          const responseResult = response.data
          this.surveyAggStats = responseResult.data
          // 加工统计数据
          dwAnswerChart.chartDataParse(this.survey, this.surveyAggStats)
          // 生成统计报表数据
          dwAnswerChart.anCountStats(this.survey.questions)
          this.questions = this.survey.questions
          this.loading = false
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
