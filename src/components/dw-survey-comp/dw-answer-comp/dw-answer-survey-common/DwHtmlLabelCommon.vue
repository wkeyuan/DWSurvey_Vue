<template>
  <div class="dwEditorRoot dw-width-100bf" >
    <div>
      <div ref="curEdit" class="dwEditRoot dw-input-default" v-html="`${isRequired!==undefined && isRequired ? requiredTag:''}${quNum!==undefined && quNum!==null ? quNum+'、':''}${value.dwHtml}`" ></div>
      <!--      :style="`background: ${themeColor};border-color: ${themeColor}`"-->
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
    btnSize: {type: String, default: '15px'},
    quNum: {type: Number, default: null},
    isRequired: {type: Boolean, default: false}
  },
  data () {
    return {
      hover: false,
      editorText: this.value.dwHtml,
      centerDialogVisible: false,
      requiredTag: '<span style="color: #f56c6c;font-weight: bold;">*&nbsp;</span>'
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
