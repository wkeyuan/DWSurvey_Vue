<template>
  <div class="dwEditorRoot" @mouseover="mouseover" @mouseleave="mouseleave" >
    <div class="dw-flex dw-items-start">
      <div class="dw-flex-item-auto">
        <div ref="curEdit" @click="focus=true" @blur="blur" :class="hover || focus ? 'dw-input-focus':'dwEditRoot'" class="dw-input-default dw-qu-option-text dw-border-blue" contenteditable="true" >ssss</div>
      </div>
      <div class="dw-edit-toolbar">
        <div v-show=" hover || focus " class="dw-input-default dw-qu-option-text dw-btn-blue-1 dw-cursor-pointer" style="margin-left: -1px!important;" @click="addToolbar" ><i class="fa fa-align-left"></i></div>
      </div>
    </div>
    <div>
      <el-dialog
        title="高级编辑器"
        :visible.sync="centerDialogVisible"
        width="70%"
        custom-class="edit-dialog-root"
        :append-to-body="true"
        :destroy-on-close="true"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false">
        <DwEditor></DwEditor>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogClose">取 消</el-button>
          <el-button type="primary" @click="editConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import DwEditor from './DwEditor'

export default {
  name: 'DwTextEditLabel',
  components: {DwEditor},
  props: {
    value: { type: String, default: '' },
    btnSize: { type: String, default: '15px' }
  },
  computed: {
    valueObj: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('update:value', value)
      }
    }
  },
  data () {
    return {
      isShow: false,
      hover: false,
      focus: false,
      editable: false,
      toolbar: [],
      toolbarStatus: false,
      centerDialogVisible: false
    }
  },
  methods: {
    upText () {
      this.valueObj = 'xxxxww'
    },
    showText () {
      this.isShow = true
    },
    editClick () {
      this.editable = true
    },
    blur (e) {
      this.valueObj = e.target.innerHTML
      this.hover = false
      this.focus = false
    },
    mouseleave () {
      this.hover = false
      this.toolbar = []
    },
    mouseover () {
      this.hover = true
    },
    addToolbar () {
      this.centerDialogVisible = true
      if (this.toolbar.length > 0) {
        this.toolbar = []
        this.focus = false
        this.hover = false
        this.toolbarStatus = false
      } else {
        this.toolbar = [
          ['bold', 'italic', 'strike', 'underline'],
          ['upload', 'save']
        ]
        this.focus = true
        this.toolbarStatus = true
        // this.$refs.curEdit.focus()
      }
    },
    editDialogClose () {
      this.closeDialogCommon()
    },
    editConfirm () {
      this.closeDialogCommon()
    },
    closeDialogCommon () {
      this.centerDialogVisible = false
      this.focus = true
      this.$refs.curEdit.focus()
    }
  }
}
</script>

<style scoped >
.dwEditorRoot{
  width: 100%;
}
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
  padding: 6px;
  word-break: break-word;
  outline: none;
}
.dw-width-100bfb{
  width: 100%;
}
.dw-input-focus{
  border: 1px solid #095aaa;
  background: #f6f8f8;
  outline-width: 1px;
}
.dw-flex{
  display: flex;
}
.dw-items-start{
  align-items: flex-start;
}
.dw-flex-item-auto{
  flex: auto;
}
.dw-edit-toolbar{
  width: 40px;
}
.dw-btn-blue-1{
  border: 1px solid #095aaa;
  background: #b5d8fc;
  color: #095aaa;
  text-align: center;
}
.dw-cursor-pointer{
  cursor: pointer;
}
/deep/ .edit-dialog-root.el-dialog .el-dialog__header {
  /*display: none;*/
  padding: 10px;
}
/deep/ .edit-dialog-root.el-dialog .el-dialog__body{
  padding: 0px;
}
</style>
