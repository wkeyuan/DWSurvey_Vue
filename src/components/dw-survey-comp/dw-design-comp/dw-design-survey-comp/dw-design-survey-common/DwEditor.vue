<template>
  <el-dialog
    :visible.sync="centerDialogVisible"
    :append-to-body="true"
    :destroy-on-close="true"
    :show-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    title="高级编辑器"
    width="70%"
    custom-class="edit-dialog-root"
    @close="closeDialogCommon">
    <div style="border: 1px solid #ccc;">
      <Toolbar
        :editor="editor"
        :default-config="toolbarConfig"
        :mode="mode"
        style="border-bottom: 1px solid #ccc"
      />
      <Editor
        v-model="html"
        :default-config="editorConfig"
        :auto-focus="false"
        :mode="mode"
        style="height: 300px; overflow-y: hidden;"
        @onCreated="onCreated"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogClose">取 消</el-button>
      <el-button type="primary" @click="editConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

import '@wangeditor/editor/dist/css/style.css'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'

export default {
  name: 'DwEditor',
  components: {Editor, Toolbar},
  props: {
    centerDialogVisible: {type: Boolean, default: false},
    value: {type: String, default: ''}// 必须html格式
  },
  data () {
    return {
      // centerDialogVisible: false,
      editor: null,
      html: null,
      toolbarConfig: {},
      editorConfig: {placeholder: '请输入内容...'},
      mode: 'default' // or 'simple'
    }
  },
  mounted () {
    // 模拟 ajax 请求，异步渲染编辑器
    // this.html = this.valueHtml.split(/\n/).map(line => `<p>${line}</p>`).join('\n')
    setTimeout(() => {
      // this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    }, 1500)
  },
  beforeDestroy () {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  methods: {
    onCreated (editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    upEditHtml (htmlValue) {
      this.html = htmlValue
    },
    confirm () {
      this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    },
    editDialogClose () {
      this.closeDialogCommon()
    },
    editConfirm () {
      const dwValue = {dwText: this.editor.getText(), dwHtml: this.editor.getHtml()}
      this.$emit('upHtmlValue', dwValue)
    },
    closeDialogCommon () {
      this.$emit('upVisible', false)
    }
  }
}
</script>

<style scoped>
/deep/ .w-e-text-container [data-slate-editor]{
  padding-top: 5px;
}
/deep/ p{
  margin: 0px!important;
  padding: 0px!important;
}
</style>
