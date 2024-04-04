<template>
  <div>
    <div style="margin-bottom: 5px;">
      <el-select v-model="value" :disabled="survey.readonly" :multiple="quType==='CHECKBOX'" :multiple-limit="maxLimit" popper-class="dw-answer-custom-theme" placeholder="请选择" style="width: 100%" @change="onChange" >
        <el-option
          v-for="(item, index) in options"
          :key="`fa_${index}`"
          :label="item.optionTitleObj.dwHtml"
          :value="item.optionTitleObj.dwHtml">
        </el-option>
      </el-select>
      <div v-for="(item,optionIndex) in options" :key="`quOption4-${index}-${optionIndex}`" >
        <div v-if="(options[optionIndex].checked && (quType==='RADIO' || quType==='CHECKBOX') && options[optionIndex].showOptionNote)" style="padding: 10px 0;" >
          <el-input v-if="options[optionIndex].inputAttr.commonAttr.inputRow>1" v-model="options[optionIndex].otherText" :placeholder="options[optionIndex].inputAttr.commonAttr.placeholder" :autosize="{ minRows: options[optionIndex].inputAttr.commonAttr.inputRow }" type="textarea" ></el-input>
          <el-input v-else v-model="options[optionIndex].otherText" :placeholder="options[optionIndex].inputAttr.commonAttr.placeholder" ></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import {answerQuEventCommon} from '../../../dw-utils/dw-survey-answer-common'

export default {
  name: 'DwQuOptionCommon4',
  components: {draggable},
  model: {
    prop: 'options',
    event: 'update-options'
  },
  props: {
    index: {type: Number, default: 0},
    options: {type: Array, default: () => []},
    survey: {type: Object, default: () => {}},
    quType: {type: String, default: ''}
  },
  data () {
    return {
      value: null,
      minLimit: 0,
      maxLimit: 0,
      inputText: ''
    }
  },
  mounted () {
    const question = this.survey.questions[this.index]
    if (question.quType==='RADIO') {
      const quOptions = this.survey.questions[this.index].quRadios
      quOptions.forEach((quOption) => {
        if (quOption.checked) this.value = quOption.optionTitleObj.dwHtml
      })
    }
    if (question.quType==='CHECKBOX') {
      this.minLimit = question.minLimit
      this.maxLimit = question.maxLimit
      const quOptions = this.survey.questions[this.index].quCheckboxs
      quOptions.forEach((quOption) => {
        if (quOption.checked) this.value.push(quOption.optionTitleObj.dwHtml)
      })
    }
  },
  methods: {
    onChange (values) {
      console.debug('onChange', values)
      console.debug('onChange Value', this.value)
      this.resetOptionChecked()
      const quType = this.survey.questions[this.index].quType
      if (quType==='RADIO') {
        const quOptions = this.survey.questions[this.index].quRadios
        this.checkQuOptions(quOptions, [values])
      } else if (quType==='CHECKBOX') {
        const quOptions = this.survey.questions[this.index].quCheckboxs
        this.checkQuOptions(quOptions, values)
      }
      // getQuestionAnswerData(this.survey.questions[this.index])
      // validateQuestion(this.survey.questions[this.index])
      // surveyAnswerLocalStorage.saveSurveyAnswer2LocalStorage(this.survey)
      answerQuEventCommon(this.survey, this.index)
    },
    checkQuOptions (quOptions, changeValue) {
      quOptions.forEach((quOption) => {
        changeValue.forEach((valueItem) => {
          if (quOption.optionTitleObj.dwHtml === valueItem) {
            quOption.checked = true
            return false
          }
        })
      })
    },
    resetOptionChecked () {
      const quType = this.survey.questions[this.index].quType
      if (quType==='RADIO') {
        const quRadios = this.survey.questions[this.index].quRadios
        quRadios.forEach((item) => { item.checked = false })
      } else if (quType==='CHECKBOX') {
        const quCheckboxs = this.survey.questions[this.index].quCheckboxs
        quCheckboxs.forEach((item) => { item.checked = false })
      }
    }
  }
}
</script>

<style scoped>
@import '../../../../../../assets/css/dw-answer.css';

</style>
