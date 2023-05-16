<template>
  <div class="dwEditorRoot dw-width-100bf" @input="inputEdit" @mouseover="mouseover" @mouseleave="mouseleave" >
    <div class="dw-flex-start" >
      <div class="dw-flex-item-auto">
        <div ref="curEdit" :class="[itemClick ? 'dw-input-focus':'dwEditRoot',hover ? 'dw-input-hover':'dwEditRoot']" :placeholder="value.dwPlaceholder" contenteditable="plaintext-only" class="dw-input-default dw-qu-option-text dw-border-blue editor-content-view" @click="editClick" v-html="editorText" ></div>
        <!--<div ref="curEdit" :class="[itemClick ? 'dw-input-focus':'dwEditRoot',hover ? 'dw-input-hover':'dwEditRoot']" :placeholder="value.dwPlaceholder" contenteditable="plaintext-only" class="dw-input-default dw-qu-option-text dw-border-blue editor-content-view" @click="editClick" v-html="value.dwHtml" ></div>-->
      </div>
      <div class="dw-edit-toolbar" >
        <div v-show="itemClick" class="dw-qu-option-text dw-btn-blue-1 dw-cursor-pointer" style="margin-left: -1px!important;" @click="addToolbar" ><i class="fa fa-align-left"></i></div>
      </div>
      <!--      itemClick: {{ itemClick }}  hover: {{ hover }}-->
      <!--      dwHtml: {{ value.dwHtml }}-->
    </div>
    <div>
      <DwEditor ref="curDwEditor" :center-dialog-visible="centerDialogVisible" @upVisible="upVisible" @upHtmlValue="upHtmlValue" ></DwEditor>
    </div>
  </div>
</template>

<script>

import DwEditor from './DwEditor'

export default {
  name: 'DwTextEditLabel',
  components: {DwEditor},
  model: {
    prop: 'value',
    event: 'update-input'
  },
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
  watch: {
    value: function (newValue, oldValue) {
      console.log('firstName changed from ' + oldValue + ' to ' + newValue)
      // this.dragOptions = newValue
      // const quCommonItems = this.$refs.quCommonItem
      // for (let i=0; i<quCommonItems.length; i++) quCommonItems[i].dragClick(null)
      if (this.value.hasOwnProperty('isRefreshValue') && this.value.isRefreshValue) {
        this.editorText = this.value.dwHtml
        this.$refs.curEdit.innerHTML = this.editorText
        this.value.isRefreshValue = false
      }
      if (this.value.hasOwnProperty('isNew') && this.value.isNew) {
        this.editClick()
        this.editFocus()
        this.value.isNew = false
      }
    }
  },
  methods: {
    upVisible (visible) {
      this.centerDialogVisible = visible
      this.$refs.curEdit.focus()
    },
    upHtmlValue (html) {
      this.editorText = html.dwHtml
      this.centerDialogVisible = false
      // this.$emit('update-input', html)
      this.$emit('upValue', html)
      this.$refs.curEdit.focus()
    },
    editClick () {
      // this.$refs.curEdit.focus()
      if (!this.itemClick) this.$emit('upItemClick', true)
    },
    inputEdit (e) {
      // this.$emit('update-input', e.target.innerHTML)
      // this.$emit('upValue', e.target.innerHTML)
      const dwValue = {dwText: e.target.innerText, dwHtml: e.target.innerHTML}
      // this.$emit('update-input', dwValue)
      this.$emit('upValue', dwValue)
    },
    mouseleave () {
      this.hover = false
    },
    mouseover () {
      this.hover = true
    },
    focusout () {
      this.hover = false
    },
    addToolbar () {
      this.centerDialogVisible = true
      this.$refs.curDwEditor.upEditHtml(this.value.dwHtml)
    },
    upEditorText (htmlValue) {
      // console.debug('upEditorText', htmlValue)
      // this.editorText = htmlValue
      // this.$refs.curEdit.innerHTML = htmlValue
      this.editorText = this.value.dwHtml
      this.$refs.curEdit.innerHTML = this.editorText
    },
    editFocus () {
      this.$refs.curEdit.focus()
    }
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
  padding: 6px;
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
