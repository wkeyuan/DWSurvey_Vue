<template>
  <div>
    <dw-qu-option-common1 v-model="survey.questions[index].quScores" :survey="survey" :index="index" :qu-type="survey.questions[index].quType"></dw-qu-option-common1>
  </div>
</template>

<script>

import DwQuOptionCommon1 from '../../../dw-design-options/dw-qu-option-common2/DwQuOptionCommon2.vue'

export default {
  name: 'DwQuScoreOptions',
  components: {DwQuOptionCommon1},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}}
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
