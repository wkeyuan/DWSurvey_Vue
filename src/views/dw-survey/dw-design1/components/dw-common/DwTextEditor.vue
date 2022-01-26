<template>
  <div id="dwCommonEditRoot" class="editorContent" :style="textEditorVisible">
    <div class="dwEditor" contenteditable="true" @keydown="keydown" ></div>
  </div>
</template>

<script>

import $ from 'jquery'

const cityOptions = ['上海', '北京', '广州', '深圳'];

export default {
  name: 'DwTextEditor',
  props: {
    quNum: {type: String, default: ''},
  },
  data() {
    return {
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true,
      textEditorVisible: '',
      domId: '',
    };
  },
  methods: {
    showEditor (id) {
      // this.textEditorVisible = "display: block"
      const idObj = $(`#${id}`);
      const offset = idObj.offset();
      console.debug('dwoffset')
      console.debug(offset)
      $("#dwCommonEditRoot").show()
      $("#dwCommonEditRoot").offset({top:offset.top, left:offset.left});
      $("#dwCommonEditRoot").width(idObj.width()+30)
      $("#dwCommonEditRoot").height(idObj.outerHeight())
      $("#dwCommonEditRoot .dwEditor").focus();
      this.domId = id;
    },
    hideEditor () {
      // this.textEditorVisible = 'display: none'
      console.debug('this.curDomId')
      $("#dwCommonEditRoot").hide()
    },
    getText () {
      return $("#dwCommonEditRoot").text()
    },
    keydown () {
      this.$emit('set-edit-text')
      this.showEditor(this.domId)
    }
  }
}
</script>

<style scoped>
.editorContent{
  position: absolute;
  display: none;
  z-index: 102;
  background-color: #FDF9CD;
  min-width: 20px;
}
.dwEditor{
  width: 100%;
  background-color: #FDF9CD;
  font-size: 14px;
  line-height: 22px;
  outline-style: none;
}
</style>
