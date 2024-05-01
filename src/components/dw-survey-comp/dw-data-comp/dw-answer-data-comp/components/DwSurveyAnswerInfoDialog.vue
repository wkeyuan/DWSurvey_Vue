<template>
  <div>
    <!--    :destroy-on-close="true"-->
    <el-dialog :visible.sync="dialogFormVisible" class="dialogRoot" append-to-body title="答卷数据" width="60%" @close="closeDialog">
      <div slot="default" style="padding: 0 20px;">
        <div v-if="row!==null" style="height: 600px;overflow: scroll;">
          <dw-survey-answer-review :dw-es-survey-answer="row" :pad-phone-an-body-span="padPhoneAnBodySpan"></dw-survey-answer-review>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import DwSurveyAnswerReview from '../DwSurveyAnswerReview.vue'

export default {
  name: 'DwSurveyAnswerInfoDialog',
  components: {DwSurveyAnswerReview},
  data () {
    return {
      padPhoneAnBodySpan: {
        xs: {span: 24, offset: 0},
        sm: {span: 24, offset: 0},
        md: {span: 24, offset: 0},
        lg: {span: 24, offset: 0},
        xl: {span: 24, offset: 0}
      },
      dialogFormVisible: false,
      row: null
    }
  },
  methods: {
    openDialog (row) {
      this.dialogFormVisible = true
      this.row = row
      console.debug('row', row)
    },
    closeDialog () {
      this.row=null
    }
  }
}
</script>

<style scoped>
.dialogRoot /deep/ .el-dialog__body{
  padding: 0px!important;
}
</style>
