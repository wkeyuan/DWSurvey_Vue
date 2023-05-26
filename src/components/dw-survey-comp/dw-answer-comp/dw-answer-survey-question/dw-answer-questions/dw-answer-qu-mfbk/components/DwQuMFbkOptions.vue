<template>
  <div>
    <dw-qu-option-common2 v-model="survey" :options="survey.questions[index].quMultiFillblanks" :index="index" :qu-type="survey.questions[index].quType"></dw-qu-option-common2>
  </div>
</template>

<script>

import DwQuOptionCommon2 from '../../../dw-answer-options/dw-qu-option-common2/DwQuOptionCommon2.vue'

export default {
  name: 'DwQuMFbkOptions',
  components: {DwQuOptionCommon2},
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
    return {}
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
