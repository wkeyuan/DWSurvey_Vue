<template>
  <div>
    <dw-design-question-model-common :item="item" >
      <div class="dw-list-group-item-content qu-bank-question-content">
        <div v-if="item.hasOwnProperty('dwQuIcon') && item.dwQuIcon!==null && item.dwQuIcon!==undefined" class="dw-list-group-item-in"> <span v-html="item.dwQuIcon"></span> {{ item.quName }} <span class="dw-list-group-item-in-type"></span> </div>
        <div v-else class="dw-list-group-item-in"> {{ item.quName }} <span class="dw-list-group-item-in-type">[{{ item.quTypeName }}]</span> </div>
      </div>
    </dw-design-question-model-common>
  </div>
</template>

<script>

import DwDesignQuestion from '../../../../dw-design-survey-question/DwDesignQuestion.vue'
import DwAnswerQuestion from '../../../../../../dw-answer-comp/dw-answer-survey-question/DwAnswerQuestion.vue'
import DwDesignQuestionModelCommon
  from '../../../../dw-design-survey-layouts/dw-tb-layout/dw-design-toolbar/components/DwDesignQuestionModelCommon.vue'

export default {
  name: 'DwDesignQuBankQuestion',
  components: {DwDesignQuestionModelCommon, DwAnswerQuestion, DwDesignQuestion},
  props: {
    item: {type: Object, default: () => {}}
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
@import '../../../../../../../../assets/css/font-dwsurvey-1.4/iconfont.css';
@import '../../../../../../../../assets/css/design-survey.css';

.dw-list-group-item-content{
  padding: 0;
  /* margin-bottom: -1px; */
  background-color: #fff;
  cursor: default;
  width: 100%;
}
.dw-list-group-item-content:first-child {
}
.dw-list-group-item-in{
  padding: 0.25rem 0.55rem;
}
.dw-list-group-item-in-type{
  color: #afafb0;
  font-size: 12px;
}
.dw-list-group-item-content:hover, .dw-list-group-item:hover .dw-list-group-item-in-type{
  background-color: dodgerblue;
  color: white;
}
.cloneQuRoot{
  padding: 10px;
}
</style>
