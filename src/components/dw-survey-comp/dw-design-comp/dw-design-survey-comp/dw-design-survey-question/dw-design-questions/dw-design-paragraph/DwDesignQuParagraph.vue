<template>
  <div style="font-size: 12px;">
    <div style="color: #c6c6c7;"> <el-icon class="el-icon-warning-outline"></el-icon> 请在上方输入段落的标题或备注</div>
  </div>
</template>

<script>
import DwDesignQuestionCommon from '../../DwDesignQuestionCommon'

export default {
  name: 'DwDesignQuParagraph',
  components: {DwDesignQuestionCommon},
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
      inputText: ''
    }
  }
}
</script>

<style scoped>
.dw-qu-item{
  display: grid;
  grid-template-columns: auto 90px;
}
</style>
