<template>
  <div style="padding: 0;margin-bottom: 5px;" class="dw-qu-item">
    <!--    <div>{{ survey.questions[index].quAttr }}</div>-->
    <template v-if="inputAttr.commonAttr.checkType==='TIME'">
      <template v-if="inputAttr.dateTimeAttr.dateFormat===7" >
        <!-- dateFormat 为7 =HH:ss，使用下拉时间选择框，且可以设置步长              -->
        <div>
          <template v-if="inputAttr.dateTimeAttr.attrs.includes('range')" >
            <!-- 使用范围选择器           -->
            <div>
              <template v-if="inputAttr.dateTimeAttr.timeRange.step!=null && inputAttr.dateTimeAttr.timeRange.range!==null">
                <!-- STEP、range 都不为空              -->
                <div><el-time-select v-model="inputAnswer.startTime" :editable="false" :picker-options="{start:inputAttr.dateTimeAttr.timeRange.range[0], step: inputAttr.dateTimeAttr.timeRange.step, end:inputAttr.dateTimeAttr.timeRange.range[1], format: inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="起始时间" popper-class="dw-answer-custom-theme" @blur="onBlur" ></el-time-select></div>
                <div><el-time-select v-model="inputAnswer.endTime" :editable="false" :picker-options="{start:inputAttr.dateTimeAttr.timeRange.range[0], step: inputAttr.dateTimeAttr.timeRange.step, end:inputAttr.dateTimeAttr.timeRange.range[1], minTime: inputAnswer.startTime, format: inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="结束时间" popper-class="dw-answer-custom-theme" @blur="onBlur" ></el-time-select></div>
              </template>
              <template v-if="inputAttr.dateTimeAttr.timeRange.step===null && inputAttr.dateTimeAttr.timeRange.range!==null">
                <!-- step为空，range不为空，但注意STEP點认值 = 00:30              -->
                <div><el-time-select v-model="inputAnswer.startTime" :editable="false" :picker-options="{start:inputAttr.dateTimeAttr.timeRange.range[0], end:inputAttr.dateTimeAttr.timeRange.range[1], format: inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="起始时间" popper-class="dw-answer-custom-theme" @blur="onBlur" ></el-time-select></div>
                <div><el-time-select v-model="inputAnswer.endTime" :editable="false" :picker-options="{start:inputAttr.dateTimeAttr.timeRange.range[0], end:inputAttr.dateTimeAttr.timeRange.range[1], minTime: inputAnswer.startTime, format: inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="结束时间" popper-class="dw-answer-custom-theme" @blur="onBlur" ></el-time-select></div>
              </template>
              <template v-else-if="inputAttr.dateTimeAttr.timeRange.step!==null && inputAttr.dateTimeAttr.timeRange.range===null">
                <!-- step不为空，range为空             -->
                <div><el-time-select v-model="inputAnswer.startTime" :editable="false" :picker-options="{step: inputAttr.dateTimeAttr.timeRange.step, format: inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="起始时间" popper-class="dw-answer-custom-theme" @blur="onBlur" ></el-time-select></div>
                <div><el-time-select v-model="inputAnswer.endTime" :editable="false" :picker-options="{step: inputAttr.dateTimeAttr.timeRange.step, minTime: inputAnswer.startTime, format: inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="结束时间" popper-class="dw-answer-custom-theme" @blur="onBlur" ></el-time-select></div>
              </template>
            </div>
          </template>
          <template v-else >
            <!-- 不使用范围选择器           -->
            <div>
              <template v-if="inputAttr.dateTimeAttr.timeRange.step!=null && inputAttr.dateTimeAttr.timeRange.range!==null">
                <!-- STEP、range 都不为空              -->
                <div><el-time-select v-model="inputAnswer" :editable="false" :picker-options="{start:inputAttr.dateTimeAttr.timeRange.range[0], step: inputAttr.dateTimeAttr.timeRange.step, end:inputAttr.dateTimeAttr.timeRange.range[1], format: inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="请选择时间" popper-class="dw-answer-custom-theme" @blur="onBlur" ></el-time-select></div>
              </template>
              <template v-if="inputAttr.dateTimeAttr.timeRange.step===null && inputAttr.dateTimeAttr.timeRange.range!==null">
                <!-- step为空，range不为空，但注意STEP點认值 = 00:30              -->
                <div><el-time-select v-model="inputAnswer" :editable="false" :picker-options="{start:inputAttr.dateTimeAttr.timeRange.range[0], end:inputAttr.dateTimeAttr.timeRange.range[1], format: inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="请选择时间" popper-class="dw-answer-custom-theme" @blur="onBlur" ></el-time-select></div>
              </template>
              <template v-else-if="inputAttr.dateTimeAttr.timeRange.step!==null && inputAttr.dateTimeAttr.timeRange.range===null">
                <!-- step不为空，range为空             -->
                <div><el-time-select v-model="inputAnswer" :editable="false" :picker-options="{step: inputAttr.dateTimeAttr.timeRange.step, format: inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="请选择时间" popper-class="dw-answer-custom-theme" @blur="onBlur" ></el-time-select></div>
              </template>
              <template v-else>
                <div><el-time-select v-model="inputAnswer" :editable="false" :picker-options="{format: inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'}" :disabled="survey.readonly" placeholder="请选择时间" popper-class="dw-answer-custom-theme" @blur="onBlur" ></el-time-select></div>
              </template>
            </div>
          </template>
        </div>
      </template>
      <template v-else>
        <!--  dateFormat 为5 = 'HH:mm:ss'，6 = 'HH:mm'     -->
        <template v-if="inputAttr.dateTimeAttr.attrs.includes('range')" >
          <el-time-picker
            v-model="inputAnswer"
            :format="inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'"
            :editable="false"
            :disabled="survey.readonly"
            :class="isAnswer ? 'dw-input-active':''"
            is-range
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            class="dw-answer-custom-theme"
            @blur="onBlur"
            @input="onBlur"/>
        </template>
        <template v-else>
          <template v-if="inputAttr.dateTimeAttr.timeRange.range!==null" >
            <el-time-picker v-model="inputAnswer" :editable="false" :picker-options="{selectableRange: inputAttr.dateTimeAttr.timeRange.range!==null ? `${inputAttr.dateTimeAttr.timeRange.range[0]} - ${inputAttr.dateTimeAttr.timeRange.range[1]}`: null}" :format="inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'" :class="isAnswer ? 'dw-input-active':''" :placeholder="inputAttr.commonAttr.placeholder" :disabled="survey.readonly" popper-class="dw-answer-custom-theme" @blur="onBlur" @input="onBlur"/>
          </template>
          <template v-else>
            <el-time-picker v-model="inputAnswer" :editable="false" :format="inputAttr.dateTimeAttr.dateFormat===5 ? 'HH:mm:ss': 'HH:mm'" :class="isAnswer ? 'dw-input-active':''" :placeholder="inputAttr.commonAttr.placeholder" :disabled="survey.readonly" popper-class="dw-answer-custom-theme" @blur="onBlur" @input="onBlur"/>
          </template>
        </template>
      </template>
    </template>
    <template v-else-if="inputAttr.commonAttr.checkType==='DATE'">
      <template v-if="inputAttr.dateTimeAttr.attrs.includes('range')">
        <template v-if="inputAttr.dateTimeAttr.dateFormat===3">
          <el-date-picker v-model="inputAnswer" :disabled="survey.readonly" :editable="false" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" popper-class="dw-answer-custom-theme" @blur="onBlur" ></el-date-picker>
        </template>
        <template v-else-if="inputAttr.dateTimeAttr.dateFormat===2">
          <el-date-picker v-model="inputAnswer" :disabled="survey.readonly" :editable="false" type="monthrange" start-placeholder="开始月份" end-placeholder="结束月份" popper-class="dw-answer-custom-theme" @blur="onBlur" ></el-date-picker>
        </template>
        <template v-else-if="inputAttr.dateTimeAttr.dateFormat===1">
          <el-date-picker v-model="inputAnswer" :disabled="survey.readonly" :editable="false" type="date" placeholder="选择日期" popper-class="dw-answer-custom-theme" @blur="onBlur" ></el-date-picker>
        </template>
      </template>
      <template v-else>
        <template v-if="inputAttr.dateTimeAttr.dateFormat===3">
          <el-date-picker v-model="inputAnswer" :editable="false" :type="inputAttr.dateTimeAttr.attrs.includes('more') ? 'dates':'date'" :disabled="survey.readonly" placeholder="选择日期" popper-class="dw-answer-custom-theme" @blur="onBlur" ></el-date-picker>
        </template>
        <template v-else-if="inputAttr.dateTimeAttr.dateFormat===2">
          <el-date-picker v-model="inputAnswer" :editable="false" :type="inputAttr.dateTimeAttr.attrs.includes('more') ? 'months':'month'" :disabled="survey.readonly" placeholder="选择月" popper-class="dw-answer-custom-theme" @blur="onBlur" ></el-date-picker>
        </template>
        <template v-else-if="inputAttr.dateTimeAttr.dateFormat===1">
          <el-date-picker v-model="inputAnswer" :editable="false" :type="inputAttr.dateTimeAttr.attrs.includes('more') ? 'years':'year'" :disabled="survey.readonly" placeholder="选择年" popper-popper-class="dw-answer-custom-theme" @blur="onBlur" ></el-date-picker>
        </template>
      </template>
    </template>
    <template v-else-if="inputAttr.commonAttr.checkType==='DATETIME'">
      <!--    DATE DATETIME-->
      <template v-if="inputAttr.dateTimeAttr.attrs.includes('range')">
        <el-date-picker v-model="inputAnswer" :editable="false" :disabled="survey.readonly" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" popper-class="dw-answer-custom-theme" @blur="onBlur" ></el-date-picker>
      </template>
      <template v-else>
        <el-date-picker v-model="inputAnswer" :editable="false" :disabled="survey.readonly" type="datetime" placeholder="选择日期" popper-class="dw-answer-custom-theme" @blur="onBlur" ></el-date-picker>
      </template>
    </template>
    <template v-else-if="inputAttr.commonAttr.checkType==='NUM'">
      <!--    NUM-->
      <el-input v-model="inputAnswer" :disabled="survey.readonly" :controls="false" :placeholder="inputAttr.commonAttr.placeholder" controls-position="none" @blur="onBlur" @input="onBlur" ></el-input>
