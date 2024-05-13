<template>
  <div>
    <dw-qu-matrix-option-common2 v-model="survey.questions[index].quRows" :survey="survey" :index="index" :qu-type="survey.questions[index].quType"></dw-qu-matrix-option-common2>
  </div>
</template>

<script>

import DwQuMatrixOptionCommon2 from '../../common/dw-design-matrix-common2/DwQuMatrixOptionCommon2.vue'

export default {
  name: 'DwQuMatrixSliderOptions',
  components: {DwQuMatrixOptionCommon2},
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
      openDelay: 300
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.dw-qu-item-el-checkbox-radio-icon{
  /*background: red;*/
  font-size: 18px;
  width: 28px;
  color: #b2b2b2;
}
table,tbody,tr,th,td{
  border-spacing: 0;
  border: none;
}
td{
  padding: 5px;
}
tbody tr:last-child td{
  padding-bottom: 20px;
}
</style>
