<template>
  <div>
    <template v-if="survey.questions[index].quType === 'PARAGRAPH' || survey.questions[index].quType === 'PAGETAG'" >
      <div v-if="survey.questions[index].quType === 'PAGETAG'">
        <div class="qu-catalogue-item qu-catalogue-page" >分页：下一页({{ pageNum }}/{{ pageSize }})</div>
      </div>
      <div v-if="survey.questions[index].quType === 'PARAGRAPH'">
        <div class="qu-catalogue-item qu-catalogue-paragraph" >分段：{{ survey.questions[index].quTitleObj.dwText }}</div>
      </div>
    </template>
    <template v-else>
      <div class="qu-catalogue-item qu-catalogue-other">Q{{ quNum }}、{{ survey.questions[index].quTitleObj.dwText }}</div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'DwDesignCatalogQuItem',
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}}
  },
  computed: {
    quNum () {
      const questions = this.survey.questions
      let quNum = 0
      questions.forEach((item, index) => {
        if (item.quType !== 'PAGETAG' && item.quType !== 'PARAGRAPH' && index <= this.index) quNum++
      })
      return quNum
    },
    pageSize () {
      const questions = this.survey.questions
      let pageSize = 1
      questions.forEach((item, index) => {
        if (item.quType === 'PAGETAG') pageSize++
      })
      return pageSize
    },
    pageNum () {
      const questions = this.survey.questions
      let pageNum = 0
      questions.forEach((item, index) => {
        if (item.quType === 'PAGETAG' && index <= this.index) pageNum++
      })
      return pageNum
    }
  }
}
</script>

<style scoped>
.qu-catalogue-item{
  padding: 10px 5px;
  border: 1px solid transparent;
  border-bottom: 1px solid #e5e5e5;
  font-size: 13px;
  line-height: 20px;
}
.qu-catalogue-item:hover{
  /*border: 1px solid dodgerblue;*/
  background: #f5f5f5;
}
.qu-catalogue-other{
  padding-left: 5px;
}
.qu-catalogue-page{
  background: #f5f7fa;
  color: #3f9eff;
  font-weight: bold;
  padding-left: 2px;
}
.qu-catalogue-paragraph{
  font-weight: bold;
  padding-left: 2px;
}
</style>
