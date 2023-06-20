<template>
  <div style="padding: 10px 0;" class="dw-qu-item">
    <el-input v-if="survey.questions[index].answerInputRow>1" v-model="survey.questions[index].anFillblank.answer" :placeholder="survey.questions[index].placeholder" :autosize="{ minRows: survey.questions[index].answerInputRow }" type="textarea" @blur="onBlur"></el-input>
    <el-input v-else v-model="survey.questions[index].anFillblank.answer" :placeholder="survey.questions[index].placeholder" @blur="onBlur"/>
  </div>
</template>

<script>

import {validateQuestion} from "../../../../dw-utils/dw-survey-answer-validate";
import {getQuestionAnswerData} from "../../../../dw-utils/dw-survey-answer";

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
  methods: {
    onBlur (event) {
      getQuestionAnswerData(this.survey.questions[this.index])
      validateQuestion(this.survey.questions[this.index])
    }
  }
}
</script>

<style scoped>
.dw-qu-item{
  display: grid;
  grid-template-columns: auto;
}
</style>
