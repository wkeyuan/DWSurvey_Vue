<template>
  <div>
    <dw-answer-input1 v-model="survey" :index="index" :input-attr="survey.questions[index].quAttr.inputAttr"></dw-answer-input1>
  </div>
</template>

<script>

import {answerQuEventCommon} from '../../../dw-utils/dw-survey-answer-common'
import DwAnswerInput1 from '../../dw-answer-options/dw-qu-input-common1/DwAnswerInput1.vue'

export default {
  name: 'DwAnswerQuFbk',
  components: {DwAnswerInput1},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}},
    answer: {type: Object, default: () => {}}
  },
  data () {
    return {
      inputText: ''
    }
  },
  computed: {
    isAnswer () {
      if (this.survey.questions[this.index].hasOwnProperty('answer')) {
        const answer = this.survey.questions[this.index].answer
        return answer !== null && answer !== undefined && answer !== ''
      }
      return false
    }
  },
  mounted () {
    // console.debug('this.survey.questions[this.index].answerA', this.survey.questions[this.index].answer)
    try {
      if (this.survey.questions[this.index].hasOwnProperty('answer') && this.survey.questions[this.index].answer!==undefined) {
        this.survey.questions[this.index].answer = JSON.parse(this.survey.questions[this.index].answer)
      }
    } catch (e) {
      console.debug('e', e)
    }
    // console.debug('this.survey.questions[this.index].answer', this.survey.questions[this.index].answer)
  },
  methods: {
    onBlur (event) {
      // getQuestionAnswerData(this.survey.questions[this.index])
      // validateQuestion(this.survey.questions[this.index])
      // surveyAnswerLocalStorage.saveSurveyAnswer2LocalStorage(this.survey)
      answerQuEventCommon(this.survey, this.index)
    }
  }
}
</script>

<style scoped>
@import '../../../../../../assets/css/dw-answer.css';

.dw-qu-item{
  display: grid;
  grid-template-columns: auto;
}

</style>
<style>
@media (max-width: 768px) {
  .el-date-range-picker .el-picker-panel__body {
    min-width: 100%;
  }
  .el-date-range-picker__content{
    width: 100% !important;
  }
  .el-date-range-picker{
    width: 80% !important;
  }
  .el-date-range-picker__content{
    margin: 0px;
    padding: 5px;
  }
  .el-date-range-picker__content.is-left{
    padding-bottom: 0px;
  }
  .el-date-range-picker__content.is-right {
    padding-top: 0px;
  }
  .el-date-table th{
    padding: 0px;
  }
  .el-date-table td{
    padding: 0px;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
  }
}

/** 移动端展示 **/
/*
@media screen and (max-width: 500px) {
  .el-picker-panel__sidebar {
    width: 100%;
  }
  .el-picker-panel {
    width: 400px!important;
  }
  .el-picker-panel__content {
    width: 100%;
  }
  .el-picker-panel__body{
    margin-left: 0!important;
    display: flex;
    flex-direction: column;
    min-width: auto!important;
  }
  .el-picker-panel__sidebar {
    position: relative;
  }
  .el-picker-panel__body-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
*/
</style>