<!--      <div v-show="inputAttr.numAttr.min>0 || inputAttr.numAttr.max>0" class="dw-answer-input-note">最小值： {{ inputAttr.numAttr.min }}，最大值： {{ inputAttr.numAttr.max }}</div>-->
    </template>
    <template v-else-if="inputAttr.commonAttr.checkType==='DIGITS'">
      <!--    DIGITS  -->
      <el-input v-model="inputAnswer" :disabled="survey.readonly" :controls="false" :placeholder="inputAttr.commonAttr.placeholder" controls-position="none" @blur="onBlur" @input="onBlur" ></el-input>
<!--      <div v-show="inputAttr.numAttr.min>0 || inputAttr.numAttr.max>0" class="dw-answer-input-note">最小值： {{ inputAttr.numAttr.min }}，最大值： {{ inputAttr.numAttr.max }}</div>-->
    </template>
    <template v-else>
      <template v-if="inputAttr.commonAttr.inputRow>1">
        <el-input v-model="inputAnswer" :minlength="inputAttr.commonAttr.minlength" :maxlength="inputAttr.commonAttr.maxlength" :class="isAnswer ? 'dw-input-active':''" :placeholder="inputAttr.commonAttr.placeholder" :autosize="{ minRows: inputAttr.commonAttr.inputRow }" type="textarea" @blur="onBlur" @input="onBlur"></el-input>
      </template>
      <template v-else>
        <el-input v-model="inputAnswer" :minlength="inputAttr.commonAttr.minlength" :maxlength="inputAttr.commonAttr.maxlength" :class="isAnswer ? 'dw-input-active':''" :placeholder="inputAttr.commonAttr.placeholder" :disabled="survey.readonly" show-word-limit @blur="onBlur" @input="onBlur"/>
      </template>
    </template>
  </div>
