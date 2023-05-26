<template>
  <dw-qu-radio-options v-model="survey" :index="index" ></dw-qu-radio-options>
</template>

<script>
import DwQuOptionCommon1 from '../../dw-answer-options/dw-qu-option-common2/DwQuOptionCommon2.vue'
import DwQuRadioOptions from './components/DwQuRadioOptions'
export default {
  name: 'DwAnswerQuRadio',
  components: {DwQuRadioOptions, DwQuOptionCommon1},
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
