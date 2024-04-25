<template>
  <div style="padding: 10px;border-top:5px solid #efefef;">
    <div style="text-align: right;color: grey;font-size: 13px;">下一页({{ pageNum }}/{{ pageSize }})</div>
  </div>
</template>

<script>
import DwDesignQuestionCommon from '../../DwDesignQuestionCommon'
import {surveyPageUtils} from '../../../../../dw-utils/dw-survey-common'

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
      return surveyPageUtils.pageSize(this.survey)
    },
    pageNum () {
      return surveyPageUtils.quInPageNum(this.survey, this.index)
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
