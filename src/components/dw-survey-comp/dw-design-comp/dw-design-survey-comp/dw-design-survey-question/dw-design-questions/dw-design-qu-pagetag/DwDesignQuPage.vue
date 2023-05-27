<template>
  <div style="padding: 10px;border-top:5px solid #efefef;">
    <div style="text-align: right;color: grey;font-size: 13px;">下一页({{ pageNum }}/{{ pageSize }})</div>
  </div>
</template>

<script>
import DwDesignQuestionCommon from '../../DwDesignQuestionCommon'

export default {
  name: 'DwDesignQuPage',
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
  },
  computed: {
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
.dw-qu-item{
  display: grid;
  grid-template-columns: auto 90px;
}
</style>
