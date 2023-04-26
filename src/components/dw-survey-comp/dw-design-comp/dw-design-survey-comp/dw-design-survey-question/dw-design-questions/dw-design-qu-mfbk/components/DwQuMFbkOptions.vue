<template>
  <div>
    <dw-qu-option-common1 v-model="survey.questions[index].quMultiFillblanks" :survey="survey" :index="index" :qu-type="survey.questions[index].quType"></dw-qu-option-common1>
  </div>
</template>

<script>

import DwQuOptionCommon1 from '../../../dw-design-options/DwQuOptionCommon1.vue'

export default {
  name: 'DwQuMFbkOptions',
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
.dragClass{
  border: 1px solid dodgerblue;
  background: #f5f5f5;
}
.ghostClass{
  background: #d0cfcf;
  border: 1px dashed dodgerblue;
}
.dw-grid{
  display: grid;
  grid-template-columns: repeat(2, minmax(auto,1fr));
  grid-column-gap: 10px;
  grid-row-gap: 0px;
  align-items: center;
  align-content: center;
  justify-items: start;
  justify-content: start;
}
</style>
