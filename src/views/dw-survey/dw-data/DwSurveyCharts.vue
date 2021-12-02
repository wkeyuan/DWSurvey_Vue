<template>
  <div>
    <dw-survey-dcs-wrapper :id="id" is-survey-chart="true" >
      <template v-slot:dw-dcs-main-slot="{survey}" >
        <div v-loading="loading" >
          <dw-survey-charts-common v-for="(item,index) in questions" :key="item.id" :id="item.id" :index="index" :question="item" ></dw-survey-charts-common>
        </div>
      </template>
    </dw-survey-dcs-wrapper>
  </div>
</template>
<script>

import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper'
import DwSurveyChartsCommon from './DwsurveyChartsCommon'
import {msgInfo} from '@/utils/dw-msg'
import {dwSurveyReport} from '@/api/dw-survey'

export default {
  name: 'DwSurveyCharts',
  components: {
    DwSurveyDcsWrapper,
    DwSurveyChartsCommon
  },
  data () {
    return {
      questions: [],
      loading: true
    }
  },
  mounted () {
    this.surveyChartData()
  },
  methods: {
    surveyChartData: function () {
      dwSurveyReport(this.$route.params.id).then((response) => {
        const resultData = response.data.data
        this.questions = resultData.questions
        if (this.questions.length <= 0) {
          msgInfo('问卷还没有任何题目')
          this.loading = false
        }
        for (let i=0; i < this.questions.length; i++) {
          const questionData = this.questions[i]
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
          let quStatOptions = []
          if (questionData.quType === 'RADIO' || questionData.quType === 'CHECKBOX' || questionData.quType === 'SCORE' || questionData.quType === 'ORDERQU' || questionData.quType === 'MULTIFILLBLANK') {
            for (let j=0; j < quOptionsObj.length; j++) {
              let item = quOptionsObj[j]
              let quStatOption
              if (questionData.quType === 'RADIO' || questionData.quType === 'CHECKBOX') {
                const anCount = item.anCount
                if (count === 0) {
                  count = 1
                }
                if (anCount === null) {
                  quOptionsObj[j].anCount = 0
                }
                const bfbFloat = anCount / count * 100
                const percent = bfbFloat.toFixed(2)
                quOptionsObj[j].percent = percent
                quStatOption = {'optionName': item.optionName, 'anCount': item.anCount, 'percent': percent}
              } else if (questionData.quType === 'SCORE') {
                const avgScore = item.avgScore
                const bfbFloat = avgScore/questionData.paramInt02*100
                const percent = bfbFloat.toFixed(2)
                // 平均分 setAvgScore
                const anAvgScore = avgScore.toFixed(2)
                quStatOption = {'optionName': item.optionName, 'anCount': anAvgScore, 'percent': percent}
              } else if (questionData.quType === 'ORDERQU') {
                const bfbFloat = (quOptionsObj.length-j) / ((1+quOptionsObj.length)*quOptionsObj.length/2) * 100
                const percent = bfbFloat.toFixed(2)
                quStatOption = {'optionName': item.optionName, 'anCount': quOptionsObj.length-j, 'orderNum': j+1, 'percent': percent}
              } else if (questionData.quType === 'MULTIFILLBLANK') {
                const anCount = item.anCount
                if (count === 0) {
                  count = 1
                }
                if (anCount === null) {
                  quOptionsObj[j].anCount = 0
                }
                const bfbFloat = anCount / count * 100
                const percent = bfbFloat.toFixed(2)
                quOptionsObj[j].percent = percent
                quStatOption = {'optionName': item.optionName, 'anCount': item.anCount, 'percent': percent}
              }
              quStatOptions.push(quStatOption)
            }
          }
          this.questions[i].quStatOptions = quStatOptions
        }
        this.loading = false
      })
    }
  }
}

</script>