</template>

<script>

import {answerQuEventCommon, answerQuEventCommonExt} from '../../../dw-utils/dw-survey-answer-common'

export default {
  name: 'DwAnswerInput1',
  components: {},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}},
    inputAttr: {type: Object, default: () => {}},
    optionIndex: {type: Number, default: 0}
  },
  data () {
    return {
      inputAnswer: undefined
    }
  },
  computed: {
    isAnswer () {
      /*if (this.survey.questions[this.index].hasOwnProperty('answer')) {
        const answer = this.survey.questions[this.index].answer
        return answer !== null && answer !== undefined && answer !== ''
      }*/
      return false
    }
  },
  mounted () {
    // console.debug('this.survey.questions[this.index].answerA', this.survey.questions[this.index].answer)
    const quType = this.survey.questions[this.index].quType
    if (quType === 'FILLBLANK') {
      try {
        if (this.survey.questions[this.index].hasOwnProperty('answer') && this.survey.questions[this.index].answer!==undefined) {
          this.inputAnswer = JSON.parse(this.survey.questions[this.index].answer)
        }
      } catch (e) {
        console.debug('e', e)
        if (this.survey.questions[this.index].hasOwnProperty('answer') && this.survey.questions[this.index].answer!==undefined) {
          this.inputAnswer = this.survey.questions[this.index].answer
        }
      }
    } else if (quType === 'MULTIFILLBLANK') {
      try {
        if (this.survey.questions[this.index].quMultiFillblanks[this.optionIndex].hasOwnProperty('inputText') && this.survey.questions[this.index].quMultiFillblanks[this.optionIndex].inputText!==undefined) {
          this.inputAnswer = JSON.parse(this.survey.questions[this.index].quMultiFillblanks[this.optionIndex].inputText)
        }
      } catch (e) {
        console.debug('e', e)
        if (this.survey.questions[this.index].quMultiFillblanks[this.optionIndex].hasOwnProperty('inputText') && this.survey.questions[this.index].quMultiFillblanks[this.optionIndex].inputText!==undefined) {
          this.inputAnswer = this.survey.questions[this.index].quMultiFillblanks[this.optionIndex].inputText
        }
      }
    } else if (quType === 'RADIO') {
      try {
        if (this.survey.questions[this.index].quRadios[this.optionIndex].hasOwnProperty('otherText') && this.survey.questions[this.index].quRadios[this.optionIndex].otherText!==undefined) {
          this.inputAnswer = JSON.parse(this.survey.questions[this.index].quRadios[this.optionIndex].otherText)
        }
      } catch (e) {
        console.debug('e', e)
        if (this.survey.questions[this.index].quRadios[this.optionIndex].hasOwnProperty('otherText') && this.survey.questions[this.index].quRadios[this.optionIndex].otherText!==undefined) {
          this.inputAnswer = this.survey.questions[this.index].quRadios[this.optionIndex].otherText
        }
      }
    } else if (quType === 'CHECKBOX') {
      try {
        if (this.survey.questions[this.index].quCheckboxs[this.optionIndex].hasOwnProperty('otherText') && this.survey.questions[this.index].quCheckboxs[this.optionIndex].otherText!==undefined) {
          this.inputAnswer = JSON.parse(this.survey.questions[this.index].quCheckboxs[this.optionIndex].otherText)
        }
      } catch (e) {
        console.debug('e', e)
        if (this.survey.questions[this.index].quCheckboxs[this.optionIndex].hasOwnProperty('otherText') && this.survey.questions[this.index].quCheckboxs[this.optionIndex].otherText!==undefined) {
          this.inputAnswer = this.survey.questions[this.index].quCheckboxs[this.optionIndex].otherText
        }
      }
    }
    // console.debug('this.survey.questions[this.index].answer', this.survey.questions[this.index].answer)
  },
  methods: {
    parseNumber (s) {
      // 解析用户输入的值为数字
      return s.replace(/[^\d]/g, '')
    },
    formatNumber (v) {
      // 格式化显示的值，确保不使用科学记数法
      return v.toString().replace(/(\d+)(\d{3})/, '$1$2')
    },
    onBlur (event) {
      const quType = this.survey.questions[this.index].quType
      if (quType === 'FILLBLANK') {
        this.survey.questions[this.index].answer = this.inputAnswer
      } else if (quType === 'MULTIFILLBLANK') {
        this.survey.questions[this.index].quMultiFillblanks[this.optionIndex].inputText = this.inputAnswer
      } else if (quType === 'RADIO') {
        this.survey.questions[this.index].quRadios[this.optionIndex].otherText = this.inputAnswer
      } else if (quType === 'CHECKBOX') {
        this.survey.questions[this.index].quCheckboxs[this.optionIndex].otherText = this.inputAnswer
      }
      answerQuEventCommonExt(this.survey, this.index, true)
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
.dw-answer-custom-theme input::-webkit-outer-spin-button,
.dw-answer-custom-theme input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.dw-answer-custom-theme input[type='number'] {
  -moz-appearance: textfield;
}
.dw-answer-custom-theme /deep/.el-input input::-webkit-outer-spin-button,
.dw-answer-custom-theme /deep/.el-input input::-webkit-inner-spin-button {
  -webkit-appearance: none!important;
}

.dw-answer-custom-theme .el-input-number__decrease,.dw-answer-custom-theme  .el-input-number__increase{
  display: none;
}
.dw-answer-custom-theme .el-input-number{
  width: 100%;
}
.dw-answer-custom-theme .el-input-number .el-input__inner{
  padding-left: 10px;
  padding-right: 10px;
  text-align: left;
}
.dw-answer-input-note{
  font-size: 10px;
  color: grey;
  padding: 5px 0;
}
</style>
