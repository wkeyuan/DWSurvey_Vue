<template>
  <div class="dw-qu-item" @click.stop="clickItem" >
    <div class="dw-qu-item-toolbar" >
      <div class="dw-display-grid"></div>
    </div>
    <div class="dw-qu-item-body">
      <template v-if="quType==='RADIO'" >
        <!--        :style="survey.questions[quIndex].quRadios[optionIndex].checked ? `border-color:${themeColor}`: ''"-->
        <div class="dw-qu-item-el-checkbox-radio">
          <!--
            <i v-if="survey.questions[quIndex].quRadios[optionIndex].checked" :style="`color: ${themeColor}`" class="dw-qu-item-el-checkbox-radio-icon far fa-dot-circle dw-checked"></i>
            <i v-else class="dw-qu-item-el-checkbox-radio-icon far fa-circle "></i>
            -->
          <i v-if="survey.questions[quIndex].quRadios[optionIndex].checked" :style="`color: ${themeColor}`" class="dw-qu-item-el-checkbox-radio-icon dw-radio-icon fa-solid fa-circle-check dw-checked"></i>
          <i v-else class="dw-qu-item-el-checkbox-radio-icon dw-radio-icon fa-solid fa-circle-check "></i>
          <div class="dw-qu-item-option-title"><dw-html-label-common ref="dwEditLabel" :value="options[optionIndex].optionTitleObj" ></dw-html-label-common></div>
          <span v-show="survey.dwDebug">{{ survey.questions[quIndex].quRadios[optionIndex].checked }}</span>
        </div>
      </template>
      <template v-else-if="quType==='CHECKBOX'" >
        <!--        :style="survey.questions[quIndex].quCheckboxs[optionIndex].checked ? `border-color:${themeColor}`: ''"-->
        <div class="dw-qu-item-el-checkbox-radio">
          <!--
            <i v-if="survey.questions[quIndex].quCheckboxs[optionIndex].checked" :style="`color: ${themeColor}`" class="dw-qu-item-el-checkbox-radio-icon far fa-check-square dw-checked"></i>
            <i v-else class="dw-qu-item-el-checkbox-radio-icon far fa-square"></i>
            -->
          <i v-if="survey.questions[quIndex].quCheckboxs[optionIndex].checked" :style="`color: ${themeColor}`" class="dw-qu-item-el-checkbox-radio-icon dw-checkbox-icon fa-solid fa-square-check dw-checked" style="font-size: 22px;" ></i>
          <i v-else class="dw-qu-item-el-checkbox-radio-icon dw-checkbox-icon fa-solid fa-square-check" style="font-size: 22px;" ></i>
          <div class="dw-qu-item-option-title"><dw-html-label-common ref="dwEditLabel" :value="options[optionIndex].optionTitleObj" ></dw-html-label-common></div>
          <span v-show="survey.dwDebug">{{ survey.questions[quIndex].quCheckboxs[optionIndex].checked }}</span>
        </div>
      </template>
      <template v-else>
        <dw-html-label-common ref="dwEditLabel" :value="options[optionIndex].optionTitleObj" ></dw-html-label-common>
      </template>
    </div>
  </div>
</template>

<script>
import DwHtmlLabelCommon from '../../../dw-answer-survey-common/DwHtmlLabelCommon.vue'
import {getQuestionAnswerData} from "../../../../dw-utils/dw-survey-answer";
import {validateQuestion} from "../../../../dw-utils/dw-survey-answer-validate";
export default {
  name: 'DwQuOptionCommon1Item',
  components: {DwHtmlLabelCommon},
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
      getQuestionAnswerData(this.survey.questions[this.quIndex])
      validateQuestion(this.survey.questions[this.quIndex])
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
</style>
