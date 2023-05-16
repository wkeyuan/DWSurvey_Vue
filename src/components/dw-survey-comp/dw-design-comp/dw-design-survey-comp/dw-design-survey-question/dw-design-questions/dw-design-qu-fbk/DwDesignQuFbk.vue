<template>
  <div style="padding: 10px 0;" class="dw-qu-item">
    <el-input v-if="survey.questions[index].answerInputRow>1" v-model="inputText" :placeholder="survey.questions[index].placeholder" :autosize="{ minRows: survey.questions[index].answerInputRow }" type="textarea" ></el-input>
    <el-input v-else v-model="inputText" :placeholder="survey.questions[index].placeholder" />
  </div>
</template>

<script>
import DwDesignQuestionCommon from '../../DwDesignQuestionCommon'

export default {
  name: 'DwDesignQuFbk',
  components: {DwDesignQuestionCommon},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}}
  },
  data () {
    return {
      inputText: ''
    }
  }
}
</script>

<style scoped>
.dw-qu-item{
  display: grid;
  grid-template-columns: auto 90px;
}
</style>
