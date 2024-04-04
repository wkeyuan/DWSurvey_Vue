<template>
  <div class="dw-qu-item" @click.stop="clickItem" >
    <div class="dw-qu-item-toolbar" >
      <div class="dw-display-grid"></div>
    </div>
    <div class="dw-qu-item-body">
      <template v-if="quType==='RADIO'" >
        <div :class="survey.questions[quIndex].quRadios[optionIndex].checked ? `dw-item-checked`: ''" class="dw-qu-item-el-checkbox-radio">
          <i v-if="survey.questions[quIndex].quRadios[optionIndex].checked" class="dw-qu-item-el-checkbox-radio-icon dw-radio-icon fa-solid fa-circle-dot animate__animated animate__tada dw-checked"></i>
          <!--          fa-dot-circle-->
          <i v-else class="dw-qu-item-el-checkbox-radio-icon dw-radio-icon fa-regular fa-circle "></i>
          <!--
          <i v-if="survey.questions[quIndex].quRadios[optionIndex].checked" :style="`color: ${themeColor}`" class="dw-qu-item-el-checkbox-radio-icon dw-radio-icon fa-solid fa-circle-check dw-checked"></i>
          <i v-else class="dw-qu-item-el-checkbox-radio-icon dw-radio-icon fa-solid fa-circle-check "></i>-->
          <div class="dw-qu-item-option-title"><dw-html-label-common ref="dwEditLabel" :value="options[optionIndex].optionTitleObj" ></dw-html-label-common></div>
          <span v-show="survey.dwDebug">{{ survey.questions[quIndex].quRadios[optionIndex].checked }}</span>
        </div>
      </template>
      <template v-else-if="quType==='CHECKBOX'" >
        <!--        :style="survey.questions[quIndex].quCheckboxs[optionIndex].checked ? `border-color:${themeColor}`: ''"-->
        <div :class="survey.questions[quIndex].quCheckboxs[optionIndex].checked ? `dw-item-checked`: ''" class="dw-qu-item-el-checkbox-radio">
          <!--
            <i v-if="survey.questions[quIndex].quCheckboxs[optionIndex].checked" :style="`color: ${themeColor}`" class="dw-qu-item-el-checkbox-radio-icon far fa-check-square dw-checked"></i>
            <i v-else class="dw-qu-item-el-checkbox-radio-icon far fa-square"></i>
            -->
          <i v-if="survey.questions[quIndex].quCheckboxs[optionIndex].checked" class="dw-qu-item-el-checkbox-radio-icon dw-checkbox-icon fa-solid fa-square-check animate__animated animate__tada dw-checked" style="font-size: 22px;" ></i>
          <i v-else class="dw-qu-item-el-checkbox-radio-icon dw-checkbox-icon fa-regular fa-square" style="font-size: 22px;" ></i>
          <div class="dw-qu-item-option-title"><dw-html-label-common ref="dwEditLabel" :value="options[optionIndex].optionTitleObj" ></dw-html-label-common></div>
          <span v-show="survey.dwDebug">{{ survey.questions[quIndex].quCheckboxs[optionIndex].checked }}</span>
        </div>
      </template>
      <template v-else>
        <dw-html-label-common ref="dwEditLabel" :value="options[optionIndex].optionTitleObj" ></dw-html-label-common>
      </template>
      <template>
        <transition enter-active-class="animate__animated animate__flipInX" leave-active-class="animate__animated animate__flipOutX">
          <div v-show="options[optionIndex].hasOwnProperty('validateObj') && !options[optionIndex].validateObj.isOk" class="dw-answer-question-error dw-answer-question-option-error">
            <i class="fa-solid fa-circle-exclamation"></i>
            {{ options[optionIndex].validateObj.errorText }}
          </div>
        </transition>
      </template>
    </div>
    <template v-if="(options[optionIndex].checked && (quType==='RADIO' || quType==='CHECKBOX') && options[optionIndex].showOptionNote)" >
      <!--      <el-input v-if="options[optionIndex].inputAttr.commonAttr.inputRow>1" v-model="options[optionIndex].otherText" :placeholder="options[optionIndex].inputAttr.commonAttr.placeholder" :autosize="{ minRows: options[optionIndex].inputAttr.commonAttr.inputRow }" type="textarea" ></el-input>
      <el-input v-else v-model="options[optionIndex].otherText" :placeholder="options[optionIndex].inputAttr.commonAttr.placeholder" />-->
      <dw-answer-input1 v-model="survey" :index="quIndex" :option-index="optionIndex" :input-attr="options[optionIndex].inputAttr"></dw-answer-input1>
    </template>
  </div>
</template>

