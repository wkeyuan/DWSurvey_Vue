<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :append-to-body="true"
    title="提示"
    width="600px">
    <div>
      <div style="font-size: 14px;font-weight: 600;">需要更多题型吗？企业版支持多达&nbsp;<span style="color: #ce6105;">50多种题型</span>，赶快了解一下吧！</div>
      <div style="font-size: 13px;color: #9d9d9d;margin-top: 10px;">提示：设计数据已经自动保存</div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="gotoDw()">了解一下</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  name: 'DwUpEntDialog',
  components: {},
  data () {
    return {
      tabs: [],
      loading: true,
      dialogVisible: false
    }
  },
  mounted () {
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    gotoDw () {
      window.open('https://www.diaowen.net?s0=oss&v1=2501&e5=dsm0', '_blank')
    }
  }
}
</script>

<style scoped>
@import '../../../../../../../../assets/css/font-dwsurvey-1.4/iconfont.css';
@import '../../../../../../../../assets/css/design-survey.css';
/deep/ .el-dialog__body{
  padding-top: 10px!important;
  padding-bottom: 10px!important;
}
.toolbars-contents-body .tools_item{
  margin-bottom: 25px;
  border: none;
}
.toolbars-contents-body .tools_item:last-child{
  margin-bottom: 0;
}
</style>
