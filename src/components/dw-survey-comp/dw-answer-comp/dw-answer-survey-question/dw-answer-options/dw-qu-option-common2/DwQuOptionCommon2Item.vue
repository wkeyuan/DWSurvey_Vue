<template>
  <div class="dw-qu-item" @click.stop="clickItem" >
    <div class="dw-qu-item-body">

      <div class="dw-qu-item-el-checkbox-radio">
        <template v-if="quType==='RADIO'" >
          <i v-if="survey.questions[quIndex].quRadios[optionIndex].checked" :style="`color: ${themeColor}`" class="dw-qu-item-el-checkbox-radio-icon far fa-dot-circle dw-checked"></i>
          <i v-else class="dw-qu-item-el-checkbox-radio-icon far fa-circle "></i>
          <dw-html-label-common ref="dwEditLabel" :value="options[optionIndex].optionTitleObj" ></dw-html-label-common>
          {{ survey.questions[quIndex].quRadios[optionIndex].checked }}
        </template>
        <template v-if="quType==='CHECKBOX'" >
          <i v-if="survey.questions[quIndex].quCheckboxs[optionIndex].checked" :style="`color: ${themeColor}`" class="dw-qu-item-el-checkbox-radio-icon far fa-check-square dw-checked"></i>
          <i v-else class="dw-qu-item-el-checkbox-radio-icon far fa-square"></i>
          <dw-html-label-common ref="dwEditLabel" :value="options[optionIndex].optionTitleObj" ></dw-html-label-common>
          {{ survey.questions[quIndex].quCheckboxs[optionIndex].checked }}
        </template>
        <template v-else>
          <dw-html-label-common ref="dwEditLabel" :value="options[optionIndex].optionTitleObj" ></dw-html-label-common>
        </template>
      </div>
      <template v-if="quType==='MULTIFILLBLANK'" >
        <el-input v-if="options[optionIndex].answerInputRow>1" v-model="survey.questions[quIndex].quMultiFillblanks[optionIndex].inputText" :placeholder="options[optionIndex].placeholder" :autosize="{ minRows: options[optionIndex].answerInputRow }" type="textarea" ></el-input>
        <el-input v-else v-model="survey.questions[quIndex].quMultiFillblanks[optionIndex].inputText" :placeholder="options[optionIndex].placeholder" />
      </template>
      <el-rate v-if="quType==='SCORE'" v-model="survey.questions[quIndex].quScores[optionIndex].inputText" :max="survey.questions[quIndex].paramInt02" :colors="rateColors" ></el-rate>
    </div>
    <div class="dw-qu-item-toolbar dw-display-flex-right" ></div>
  </div>
</template>

<script>
import DwHtmlLabelCommon from '../../../dw-answer-survey-common/DwHtmlLabelCommon.vue'
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
      rateColors: [this.survey.surveyStyle.themeColor, this.survey.surveyStyle.themeColor, this.survey.surveyStyle.themeColor]
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
    },
    resetOtherRadio () {
      const quRadios = this.survey.questions[this.quIndex].quRadios
      quRadios.forEach((item, index) => { if (index !== this.optionIndex) item.checked = false })
    }
  }
}
</script>

<style scoped>
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
}
.dw-qu-item-el-checkbox-radio{
  /*display: inline-flex;*/
  display: flex;
  align-items: center;
  padding: 5px 0;
  font-size: 14px;
}
.dw-qu-item-el-checkbox-radio-icon{
  /*background: red;*/
  font-size: 18px;
  color: #ccc;
  margin-right: 5px;
}
.dw-qu-item-el-checkbox-radio-icon.dw-checked{
  /*color: #0557a8;*/
  color: #409eff;
}
.dw-qu-item-el-checkbox-radio .dw-qu-option-text{
  /*margin:auto;*/
  width: 100%;
  padding: 6px;
}

.dw-input-default{
  border: 1px solid transparent;
}
.dw-input-focus{
  border: 1px solid #095aaa;
  background: #e5f5f5;
}
</style>