<script>
import DwHtmlLabelCommon from '../../../dw-answer-survey-common/DwHtmlLabelCommon.vue'
import {getQuestionAnswerData} from '../../../../dw-utils/dw-survey-answer'
import {validateQuestion} from '../../../../dw-utils/dw-survey-answer-validate'
import {surveyAnswerLocalStorage} from '../../../dw-utils/dw-survey-answer-utils'
import {showReadNotify} from '../../../../dw-utils/dw-common/dw-msg-common'
import {answerQuEventCommon} from '../../../dw-utils/dw-survey-answer-common'
import DwAnswerInput1 from '../dw-qu-input-common1/DwAnswerInput1.vue'
export default {
  name: 'DwQuOptionCommon1Item',
  components: {DwAnswerInput1, DwHtmlLabelCommon},
  /*
  model: {
    prop: 'value',
    event: 'update-input'
  },*/
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    quIndex: {type: Number, default: 0},
    optionIndex: {type: Number, default: 0},
    options: {type: Array, default: () => []},
    option: {type: Object, default: () => {}},
    survey: {type: Object, default: () => {}},
    quType: {type: String, default: ''},
    value: {type: Object, default: () => {}},
    answer: {type: Object, default: () => {}}
  },
  data () {
    return {
      itemHover: false,
      itemClick: false,
      itemIndex: 0,
      inputText: '',
      themeColor: this.survey.surveyStyle.themeColor,
      rateColors: [this.survey.surveyStyle.themeColor, this.survey.surveyStyle.themeColor, this.survey.surveyStyle.themeColor]
    }
  },
  mounted () {
    // console.debug('itemIndex', this.optionIndex)
    if (this.options[this.optionIndex].itemClick) {
      this.upItemClick()
      this.editFocus()
      this.options[this.optionIndex].itemClick = false
    }
  },
  methods: {
    clickItem () {
      if (this.survey.readonly) return showReadNotify(this)
      // 如果是多选题
      const quType = this.quType
      console.debug('quType', quType)
      if (quType === 'RADIO') {
        this.survey.questions[this.quIndex].quRadios[this.optionIndex].checked = true
        this.resetOtherRadio()
      } else if (quType === 'CHECKBOX') {
        this.survey.questions[this.quIndex].quCheckboxs[this.optionIndex].checked = !this.survey.questions[this.quIndex].quCheckboxs[this.optionIndex].checked
      }
      // 题目检查
      // getQuestionAnswerData(this.survey.questions[this.quIndex])
      // validateQuestion(this.survey.questions[this.quIndex])
      // surveyAnswerLocalStorage.saveSurveyAnswer2LocalStorage(this.survey)
      answerQuEventCommon(this.survey, this.quIndex)
    },
    resetOtherRadio () {
      const quRadios = this.survey.questions[this.quIndex].quRadios
      quRadios.forEach((item, index) => { if (index !== this.optionIndex) item.checked = false })
    }
  }
}
</script>

<style scoped>
@import '../../../../../../assets/css/dw-answer.css';

.dw-padding-top-10{
  padding-top: 10px;
}
.dw-margin-bottom-10{
  margin-bottom: 10px;
}
.dw-margin-left-right-10{
  margin-right: 10px;
  margin-left: 10px;
}
.dw-margin-right-10{
  margin-right: 10px;
}
.dw-margin-left-10{
  margin-left: 10px;
}
.dw-display-flex{
  display: flex;
  align-items: center;
}
.dw-display-flex-left{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.dw-display-flex-right{
  display: flex;
  /*justify-content: flex-end;*/
  /*align-items: center;*/
  /*align-content: center;*/
}
.dw-event-color{
  color: #095aaa;
}
.dw-margin-right-10{
  margin-right: 10px;
}
.dw-qu-item{
  /*display: grid;*/
  /*grid-template-columns: auto 90px;*/
  position: relative;
}
.dw-qu-item-body{
  margin: 0px;
}

.dw-input-default{
  border: 1px solid transparent;
}
.dw-input-focus{
  border: 1px solid #095aaa;
  background: #e5f5f5;
}
.dw-display-grid{
  display: grid;
  grid-template-columns: repeat(3,auto);
  grid-column-gap: 5px;
  align-items: center;
  align-content: center;
  justify-items: start;
  justify-content: start;
}
.dw-qu-item-toolbar{
  position: absolute;
  right: 40px;
  top: -20px;
  z-index: 10;
  /*border: 1px solid #095aaa;*/
}
.dw-qu-item-toolbar .dw-question-toolbar{
  padding: 2px 3px 0px 3px;
  /*background: red;*/
  line-height: normal;
}
.dw-answer-question-option-error{
  margin: 5px 0;
}
</style>
