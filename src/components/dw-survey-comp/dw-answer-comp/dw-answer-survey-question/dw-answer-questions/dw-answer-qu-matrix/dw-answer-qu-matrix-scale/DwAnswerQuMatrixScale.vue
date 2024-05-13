<template>
  <dw-answer-qu-matrix-option-common2 v-model="survey" :index="index" :qu-type="survey.questions[index].quType"></dw-answer-qu-matrix-option-common2>
</template>

<script>
import DwAnswerQuMatrixOptionCommon1 from '../common/dw-answer-matrix-common1/DwAnswerQuMatrixOptionCommon1.vue'
import DwAnswerQuMatrixOptionCommon2 from '../common/dw-answer-matrix-common2/DwAnswerQuMatrixOptionCommon2.vue'

export default {
  name: 'DwAnswerQuMatrixScale',
  components: {DwAnswerQuMatrixOptionCommon2, DwAnswerQuMatrixOptionCommon1},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}},
    answer: {type: Object, default: () => {}}
  }
}
</script>

<style scoped>

</style>
