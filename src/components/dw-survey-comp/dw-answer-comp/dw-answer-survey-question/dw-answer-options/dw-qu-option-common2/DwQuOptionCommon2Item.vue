<template>
  <div class="dw-qu-item" @click.stop="clickItem" >
    <div class="dw-qu-item-body">
      <template v-if="quType==='RADIO'" >
        <!--        :style="survey.questions[quIndex].quRadios[optionIndex].checked ? `border-color:${themeColor}`: ''"-->
        <div :class="survey.questions[quIndex].quRadios[optionIndex].checked ? `dw-item-checked`: ''" class="dw-qu-item-el-checkbox-radio">
          <i v-if="survey.questions[quIndex].quRadios[optionIndex].checked" class="dw-qu-item-el-checkbox-radio-icon dw-radio-icon fa-regular fa-circle-dot dw-checked"></i>
          <i v-else class="dw-qu-item-el-checkbox-radio-icon dw-radio-icon fa-regular fa-circle"></i>
          <!--
          <i v-if="survey.questions[quIndex].quRadios[optionIndex].checked" :style="`color: ${themeColor}`" class="dw-qu-item-el-checkbox-radio-icon dw-radio-icon fa-solid fa-circle-check dw-checked" ></i>
          <i v-else class="dw-qu-item-el-checkbox-radio-icon dw-radio-icon fa-solid fa-circle-check" ></i>-->
          <div class="dw-qu-item-option-title"><dw-html-label-common ref="dwEditLabel" :value="options[optionIndex].optionTitleObj" ></dw-html-label-common></div>
          <span v-show="survey.dwDebug">{{ survey.questions[quIndex].quRadios[optionIndex].checked }} </span>
        </div>
      </template>
      <template v-else-if="quType==='CHECKBOX'" >
        <!--        :style="survey.questions[quIndex].quCheckboxs[optionIndex].checked ? `border-color:${themeColor}`: ''"-->
        <div :class="survey.questions[quIndex].quCheckboxs[optionIndex].checked ? `dw-item-checked`: ''" class="dw-qu-item-el-checkbox-radio">
          <!--
            <i v-if="survey.questions[quIndex].quCheckboxs[optionIndex].checked" :style="`color: ${themeColor}`" class="dw-qu-item-el-checkbox-radio-icon far fa-check-square dw-checked"></i>
            <i v-else class="dw-qu-item-el-checkbox-radio-icon far fa-square"></i>
            -->
          <i v-if="survey.questions[quIndex].quCheckboxs[optionIndex].checked" class="dw-qu-item-el-checkbox-radio-icon dw-checkbox-icon fa-regular fa-square-check dw-checked" ></i>
          <i v-else class="dw-qu-item-el-checkbox-radio-icon dw-checkbox-icon fa-regular fa-square" ></i>
          <div class="dw-qu-item-option-title"><dw-html-label-common ref="dwEditLabel" :value="options[optionIndex].optionTitleObj" ></dw-html-label-common></div>
          <span v-show="survey.dwDebug">{{ survey.questions[quIndex].quCheckboxs[optionIndex].checked }}</span>
        </div>
      </template>
      <template v-else>
        <div class="dw-qu-item-option-title"><dw-html-label-common ref="dwEditLabel" :value="options[optionIndex].optionTitleObj" ></dw-html-label-common></div>
        <template v-if="quType==='MULTIFILLBLANK'" >
          <el-input v-if="options[optionIndex].answerInputRow>1" v-model="survey.questions[quIndex].quMultiFillblanks[optionIndex].inputText" :placeholder="options[optionIndex].placeholder" :autosize="{ minRows: options[optionIndex].answerInputRow }" type="textarea" @blur="onBlur"></el-input>
          <el-input v-else v-model="survey.questions[quIndex].quMultiFillblanks[optionIndex].inputText" :placeholder="options[optionIndex].placeholder" @blur="onBlur"/>
        </template>
        <el-rate v-if="quType==='SCORE'" v-model="survey.questions[quIndex].quScores[optionIndex].answerScore" :max="survey.questions[quIndex].paramInt02" :colors="rateColors" @change="clickItem" ></el-rate>
      </template>
    </div>
    <div class="dw-qu-item-toolbar dw-display-flex-right" ></div>
  </div>
</template>

<script>
import DwHtmlLabelCommon from '../../../dw-answer-survey-common/DwHtmlLabelCommon.vue'
import {validateQuestion} from '../../../../dw-utils/dw-survey-answer-validate'
import {getQuestionAnswerData} from '../../../../dw-utils/dw-survey-answer'
export default {
  name: 'DwQuOptionCommon2Item',
  components: {DwHtmlLabelCommon},
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
      rateColors: [this.survey.surveyStyle.themeColor, this.survey.surveyStyle.themeColor, this.survey.surveyStyle.themeColor],
      minLimit: 0,
      maxLimit: 0
    }
  },
  watch: {
    options: function (newValue, oldValue) {
      // console.debug(newValue)
      // console.log('upEditorText changed from ' + oldValue + ' to ' + newValue)
      // console.debug('newValue', newValue)
      // console.debug('oldValue', oldValue)
      // console.debug('watch-options', this.options[this.optionIndex].optionTitleObj.dwHtml)
      // this.$refs.dwEditLabel.upEditorText(this.options[this.optionIndex].optionTitleObj.dwHtml)
    }
  },
  mounted () {
    // console.debug('itemIndex', this.optionIndex)
    const question = this.survey.questions[this.quIndex]
    if (question.quType==='CHECKBOX') {
      this.minLimit = question.minLimit
      this.maxLimit = question.maxLimit
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
      } else if (quType === 'SCORE') {
        this.survey.questions[this.quIndex].quScores[this.optionIndex].checked = true
      }
      // 题目检查
      this.onBlur()
    },
    resetOtherRadio () {
      const quRadios = this.survey.questions[this.quIndex].quRadios
      quRadios.forEach((item, index) => { if (index !== this.optionIndex) item.checked = false })
    },
    onBlur () {
      // 同步答案
      getQuestionAnswerData(this.survey.questions[this.quIndex])
      // 进行验证
      validateQuestion(this.survey.questions[this.quIndex])
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
  justify-content: flex-end;
  align-items: center;
}
.dw-event-color{
  color: #095aaa;
}
.dw-margin-right-10{
  margin-right: 10px;
}
.dw-qu-item{
  display: grid;
  grid-template-columns: auto;
}
.dw-qu-item-body{
  margin: 0px;
  font-size: 14px;
}

.dw-input-default{
  border: 1px solid transparent;
}
.dw-input-focus{
  border: 1px solid #095aaa;
  background: #e5f5f5;
}
/deep/ .el-rate__icon{
  font-size: 22px;
}
</style>
