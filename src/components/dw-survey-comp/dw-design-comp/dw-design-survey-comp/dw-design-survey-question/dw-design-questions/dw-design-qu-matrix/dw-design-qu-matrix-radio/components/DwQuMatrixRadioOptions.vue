<template>
  <div>
    <dw-qu-matrix-option-common1 v-model="survey" :index="index" ></dw-qu-matrix-option-common1>
  </div>
</template>

<script>
import DwQuMatrixOptionCommon1 from '../../common/dw-design-matrix-common1/DwQuMatrixOptionCommon1.vue'

export default {
  name: 'DwQuMatrixRadioOptions',
  components: {DwQuMatrixOptionCommon1},
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
table{
  border: 1px solid #d8d8d9;
}
</style>
