<template>
  <div>
    <div v-loading="loading" >
      <dw-survey-charts-common v-for="(item,index) in questions" :key="item.id" :id="item.id" :index="index" :question="item" ></dw-survey-charts-common>
    </div>
  </div>
</template>

<script>
import {dwSurveyAnswerStatsV6} from '../api/dw-survey-answer-data'
import {getDesignSurveyJsonBySurveyId} from '../../dw-utils/dw-survey-common'
import DwSurveyChartsCommon from './DwSurveyChartsCommon.vue'

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
    surveyState () {
      const surveyId = this.$route.params.id
      const params = {surveyId}
      getDesignSurveyJsonBySurveyId(params, (survey) => {
        console.debug('design survey', survey)
        this.survey = survey
        dwSurveyAnswerStatsV6(params).then((response) => {
          console.debug('response', response)
          const responseResult = response.data
          this.surveyAggStats = responseResult.data
          const surveyAggMaps = this.surveyAggStats
          // 对结果进行处理
          const questions = this.survey.questions
          console.debug('questions', questions)
          questions.map((question, index) => {
            let quAnCount = 0
            console.debug('question', question)
            const quType = question.quType
            if (quType === 'RADIO') {
              const quRadios = question.quRadios
              quRadios.map((option, index) => {
                if (surveyAggMaps.hasOwnProperty('countRadio')) {
                  const radioAgg = surveyAggMaps.countRadio
                  for (const key in radioAgg) {
                    if (radioAgg.hasOwnProperty(key)) { // 确保属性是对象自身的而不是从原型链继承的
                      const value = radioAgg[key].docCount
                      if (option.dwId === key) {
                        option.anCount = value
                        quAnCount+=option.anCount
                        break
                      }
                    }
                  }
                }
              })
            } else if (quType === 'CHECKBOX') {
              const quCheckboxs = question.quCheckboxs
              quCheckboxs.map((option, index) => {
                if (surveyAggMaps.hasOwnProperty('countCheckbox')) {
                  const checkboxAgg = surveyAggMaps.countCheckbox
                  for (const key in checkboxAgg) {
                    if (checkboxAgg.hasOwnProperty(key)) { // 确保属性是对象自身的而不是从原型链继承的
                      const value = checkboxAgg[key].docCount
                      if (option.dwId === key) {
                        option.anCount = value
                        quAnCount+=option.anCount
                        break
                      }
                    }
                  }
                }
              })
            } else if (quType === 'SCORE') {
              const quScores = question.quScores
              quScores.map((option, index) => {
                if (surveyAggMaps.hasOwnProperty('optionStats')) {
                  const optionStats = surveyAggMaps.optionStats
                  for (const key in optionStats) {
                    if (optionStats.hasOwnProperty(key)) { // 确保属性是对象自身的而不是从原型链继承的
                      const value = optionStats[key].statsAvg
                      console.debug('value', value)
                      if (option.dwId === key) {
                        console.debug('option.dwId', option.dwId, key)
                        option.avgScore = value
                        break
                      }
                    }
                  }
                }
              })
            } else if (quType === 'ORDERQU') {
              const quOrderbys = question.quOrderbys
              quOrderbys.map((option, index) => {
                if (surveyAggMaps.hasOwnProperty('optionStats')) {
                  const optionStats = surveyAggMaps.optionStats
                  for (const key in optionStats) {
                    if (optionStats.hasOwnProperty(key)) { // 确保属性是对象自身的而不是从原型链继承的
                      const value = optionStats[key].statsAvg
                      if (option.dwId === key) {
                        console.debug('option.avgOrder', value)
                        option.avgOrder = value
                        break
                      }
                    }
                  }
                }
              })
              // 计算每组数据的名次
            }
            if (surveyAggMaps.hasOwnProperty('countQu')) {
              const quAgg = surveyAggMaps.countQu
              for (const key in quAgg) {
                if (quAgg.hasOwnProperty(key)) { // 确保属性是对象自身的而不是从原型链继承的
                  const value = quAgg[key].docCount
                  if (question.dwId === key) {
                    quAnCount = value
                    break
                  }
                }
              }
            }
            question.anCount = quAnCount
          })
          this.anCountStats(questions)
          this.loading = false
        })
      })
    },
    anCountStats (questions) {
      for (let i=0; i < questions.length; i++) {
        const questionData = questions[i]
        let count = questionData.anCount
        let quOptionsObj
        if (questionData.quType === 'CHECKBOX') {
          questionData.quTypeName = '多选题'
          quOptionsObj = questionData.quCheckboxs
        } else if (questionData.quType === 'RADIO') {
          questionData.quTypeName = '单选题'
          quOptionsObj = questionData.quRadios
        } else if (questionData.quType === 'FILLBLANK') {
          questionData.quTypeName = '填空题'
        } else if (questionData.quType === 'SCORE') {
          questionData.quTypeName = '评分题'
          quOptionsObj = questionData.quScores
        } else if (questionData.quType === 'ORDERQU') {
          questionData.quTypeName = '排序题'
          quOptionsObj = questionData.quOrderbys
        } else if (questionData.quType === 'MULTIFILLBLANK') {
          questionData.quTypeName = '多项填空题'
          quOptionsObj = questionData.quMultiFillblanks
        } else {
          questionData.quTypeName = questionData.quType
        }
        const quStatOptions = []
        if (questionData.quType === 'RADIO' || questionData.quType === 'CHECKBOX' || questionData.quType === 'SCORE' || questionData.quType === 'ORDERQU' || questionData.quType === 'MULTIFILLBLANK') {
          for (let j=0; j < quOptionsObj.length; j++) {
            const item = quOptionsObj[j]
            let quStatOption
            if (questionData.quType === 'RADIO' || questionData.quType === 'CHECKBOX') {
              const anCount = item.anCount
              if (count === 0) {
                count = 1
              }
              if (anCount === null || anCount=== undefined) {
                quOptionsObj[j].anCount = 0
              }
              const bfbFloat = item.anCount / count * 100
              const percent = bfbFloat.toFixed(2)
              quOptionsObj[j].percent = percent
              quStatOption = {'optionName': item.optionTitleObj.dwText, 'anCount': item.anCount, 'percent': percent}
            } else if (questionData.quType === 'SCORE') {
              const avgScore = item.avgScore
              const bfbFloat = avgScore/questionData.paramInt02*100
              const percent = bfbFloat.toFixed(2)
              // 平均分 setAvgScore
              const anAvgScore = avgScore.toFixed(2)
              quStatOption = {'optionName': item.optionTitleObj.dwText, 'anCount': anAvgScore, 'percent': percent}
            } else if (questionData.quType === 'ORDERQU') {
              // const bfbFloat = (quOptionsObj.length-j) / ((1+quOptionsObj.length)*quOptionsObj.length/2) * 100
              // const percent = bfbFloat.toFixed(2)
              const avgOrder = item.avgOrder
              const bfbFloat = (quOptionsObj.length-avgOrder)/quOptionsObj.length*100
              const percent = bfbFloat.toFixed(2)
              // 平均分 setAvgScore
              const anAvgOrder = avgOrder.toFixed(2)
              quStatOption = {'optionName': item.optionTitleObj.dwText, 'anCount': (quOptionsObj.length-avgOrder), 'orderNum': null, 'percent': percent, 'avgOrder': anAvgOrder}
            } else if (questionData.quType === 'MULTIFILLBLANK') {
              const anCount = item.anCount
              if (count === 0) {
                count = 1
              }
              if (anCount === null || anCount === undefined) {
                quOptionsObj[j].anCount = 0
              }
              const bfbFloat = item.anCount / count * 100
              const percent = bfbFloat.toFixed(2)
              quOptionsObj[j].percent = percent
              quStatOption = {'optionName': item.optionTitleObj.dwText, 'anCount': item.anCount, 'percent': percent}
            }
            quStatOptions.push(quStatOption)
          }
        }
        questions[i].quStatOptions = quStatOptions
      }
      this.questions = questions
    }
  }
}
</script>

<style scoped>

</style>
