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
            } else if (quType === 'MATRIX_SCALE' || quType === 'MATRIX_SLIDER') {
              const quRows = question.quRows
              quRows.map((option, index) => {
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
            } else if (quType === 'MATRIX_RADIO') {
              const quRows = question.quRows
              const quCols = question.quCols
              quRows.map((rowOption, index) => {
                if (surveyAggMaps.hasOwnProperty('count_matrix_radio')) {
                  const countMatrixRadio = surveyAggMaps.count_matrix_radio
                  for (const rowKey in countMatrixRadio) {
                    if (countMatrixRadio.hasOwnProperty(rowKey)) { // 确保属性是对象自身的而不是从原型链继承的
                      const rowCountResult = countMatrixRadio[rowKey]
                      const rowDocCount = rowCountResult.docCount
                      console.debug('countMatrixRadio value', rowDocCount)
                      if (rowOption.dwId === rowKey) {
                        console.debug('countMatrixRadio option.dwId', rowOption.dwId, rowKey)
                        rowOption.anCount = rowDocCount
                        // 继续找这行对应的列
                        const rowCols = [] // 需要给矩阵每列生成占位数据
                        const rowAnAggMap = rowCountResult.rowAnAggMap
                        if (rowAnAggMap != null) {
                          quCols.forEach((quCol, rowColIndex) => {
                            const colDwId = quCol.dwId
                            if (!quCol.hasOwnProperty('tempEmptyOption') || (quCol.hasOwnProperty('tempEmptyOption') && !quCol.tempEmptyOption)) {
                              const quRowCol = {dwText: quCol.optionTitleObj.dwText, dwId: colDwId, anCount: 0}
                              for (const rowColKey in rowAnAggMap) {
                                if (rowAnAggMap.hasOwnProperty(rowColKey)) {
                                  const rowColDocCount = rowAnAggMap[rowColKey].docCount
                                  if (colDwId===rowColKey) {
                                    quRowCol.anCount = rowColDocCount
                                  }
                                }
                              }
                              rowCols.push(quRowCol)
                            }
                          })
                        }
                        rowOption.rowCols = rowCols
                      }
                    }
                  }
                }
              })
            } else if (quType === 'MATRIX_CHECKBOX') {
              const quRows = question.quRows
              const quCols = question.quCols
              quRows.map((rowOption, index) => {
                if (surveyAggMaps.hasOwnProperty('count_matrix_checkbox')) {
                  const countMatrixCheckbox = surveyAggMaps.count_matrix_checkbox
                  for (const rowKey in countMatrixCheckbox) {
                    if (countMatrixCheckbox.hasOwnProperty(rowKey)) { // 确保属性是对象自身的而不是从原型链继承的
                      const rowCountResult = countMatrixCheckbox[rowKey]
                      const rowDocCount = rowCountResult.docCount
                      console.debug('value', rowDocCount)
                      if (rowOption.dwId === rowKey) {
                        console.debug('option.dwId', rowOption.dwId, rowKey)
                        rowOption.anCount = rowDocCount
                        // 继续找这行对应的列
                        const rowCols = [] // 需要给矩阵每列生成占位数据
                        const rowAnAggMap = rowCountResult.rowAnAggMap
                        if (rowAnAggMap != null) {
                          quCols.forEach((quCol, rowColIndex) => {
                            const colDwId = quCol.dwId
                            if (!quCol.hasOwnProperty('tempEmptyOption') || (quCol.hasOwnProperty('tempEmptyOption') && !quCol.tempEmptyOption)) {
                              const quRowCol = {dwText: quCol.optionTitleObj.dwText, dwId: colDwId, anCount: 0}
                              for (const rowColKey in rowAnAggMap) {
                                if (rowAnAggMap.hasOwnProperty(rowColKey)) {
                                  const rowColDocCount = rowAnAggMap[rowColKey].docCount
                                  if (colDwId===rowColKey) {
                                    quRowCol.anCount = rowColDocCount
                                  }
                                }
                              }
                              rowCols.push(quRowCol)
                            }
                          })
                        }
                        rowOption.rowCols = rowCols
                      }
                    }
                  }
                }
              })
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
        } else if (questionData.quType === 'MULTIFILLBLANK') {
          questionData.quTypeName = '矩阵填空题'
        } else {
          questionData.quTypeName = questionData.quType
        }
        const quStatOptions = []
        if (questionData.quType === 'RADIO' || questionData.quType === 'CHECKBOX' || questionData.quType === 'SCORE' || questionData.quType === 'ORDERQU' || questionData.quType === 'MULTIFILLBLANK') {
          for (let j=0; j < quOptionsObj.length; j++) {
            const item = quOptionsObj[j]
            let quStatOption
            if (questionData.quType === 'RADIO' || questionData.quType === 'CHECKBOX') {
              let anCount = 0
              if (item.hasOwnProperty('anCount')) anCount = item.anCount
              if (count === 0) count = 1
              if (anCount === null || anCount=== undefined) anCount = 0
              item.anCount = anCount
              const bfbFloat = item.anCount / count * 100
              const percent = bfbFloat.toFixed(2)
              quOptionsObj[j].percent = percent
              quStatOption = {'optionName': item.optionTitleObj.dwText, 'anCount': item.anCount, 'percent': percent}
            } else if (questionData.quType === 'SCORE') {
              let avgScore = 0
              if (item.hasOwnProperty('avgScore')) avgScore = item.avgScore
              if (avgScore === null || avgScore=== undefined) avgScore = 0
              item.avgScore = avgScore
              const bfbFloat = avgScore/questionData.paramInt02*100
              const percent = bfbFloat.toFixed(2)
              // 平均分 setAvgScore
              const anAvgScore = avgScore.toFixed(2)
              quStatOption = {'optionName': item.optionTitleObj.dwText, 'anCount': anAvgScore, 'percent': percent}
            } else if (questionData.quType === 'ORDERQU') {
              // const bfbFloat = (quOptionsObj.length-j) / ((1+quOptionsObj.length)*quOptionsObj.length/2) * 100
              // const percent = bfbFloat.toFixed(2)
              let avgOrder = 0
              if (item.hasOwnProperty('avgOrder')) avgOrder = item.avgOrder
              if (avgOrder === null || avgOrder=== undefined) avgOrder = 0
              item.avgOrder = avgOrder
              const bfbFloat = avgOrder!==0?(quOptionsObj.length-avgOrder): avgOrder/quOptionsObj.length*100
              const percent = bfbFloat.toFixed(2)
              console.debug('percent', percent)
              // 平均分 setAvgScore
              const anAvgOrder = avgOrder.toFixed(2)
              quStatOption = {'optionName': item.optionTitleObj.dwText, 'anCount': avgOrder!==0?(quOptionsObj.length-avgOrder):0, 'orderNum': null, 'percent': percent, 'avgOrder': anAvgOrder}
            } else if (questionData.quType === 'MULTIFILLBLANK') {
              let anCount = 0
              if (item.hasOwnProperty('anCount')) anCount = item.anCount
              if (count === 0) count = 1
              if (anCount === null || anCount === undefined) anCount = 0
              item.anCount = anCount
              const bfbFloat = item.anCount / count * 100
              const percent = bfbFloat.toFixed(2)
              quOptionsObj[j].percent = percent
              quStatOption = {'optionName': item.optionTitleObj.dwText, 'anCount': item.anCount, 'percent': percent}
            }
            quStatOptions.push(quStatOption)
          }
        }
        if (questionData.quType === 'MATRIX_SCALE') {
          questionData.quTypeName = '矩阵量表题'
        } else if (questionData.quType === 'MATRIX_SLIDER') {
          questionData.quTypeName = '矩阵滑块题'
        }
        if (questionData.quType === 'MATRIX_SCALE' || questionData.quType === 'MATRIX_SLIDER') {
          const quRows = questionData.quRows
          for (let j=0; j < quRows.length; j++) {
            const item = quRows[j]
            let avgScore = 0
            if (item.hasOwnProperty('avgScore')) avgScore = item.avgScore
            if (avgScore === null || avgScore=== undefined) avgScore = 0
            item.avgScore = avgScore
            let max = 100
            if (questionData.quType === 'MATRIX_SCALE') {
              max = questionData.quAttr.scaleAttr.max
            }
            if (questionData.quType === 'MATRIX_SLIDER') {
              max = questionData.quAttr.sliderAttr.max
            }
            const bfbFloat = avgScore/max*100
            // console.debug('bfbFloat', bfbFloat)
            const percent = bfbFloat.toFixed(2)
            // 平均分 setAvgScore
            const anAvgScore = avgScore.toFixed(2)
            const quStatOption = {'optionName': item.optionTitleObj.dwText, 'anCount': anAvgScore, 'percent': percent}
            quStatOptions.push(quStatOption)
          }
        } else if (questionData.quType === 'MATRIX_RADIO' || questionData.quType === 'MATRIX_CHECKBOX') {
          if (questionData.quType === 'MATRIX_RADIO') {
            questionData.quTypeName = '矩阵单选题'
          } else if (questionData.quType === 'MATRIX_CHECKBOX') {
            questionData.quTypeName = '矩阵多选题'
          }
          const quRows = questionData.quRows
          for (let j=0; j < quRows.length; j++) {
            const quRow = quRows[j]
            let rowCount = 0
            if (quRow.hasOwnProperty('anCount')) rowCount = quRow.anCount
            if (rowCount === 0) rowCount = 1
            const quRowCols = quRow.rowCols
            for (let k=0; k < quRowCols.length; k++) {
              const rowCol = quRowCols[k]
              let anCount = 0
              if (rowCol.hasOwnProperty('anCount')) anCount = rowCol.anCount
              if (anCount === null || anCount=== undefined) anCount = 0
              rowCol.anCount = anCount
              const bfbFloat = rowCol.anCount / rowCount * 100
              const percent = bfbFloat.toFixed(2)
              rowCol.percent = percent
              const quStatOption = {'optionName': quRow.optionTitleObj.dwText+'-'+rowCol.dwText, 'anCount': rowCol.anCount, 'percent': rowCol.percent}
              quStatOptions.push(quStatOption)
            }
          }
          // 每行一个统计数据
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
