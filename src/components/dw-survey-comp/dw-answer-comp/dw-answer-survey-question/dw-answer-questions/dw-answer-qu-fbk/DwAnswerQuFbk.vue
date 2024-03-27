<template>
  <div style="padding: 0;margin-bottom: 5px;" class="dw-qu-item">
    <!--    <div>{{ survey.questions[index].quAttr }}</div>-->
    <el-input v-if="survey.questions[index].quAttr.inputAttr.commonAttr.inputRow>1" v-model="survey.questions[index].answer" :class="isAnswer ? 'dw-input-active':''" :placeholder="survey.questions[index].quAttr.inputAttr.commonAttr.placeholder" :autosize="{ minRows: survey.questions[index].quAttr.inputAttr.commonAttr.inputRow }" type="textarea" @blur="onBlur" @input="onBlur"></el-input>
    <template v-else-if="survey.questions[index].quAttr.inputAttr.commonAttr.checkType==='TIME'">
      <template v-if="survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===7" >
        <!-- dateFormat 为7 =HH:ss，使用下拉时间选择框，且可以设置步长              -->
        <div>
          <template v-if="survey.questions[index].quAttr.inputAttr.dateTimeAttr.attrs.includes('range')" >
            <!-- 使用范围选择器           -->
            <div>
              <template v-if="survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.step!=null && survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range!==null">
                <!-- STEP、range 都不为空              -->
                <div><el-time-select v-model="survey.questions[index].answer.startTime" :picker-options="{start:survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range[0], step: survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.step, end:survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range[1], format: survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="起始时间" @blur="onBlur" ></el-time-select></div>
                <div><el-time-select v-model="survey.questions[index].answer.endTime" :picker-options="{start:survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range[0], step: survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.step, end:survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range[1], minTime: survey.questions[index].answer.startTime, format: survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="结束时间" @blur="onBlur" ></el-time-select></div>
              </template>
              <template v-if="survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.step===null && survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range!==null">
                <!-- step为空，range不为空，但注意STEP點认值 = 00:30              -->
                <div><el-time-select v-model="survey.questions[index].answer.startTime" :picker-options="{start:survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range[0], end:survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range[1], format: survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="起始时间" @blur="onBlur" ></el-time-select></div>
                <div><el-time-select v-model="survey.questions[index].answer.endTime" :picker-options="{start:survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range[0], end:survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range[1], minTime: survey.questions[index].answer.startTime, format: survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="结束时间" @blur="onBlur" ></el-time-select></div>
              </template>
              <template v-else-if="survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.step!==null && survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range===null">
                <!-- step不为空，range为空             -->
                <div><el-time-select v-model="survey.questions[index].answer.startTime" :picker-options="{step: survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.step, format: survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="起始时间" @blur="onBlur" ></el-time-select></div>
                <div><el-time-select v-model="survey.questions[index].answer.endTime" :picker-options="{step: survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.step, minTime: survey.questions[index].answer.startTime, format: survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="结束时间" @blur="onBlur" ></el-time-select></div>
              </template>
            </div>
          </template>
          <template v-else >
            <!-- 不使用范围选择器           -->
            <div>
              <template v-if="survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.step!=null && survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range!==null">
                <!-- STEP、range 都不为空              -->
                <div><el-time-select v-model="survey.questions[index].answer" :picker-options="{start:survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range[0], step: survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.step, end:survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range[1], format: survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="请选择时间" @blur="onBlur" ></el-time-select></div>
              </template>
              <template v-if="survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.step===null && survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range!==null">
                <!-- step为空，range不为空，但注意STEP點认值 = 00:30              -->
                <div><el-time-select v-model="survey.questions[index].answer" :picker-options="{start:survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range[0], end:survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range[1], format: survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="请选择时间" @blur="onBlur" ></el-time-select></div>
              </template>
              <template v-else-if="survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.step!==null && survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range===null">
                <!-- step不为空，range为空             -->
                <div><el-time-select v-model="survey.questions[index].answer" :picker-options="{step: survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.step, format: survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="请选择时间" @blur="onBlur" ></el-time-select></div>
              </template>
              <template v-else>
                <div><el-time-select v-model="survey.questions[index].answer" :picker-options="{format: survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="请选择时间" @blur="onBlur" ></el-time-select></div>
              </template>
            </div>
          </template>
        </div>
      </template>
      <template v-else>
        <!--  dateFormat 为5 = 'HH:mm:ss'，6 = 'HH:mm'     -->
        <template v-if="survey.questions[index].quAttr.inputAttr.dateTimeAttr.attrs.includes('range')" >
          <el-time-picker
            v-model="survey.questions[index].answer"
            :format="survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'"
            :disabled="survey.readonly"
            :class="isAnswer ? 'dw-input-active':''"
            is-range
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
@blur="onBlur"
            @input="onBlur"/>
        </template>
        <template v-else>
          <template v-if="survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range!==null" >
            <el-time-picker v-model="survey.questions[index].answer" :picker-options="{selectableRange: survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range!==null ? `${survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range[0]} - ${survey.questions[index].quAttr.inputAttr.dateTimeAttr.timeRange.range[1]}`: null}" :format="survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'" :class="isAnswer ? 'dw-input-active':''" :placeholder="survey.questions[index].quAttr.inputAttr.commonAttr.placeholder" :disabled="survey.readonly" @blur="onBlur" @input="onBlur"/>
          </template>
          <template v-else>
            <el-time-picker v-model="survey.questions[index].answer" :format="survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'" :class="isAnswer ? 'dw-input-active':''" :placeholder="survey.questions[index].quAttr.inputAttr.commonAttr.placeholder" :disabled="survey.readonly" @blur="onBlur" @input="onBlur"/>
          </template>
        </template>
      </template>
    </template>
    <template v-else-if="survey.questions[index].quAttr.inputAttr.commonAttr.checkType==='DATE'">
      <template v-if="survey.questions[index].quAttr.inputAttr.dateTimeAttr.attrs.includes('range')">
        <template v-if="survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===3">
          <el-date-picker v-model="survey.questions[index].answer" :disabled="survey.readonly" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" @blur="onBlur" ></el-date-picker>
        </template>
        <template v-else-if="survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===2">
          <el-date-picker v-model="survey.questions[index].answer" :disabled="survey.readonly" type="monthrange" start-placeholder="开始月份" end-placeholder="结束月份" @blur="onBlur" ></el-date-picker>
        </template>
        <template v-else-if="survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===1">
          <el-date-picker v-model="survey.questions[index].answer" :disabled="survey.readonly" type="date" placeholder="选择日期" @blur="onBlur" ></el-date-picker>
        </template>
      </template>
      <template v-else>
        <template v-if="survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===3">
          <el-date-picker v-model="survey.questions[index].answer" :type="survey.questions[index].quAttr.inputAttr.dateTimeAttr.attrs.includes('more') ? 'dates':'date'" :disabled="survey.readonly" placeholder="选择日期" @blur="onBlur" ></el-date-picker>
        </template>
        <template v-else-if="survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===2">
          <el-date-picker v-model="survey.questions[index].answer" :type="survey.questions[index].quAttr.inputAttr.dateTimeAttr.attrs.includes('more') ? 'months':'month'" :disabled="survey.readonly" placeholder="选择月" @blur="onBlur" ></el-date-picker>
        </template>
        <template v-else-if="survey.questions[index].quAttr.inputAttr.dateTimeAttr.dateFormat===1">
          <el-date-picker v-model="survey.questions[index].answer" :type="survey.questions[index].quAttr.inputAttr.dateTimeAttr.attrs.includes('more') ? 'years':'year'" :disabled="survey.readonly" placeholder="选择年" @blur="onBlur" ></el-date-picker>
        </template>
      </template>
    </template>
    <template v-else-if="survey.questions[index].quAttr.inputAttr.commonAttr.checkType==='DATETIME'">
      <!--    DATE DATETIME-->
      <template v-if="survey.questions[index].quAttr.inputAttr.dateTimeAttr.attrs.includes('range')">
        <el-date-picker v-model="survey.questions[index].answer" :disabled="survey.readonly" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" @blur="onBlur" ></el-date-picker>
      </template>
      <template v-else>
        <el-date-picker v-model="survey.questions[index].answer" :disabled="survey.readonly" type="datetime" placeholder="选择日期" @blur="onBlur" ></el-date-picker>
      </template>
    </template>
    <template v-else-if="survey.questions[index].quAttr.inputAttr.commonAttr.checkType==='NUM'">
      <!--    NUM-->
      <el-input-number v-model="survey.questions[index].answer" :precision="survey.questions[index].quAttr.inputAttr.numAttr.precision" :min="survey.questions[index].quAttr.inputAttr.numAttr.min" :max="survey.questions[index].quAttr.inputAttr.numAttr.max" :disabled="survey.readonly" label="描述文字"></el-input-number>
    </template>
    <template v-else-if="survey.questions[index].quAttr.inputAttr.commonAttr.checkType==='DIGITS'">
      <!--    DIGITS  -->
      <el-input-number v-model="survey.questions[index].answer" :min="survey.questions[index].quAttr.inputAttr.numAttr.min" :max="survey.questions[index].quAttr.inputAttr.numAttr.max" :step="1" :disabled="survey.readonly" step-strictly label="描述文字"></el-input-number>
    </template>
    <template v-else>
      <el-input v-model="survey.questions[index].answer" :minlength="survey.questions[index].quAttr.inputAttr.commonAttr.minlength" :maxlength="survey.questions[index].quAttr.inputAttr.commonAttr.maxlength" :class="isAnswer ? 'dw-input-active':''" :placeholder="survey.questions[index].quAttr.inputAttr.commonAttr.placeholder" :disabled="survey.readonly" show-word-limit @blur="onBlur" @input="onBlur"/>
    </template>
  </div>
</template>

<script>

import {validateQuestion} from '../../../../dw-utils/dw-survey-answer-validate'
import {getQuestionAnswerData} from '../../../../dw-utils/dw-survey-answer'
import {surveyAnswerLocalStorage} from '../../../dw-utils/dw-survey-answer-utils'

export default {
  name: 'DwAnswerQuFbk',
  components: {},
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
    console.debug('this.survey.questions[this.index].answerA', this.survey.questions[this.index].answer)
    try {
      if (this.survey.questions[this.index].hasOwnProperty('answer') && this.survey.questions[this.index].answer!==undefined) {
        this.survey.questions[this.index].answer = JSON.parse(this.survey.questions[this.index].answer)
      }
    } catch (e) {
      console.debug('e', e)
    }
    console.debug('this.survey.questions[this.index].answer', this.survey.questions[this.index].answer)
  },
  methods: {
    onBlur (event) {
      getQuestionAnswerData(this.survey.questions[this.index])
      validateQuestion(this.survey.questions[this.index])
      surveyAnswerLocalStorage.saveSurveyAnswer2LocalStorage(this.survey)
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
