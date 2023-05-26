<template>
  <div class="dwEditorRoot dw-width-100bf" >
    <div>
      <div ref="curEdit" class="dwEditRoot dw-input-default dw-qu-option-text dw-border-blue editor-content-view" v-html="value.dwHtml" ></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DwHtmlLabelCommon',
  components: {},
  props: {
    value: {type: Object, default: () => {}},
    itemClick: {type: Boolean, default: false},
    btnSize: {type: String, default: '15px'}
  },
  data () {
    return {
      hover: false,
      editorText: this.value.dwHtml,
      centerDialogVisible: false
    }
  },
  methods: {
  }
}
</script>

<style scoped >
.dwEditor{
  width: 100%;
  font-size: 14px;
  line-height: 28px;
  outline-style: none;
}
.dw-input-default{
  border: 1px solid transparent;
}
.dw-qu-option-text{
  padding: 6px 0;
  word-break: break-word;
  outline: none;
}
.dw-input-default:empty::before {
  content: attr(placeholder);
  color: lightgrey;
}
.dw-input-focus{
  border: 1px solid #095aaa;
  background: #f6f8f8;
  /*background: white;*/
  outline-width: 1px;
}
.dw-input-hover{
  background: #f6f8f8;
  /*background: white;*/
}
.dw-edit-toolbar{
  width: 40px;
}
/deep/ .edit-dialog-root.el-dialog .el-dialog__header {
  /*display: none;*/
  padding: 10px;
}
/deep/ .edit-dialog-root.el-dialog .el-dialog__body{
  padding: 0px;
}
/deep/ .edit-dialog-root.el-dialog .el-dialog__headerbtn{
  top: 13px;
}
/deep/ p{
  margin: 0;
  padding: 0;
}
</style>
