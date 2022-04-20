<template>
  <el-dialog
    title="高级编辑器"
    :visible.sync="centerDialogVisible"
    width="70%"
    custom-class="edit-dialog-root"
    :append-to-body="true"
    :destroy-on-close="true"
    :show-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="closeDialogCommon">
    <div style="border: 1px solid #ccc;">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 300px; overflow-y: hidden;"
        v-model="html"
        :defaultConfig="editorConfig"
        :mode="mode"
        :autoFocus="true"
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
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  name: 'DwEditor',
  components: { Editor, Toolbar },
  props: {
    centerDialogVisible: false,
    valueHtml: { type: String, default: '' }//必须html格式
  },
  data() {
    return {
      // centerDialogVisible: false,
      editor: null,
      html: null,
      toolbarConfig: { },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
    }
  },
  methods: {
    onCreated (editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    upEditHtml (htmlValue) {
      console.log('htmlValue',htmlValue)
      if(htmlValue.indexOf('<p>')<0){
        const newHtml = htmlValue.split(/\n/).map(line => `<p>${line}</p>`).join('\n')
        console.log('newHtml',newHtml)
        // this.html = newHtml
      }else{
        // this.html = htmlValue
      }
      this.html = htmlValue
    },
    confirm () {
      this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    },
    editDialogClose () {
      this.closeDialogCommon()
    },
    editConfirm () {
      this.$emit('upHtmlValue', this.editor.getHtml())
    },
    closeDialogCommon () {
      this.$emit('upVisible',false)
    }
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    // this.html = this.valueHtml.split(/\n/).map(line => `<p>${line}</p>`).join('\n')
    setTimeout(() => {
      // this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    }, 1500)
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
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
