<template>
  <div class="dw-display-flex-left">
    <el-tooltip class="item" effect="dark" content="添加选项" placement="left">
      <div class="dw-question-toolbar dw-margin-right-10" @click="dwAddQuItem"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color fa fa-plus" aria-hidden="true"></i></div>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="批量添加选项" placement="right">
      <div class="dw-question-toolbar dw-margin-right-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color fa fa-list-ul" aria-hidden="true"></i></div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'DwDesignQuestionBottomType1',
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}}
  },
  methods: {
    dwAddQuItem () {
      this.survey.questions[this.index].quTitle = 'wooooooo'
      this.survey.surveyNode = '更新问卷副标题备注'
      this.$emit('update-question', this.survey)
    }
  }
}
</script>

<style scoped>
.dw-display-flex-left{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.dw-margin-right-10{
  margin-right: 10px;
}
.dw-cursor-pointer{
  cursor: pointer;
}
.dw-event-color{
  color: #095aaa;
}
</style>
