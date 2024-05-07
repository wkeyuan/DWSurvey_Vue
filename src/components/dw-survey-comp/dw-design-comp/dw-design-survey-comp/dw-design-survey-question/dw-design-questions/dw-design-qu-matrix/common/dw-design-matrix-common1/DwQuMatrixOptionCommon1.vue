<template>
  <div style="padding: 10px 0;">
    <div class="dw-display-flex" style="align-items: flex-start;">
      <div style="flex-grow: 1;">
        <table style="width: 100%;text-align: center;border-spacing: 0;">
          <dw-col-option-common1 v-model="survey.questions[index].quCols" :survey="survey" :index="index" :qu-type="survey.questions[index].quType"></dw-col-option-common1>
          <dw-row-option-common1 v-model="survey.questions[index].quRows" :survey="survey" :index="index" :qu-type="survey.questions[index].quType"></dw-row-option-common1>
        </table>
      </div>
      <div class="dw-text-align-center" style="width: 50px;">
        <el-tooltip :open-delay="openDelay" class="item" effect="dark" content="复制本题" placement="top">
          <div class="dw-question-toolbar dw-margin-bottom-10" ><i class="dwMoveSortQu dw-cursor-pointer dw-event-icon dw-event-color dw-event-color fa fa-plus" aria-hidden="true"></i></div>
        </el-tooltip>
        <el-tooltip :open-delay="openDelay" class="item" effect="dark" content="向上移" placement="top">
          <div class="dw-question-toolbar dw-margin-bottom-10"><i class="dw-cursor-pointer dw-event-color fa fa-list-ul" aria-hidden="true"></i></div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>

import DwColOptionCommon1 from './components/DwColOptionCommon1.vue'
import DwRowOptionCommon1 from './components/DwRowOptionCommon1.vue'

export default {
  name: 'DwQuMatrixOptionCommon1',
  components: {DwRowOptionCommon1, DwColOptionCommon1},
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
    arraySpanMethod ({row, column, rowIndex, columnIndex}) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    }
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
